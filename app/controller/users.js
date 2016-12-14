var mongoose = require('mongoose');
var express = require('express');

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

        // Proveravamo da li korisnik sa tom email adresom vec postoji
        user.findOne({
            email: req.body.email
        }, function(err, db_user){
            if(db_user){
                return res.json({
                    success: false,
                    message: 'Korisnik sa tom email adresom vec postoji.'
                });
            }
        });
        userEntry.email = req.body.email;

        userEntry.setPassword(req.body.lozinka);

        rand = Math.floor((Math.random() * 100) + 54);
        host = req.get('host');
        // Verifikacioni link
        link = "http://"+req.get('host')+"/accounts/verify?id="+rand;

        mailOptions = {
            to: req.body.email,
            subject: "Please confirm your email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
        }
        console.log(mailOptions);

        userEntry.save(function(err, entry){
            if(err) return next(err);
            
            // Slanje verifikacionog mail-a
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                    res.end("error");
                } else {
                    console.log("Message sent: " + response.message);
                    res.end("sent");
                }
            });
            var token;
            tokent = userEntry.generateJwt();
            res.status(200);
            res.json({
                "token": token,
                message: 'Uspesno ste se registrovali.'
            });
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
                    res.status(200);
                    res.json({
                        success: true,
                        message: 'Uspesno ste prijavljeni.',
                        token: token
                    });
                }
            }
        });
    });

module.exports = userEntryRouter;



































