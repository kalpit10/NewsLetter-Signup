const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
  members:[
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
}

const jsonData = JSON.stringify(data);
const url = "https://us20.api.mailchimp.com/3.0/lists/b4bd4f431d"

const options = {
  method:"POST",
  auth: "kalpit10:e1e1374e195cd92657271413c589bb3e-us20"
}
const request = https.request(url, options, function(response){
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})
})
request.write(jsonData);
request.end();

app.listen(process.env.PORT, function(){
  console.log("server is running on port 3000");
})

// e1e1374e195cd92657271413c589bb3e-us20 API KEY
// b4bd4f431d list ID
