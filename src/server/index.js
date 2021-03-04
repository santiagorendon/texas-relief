const express = require('express');
const os = require('os');
require("./db.js");
const mongoose = require('mongoose');
const Marker = mongoose.model('Marker');
const Post = mongoose.model('Post');


const app = express();

app.use(express.static('dist'));
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
  // Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
});

app.get('/api/getUsername', (req, res) => {
  res.send({ username: os.userInfo().username });
});

app.get('/api/get-markers', (req, res) => {
  Marker.find({}, (err, markers)=>{
    if(err) {
      res.status(200).json({error: err});
    }
    else {
      res.send(markers);
    }
  });
})

app.post('/api/create-marker', (req, res) => {
  console.log(req.body)
  const lat = req.body.lat;
  const lng = req.body.lng;
  new Marker({
			      lat: lat,
						lng: lng,
			    }).save(function(err){
			      if(err){
			        res.json({'error': 'Error saving data'})
			      }
			      else{
			        res.json({'success': true});
			      }
    })
})

app.get('/api/get-posts', (req, res) => {
  Post.find({}, (err, posts)=>{
    if(err) {
      res.status(200).json({error: err});
    }
    else {
      res.send(posts);
    }
  });
})

app.post('/api/create-post', (req, res) => {
  const username = "anonymous";
  const postTitle = req.body.title;
  const postContent = req.body.content;
  new Post({
            username: username,
			      postTitle: postTitle,
						postContent: postContent,
			    }).save(function(err){
			      if(err){
			        res.json({'error': 'Error saving data'})
			      }
			      else{
			        res.json({'success': true});
			      }
    })
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('/src/dist'));
  app.get('*', (req, res)=>res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')));
}

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
