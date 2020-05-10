var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var speakeasy = require('speakeasy');
var bcrypt = require('bcryptjs');
var dateTime = require('node-datetime');
var ip = require("ip");
var http = require('http');
var request = require("request");
var parser = require('json-parser');
var nodemailer = require('nodemailer');
var config = require('../config/database'); // get db config file

/* ------------------------------------------------------ GETS's ------------------------------------------------- */

router.get('/', function(req, res) {
    res.render('index')
});

router.get('/erro', function(req, res) {
    res.render('index', { erro: 'erro' })
});

router.get('/sucesso', function(req, res) {
    res.render('index', { sucess: 'sucess' })
});

router.get('/contactos', function(req, res) {
    res.redirect('/')
});

router.post('/mail', function(req, res) {
    if (!req.body.subject || !req.body.message || !req.body.email || !req.body.name) {
        res.redirect('/erro');
    }
    else {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.email_password
            }
        });
        var mailOptions = {
            from: config.email,
            to: 'arturcosta53@hotmail.com',
            subject: req.body.subject,
            text: 'Mensagem: ' + req.body.message + '\n\nDe: ' + req.body.email + '\n\nNome: ' + req.body.name
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
console.log(error)                
res.redirect('/erro')
            }
            else {
                res.redirect('/sucesso')
            }
        });
    }
})



module.exports = router;
