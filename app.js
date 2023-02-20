const {response}= require("express")
const express =require("express")
const app= express()
const https=require("https")
const fs=require("fs")
const mailchimp = require('@mailchimp/mailchimp_marketing');
 const port= process.env.PORT


// 99081643c5bb05b4c2247d476705113f-us10
//5ecc231550



 

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
 
mailchimp.setConfig({
  apiKey: "99081643c5bb05b4c2247d476705113f-us10",
  server: "us10"
});
 
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})
 
app.post("/", function(req, res){
 
  const listId = "5ecc231550";
  const subscribingUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
  };
 
  async function run() {
      try {const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
 
      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );

      res.sendFile(__dirname + "/succes.html");
  } catch (e) {
      res.sendFile(__dirname + "/failure.html");
  }
}

run();
})

app.post("/failure.html", function(req, res) {
res.redirect("/");
})

 
app.listen(port, function () {
  console.log("Server is running on port 3000")
});


// 99081643c5bb05b4c2247d476705113f-us10
//5ecc231550