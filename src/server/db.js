const mongoose = require('mongoose');



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
mongoose.connect("mongodb+srv://admin:admin@cluster0.gtzfn.mongodb.net/relief?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(db => console.log(`DB is connected`))
    .catch(err => console.error(err));
