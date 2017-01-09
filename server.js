'use strict';

var AWS = require('aws-sdk');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

var surveyUrl = 'https://s3.amazonaws.com/wfp-bot/survey.yml';

app.get('api/survey', (req, res) => {
  request.get(surveyUrl).success(data =>{
    return res.status(200).send(data)
  }).error(err => {
    console.log(err);
    return res.status(err.statusCode || 500).send(err)
  })
})

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json);

app.post('api/publish', (req, res) => {
  var creds = new AWS.Credentials({
    accessKeyId: req.body.key, secretAccessKey: req.body.secret
  })
  var s3 = new AWS.s3({
    credentials: creds
  })

  s3.putObject({
    Bucket: req.body.bucket || 'wfp-bot',
    Key: req.body.filename || 'survey.yml',
    Data: req.body.yaml || ''
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

app.use(express.static(__dirname + '/'));

app.listen(3000, function(){
  console.log('Server running, listening on 3000.')
})
