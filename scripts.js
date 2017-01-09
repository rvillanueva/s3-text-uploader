'use strict';

function loadExistingSurvey() {
  $.ajax({
    type: "GET",
    url: 'api/survey',
    success: function(data){
      setInput(data)
    },
    error: function(err){
      console.log('Error: ' + JSON.stringify(err)); // An error occurred during the request.
    }
  });

};

function setInput(text){
  document.getElementById('yaml-input-main').value = text;
}

function publish() {
  var body = {
    yaml: document.getElementById('yaml-input-main').value,
    key: document.getElementById('s3-key-input').value,
    secret: document.getElementById('s3-secret-input').value,
    bucket: document.getElementById('s3-bucket-input').value,
    filename: document.getElementById('s3-filename-input').value
  }

  $.ajax({
    type: "POST",
    url: 'api/publish',
    data: body,
    success: function(data){
      console.log(data)
      alert('Sucessfully updated!')
      document.getElementById('error-box').innerHTML = ''
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
      console.log(errorThrown)
      document.getElementById('error-box').innerHTML = '' + textStatus + ': ' + errorThrown;
    }
  });
}

loadExistingSurvey();
