'use strict';

const assert = require('assert');
const Note = require('../model/note');
const request = require('superagent-use');
const superPromse = require('superagent-promise-plugin')
request.use(superPromse);

require('../server');

const port = process.env.PORT || 3000;
const baseURL = `localhost:${port}/api`;

describe('testing nothing really', function(){
  before((done) => {
    const note = new Note({content: 'test data'});
    note.save()
    .then( note => {
      this.tempNote = note;
      done();
    })
    .catch(done);
  });

  it('should return a note', (done) => {
    request.get(`${baseURL}/note/${this.tempNote._id}`)
    .then( res => {
      assert.ok(res.body.content === this.tempNote.content)
      done()
    })
    .catch(done)
  });
});
