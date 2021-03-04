const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: '/Users/santiagorendon/Desktop/texas-relief/.env'});

const Post= new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  postTitle: String,
  postContent: String
});

const Marker = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});


mongoose.model('Marker', Marker);
mongoose.model('Post', Post);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
    .then(db => console.log(`DB is connected`))
    .catch(err => console.error(err));
