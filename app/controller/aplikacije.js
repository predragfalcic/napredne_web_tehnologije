var mongoose = require('mongoose');
var express = require('express');

var app = express();

var aplikacija = require('../model/aplikacija');

// Ovo je samo privremeno ovako
var user = require('../model/user');

// Kreiramo router za nase aplikacije
var aplikacijaEntryRouter = express.Router();

aplikacijaEntryRouter
    // Kreiranje aplikacije
    // id je id korisnika
    .post('/:id', function(req, res, next){
        var aplikacijaEntry = new aplikacija(req.body);
        // console.log("aplikacijaEntry " + JSON.stringify(aplikacijaEntry));
        user.findOne({"_id":req.query.id}, function(err, entry){
            if(err) return next(err);
            aplikacijaEntry.save(function(err, aplikacija){
                if(err) return next(err);
                user.findByIdAndUpdate(entry._id, {$push:{"aplikacije":aplikacijaEntry._id}}, function(err, entry){
                    if(err) return next(err);
                    res.setHeader('Content-Type', 'application/json');
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.header("Access-Control-Allow-Credentials", true);
                    res.json(entry.aplikacije);
                });
            });
        });
    })

    // Edit application with the given id
    .post('/edit/:id', function(req, res, next){
        console.log("User id " + req.query.id);
        console.log("App id " + req.body._id);
        console.log("App " + JSON.stringify(req.body));
        user.findOne({"_id":req.query.id}, function(err, entry){
            if(err) return next(err);
            aplikacija.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(err, entry){
                if(err) return next(err);
                console.log("Izmenjena aplikacija " + entry);
                res.setHeader('Content-Type', 'application/json');
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Credentials", true);
                return res.json(entry);
            });
        });
    })

    .get('/:id', function(req, res, next) {
        aplikacija.findOne({
            "_id": req.query.id
        }).populate('dogadjaji').exec(function(err, entry){
            // Ukoliko je doslo do greske predjemo na sledeci middleware
            if(err) return next(err);
            res.json(entry);
        });
    })
    .delete('/:id', function(req, res, next) {
        aplikacija.remove({"_id": req.params.id}, function(err, successIndicator) {
            if (err) return next(err);
                res.json(successIndicator);
        });
    });

module.exports = aplikacijaEntryRouter;