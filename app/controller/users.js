var mongoose = require('mongoose');
var express = require('express');

var app = express();

// var bodyParser = require('body-parser');
var user = require('../model/user');

// Kreiramo router za naseg korisnika
var userEntryRouter = express.Router();

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

        userEntry.save(function(err, entry){
            if(err) return next(err);
            
            var token;
            tokent = userEntry.generateJwt();
            res.status(200);
            res.json({
                "token": token,
                message: 'Uspesno ste se registrovali'
            });
        });
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



































