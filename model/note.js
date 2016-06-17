'use strict';

const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  content: {type:String}
});

module.exports = mongoose.model('note', noteSchema);
