'use strict';

const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const Note = require('./model/note');
const Promise = require('bluebird');
const jsonParsre = require('body-parser').json();
const mongoose = require('mongoose')

mongoose.Promise = Promise;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/example';

mongoose.connect(mongoURI);

const app = express();
app.use(morgan('dev'));

app.post('/api/note', jsonParsre, function(req,res,next){
  new Note(req.body).save()
  .then( note => res.send(note))
  .catch(next)
})

app.get('/api/note/:id', function(req, res, next){
  Note.findOne({_id: req.params.id})
  .then( note => res.json(note))
  .catch(next);
});

app.all('*', function(req, res, next){
  next(new Error('404 error :('));
})

app.use(function(err, req, res, next){
  console.error(err)
  res.send('there was a problem');
});

app.listen(port, function(){
  console.log('server up', port)
});
