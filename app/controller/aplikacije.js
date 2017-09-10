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
    .post('/:id', function(req, res, next){
        var aplikacijaEntry = new aplikacija(req.body);
        user.findOne({"_id":req.params.id}, function(err, entry){
            if(err) return next(err);
            aplikacijaEntry.save(function(err, aplikacija){
                if(err) return next(err);
                user.findByIdAndUpdate(entry._id, {$push:{"aplikacije":aplikacijaEntry._id}}, function(err, entry){
                    if(err) return next(err);
                    res.json(entry);
                });
            });
        });
    })

    .get('/:id', function(req, res, next) {
        aplikacija.findOne({
            "_id": req.params.id
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