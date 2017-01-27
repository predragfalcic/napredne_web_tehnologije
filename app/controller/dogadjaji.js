var mongoose = require('mongoose');
var express = require('express');

var app = express();

var dogadjaj = require('../model/dogadjaj');
var aplikacija = require('../model/aplikacija');

// Kreiramo router za nase aplikacije
var dogadjajEntryRouter = express.Router();

dogadjajEntryRouter
    // Kreiranje dogadjaja
    .post('/:id', function(req, res, next){
        var dogadjajEntry = new dogadjaj(req.body);
        aplikacija.findOne({"_id":req.params.id}, function(err, entry){
            if(err) return next(err);
            dogadjajEntry.save(function(err, dogadjaj){
                if(err) return next(err);
                aplikacija.findByIdAndUpdate(entry._id, {$push:{"dogadjaji":dogadjajEntry._id}}, function(err, entry){
                    if(err) return next(err);
                    res.json(entry);
                });
            });
        });
    })

    .get('/:id', function(req, res, next) {
        dogadjaj.findOne({
            "_id": req.params.id
        }, function(err, successIndicator){
            if (err) next(err);
                res.json(successIndicator);
        });
    })

    .get('/', function(req, res) {
        dogadjaj.find({}, function(err, data, next) {
            res.json(data);
        });
    })
    .delete('/:id', function(req, res, next) {
        dogadjaj.remove({
            "_id": req.params.id
        }, function(err, successIndicator) {
            if (err) next(err);
                res.json(successIndicator);
        });
    });

module.exports = dogadjajEntryRouter;