/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * Distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// Module dependencies
var express    = require('express'),
  bodyParser   = require('body-parser');

module.exports = function (app) {

  // Only loaded when SECURE_EXPRESS is `true`
  if (process.env.SECURE_EXPRESS)
    require('./security')(app);

  // Configure Express
//  app.use(bodyParser()); 
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
  app.use(bodyParser.json({ limit: '5mb' }));
//  app.use(express.static(__dirname + '/../public'));
//=============================
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var stack = require('../routes/stack');
//var app = express();

var multer  = require('multer')
var upload = multer({ dest: '../uploads/' })

// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/home', stack.home);
app.get('/tts',stack.tts);

app.post('/jsondata', upload.single('jsonfile'),stack.jsondata);


};
