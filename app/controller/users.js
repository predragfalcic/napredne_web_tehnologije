var mongoose = require('mongoose');
var express = require('express');
var key = require('../model/key');

//kreiranje jwt-a za preppoznavanj neulogovanih korisnika
var jwt = require('express-jwt');
var profile_auth = jwt({
  secret: 'asdasda',
  userProperty: 'payload'
});

var app = express();

var nodemailer = require("nodemailer");

// var bodyParser = require('body-parser');
var user = require('../model/user');

// Kreiramo router za naseg korisnika
var userEntryRouter = express.Router();

/*
    Ovde konfigurisemo SMTP server. Koristi se za slanje i primanje mail-a
 */

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "restoraniisa.mrs@gmail.com",
        pass: "restorani"
    }
});
var rand, mailOptions, host, link;

userEntryRouter
    // Registracija korisnika
    .post('/signup', function(req, res, next){
        var userEntry = new user();
        console.log("Usao je ovde");
        // Proveravamo da li korisnik sa tom email adresom vec postoji
        user.findOne({
            email: req.body.email
        }, function(err, db_user){
            // Korisnik sa tom email adresom postoji vec
            if(db_user){
                return res.json({ success: false, message: 'Korisnik sa tom email adresom vec postoji.'});
            }
        });
        userEntry.email = req.body.email;

        userEntry.setPassword(req.body.lozinka);
        userEntry.ime = req.body.ime;
        userEntry.prezime = req.body.prezime;

        rand = Math.floor((Math.random() * 100) + 54);
        host = req.get('host');

        // Verifikacioni link
        link = "http://"+req.get('host')+"/api/accounts/verify?id="+rand;

        mailOptions = {
            to: req.body.email,
            subject: "Please confirm your email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
        }

        userEntry.save(function(err, entry){
            if(err){
                return next(err);
            }else{
                // Slanje verifikacionog mail-a
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        res.end("error");
                    } else {
                        console.log("Message sent: " + response.message);
                        res.end("sent");
                    }
                });
                var token;
                token = userEntry.generateJwt();
                res.status(200);
                return res.json({
                    "token": token,
                    message: 'Uspesno ste se registrovali.'
                });
            }   
        });
    })

    // Ucitaj sve aplikacije za korisnika sa datim id-em
    .get('/aplikacije/:id', function(req, res, next){
        // Proveravamo da li korisnik sa tom email adresom vec postoji
        // console.log("ID " + JSON.stringify(req.query));
        user.findOne({
            _id: req.query.id
        }, function(err, db_user){
            // Korisnik sa tom email adresom ne postoji
            if(!db_user){
                return res.json({ success: false, message: 'Korisnik nije pronadjen.'});
            }
        }).populate('aplikacije').exec(function(err, entry){
            // Ukoliko je doslo do greske predjemo na sledeci middleware
            // if(err) return next(err);
            // return res.json(entry);
            // console.log("Aplikacije korisnika: " + entry.aplikacije);
            return res.send(JSON.stringify(entry.aplikacije));
            // console.log("Entry " + JSON.stringify(entry));
        });
    })

    .get('/verify',function(req,res){
        console.log(req.protocol+":/"+req.get('host'));
        if((req.protocol+"://"+req.get('host'))==("http://"+host))
        {
            console.log("Domain is matched. Information is from Authentic email");
            if(req.query.id==rand)
            {
                console.log("email is verified");
                res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
            }
            else
            {
                console.log("email is not verified");
                res.end("<h1>Bad Request</h1>");
            }
        }
        else
        {
            res.end("<h1>Request is from unknown source");
        }
    })
    
    // Prijava korisnika na sistem
    .post('/login', function(req, res, next){
        // Trazimo korisnika sa unetom email adresom
        user.findOne({
            email: req.body.email
        }, function(err, db_user){

            // Ako je doslo do greske
            if(err) return next(err);

            //Ukoliko korisnik nije pronadjen
            if(!db_user){
                res.json({ success: false, message: 'Neuspesna prijava. Korisnik nije pronadjen.'});
            } else if(db_user){
                //Proveravamo dal se lozinke poklapaju
                if(!db_user.validPassword(req.body.lozinka)){
                    res.json({ success: false, message: 'Neuspesna prijava. Uneli ste pogresnu lozinku.'});
                } else {

                    // Ukoliko su uneti podaci ispravni
                    token = db_user.generateJwt();
                    res.setHeader('Content-Type', 'application/json');
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.header("Access-Control-Allow-Credentials", true);
                    return res.json({
                        success: true,
                        message: 'Uspesno ste prijavljeni.',
                        token: token
                    });
                }
            }
        })
    })

    // Prijava korisnika na sistem
    .get('/profile', function(req, res, next){
        // If no user ID exists in the JWT return a 401
        if (!req.payload._id) {
            return res.status(401).json({
            "message" : "UnauthorizedError: private profile",
            "id" : req.payload._id
            });
        } else {
            // Otherwise continue
            User
            .findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
        }
    });

module.exports = userEntryRouter;



































