'use strict';

var AWS = require('aws-sdk');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var surveyUrl = 'https://s3.amazonaws.com/wfp-bot/survey.yml';

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/api/survey', function(req, res) {
  request.get(surveyUrl, function(err, response, body){
    if(!err){
      return res.status(200).send(body)
    } else {
      console.log(err);
      return res.status(err.statusCode || 500).send(err)
    }
  })
})

app.post('/api/publish', function(req, res) {
  var creds = new AWS.Credentials({
    accessKeyId: req.body.key, secretAccessKey: req.body.secret
  })
  var s3 = new AWS.S3({
    credentials: creds
  })

  s3.putObject({
    Bucket: req.body.bucket || 'wfp-bot',
    Key: req.body.filename || 'survey.yml',
    Body: req.body.yaml || '',
    ACL: 'public-read'
  }, function(err, data){
    if(!err){
      console.log('Successfully uploaded file.')
      return res.status(200).json(data)
    } else {
      console.log(err)
      return res.status(err.statusCode || 500).send(err)
    }
  })
})

app.use('/', express.static(path.join(__dirname, '/')));

// Listen for requests
var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log('Server running on port ' + port);
});
