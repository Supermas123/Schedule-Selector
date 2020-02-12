const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 9000;
const getSchools = require('./routes/getSchools.js');
const getTerms = require('./routes/getTerms.js');
const getCourses= require('./routes/getCourses.js');
const getMajors= require('./routes/getMajors.js');
const getCredits= require('./routes/getCredits.js');


app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.use("/getSchools", getSchools);
app.use("/getTerms", getTerms);
app.use("/getCourses", getCourses);
app.use("/getMajors", getMajors);
app.use("/getCredits", getCredits)

app.listen(port, function(){
  console.log("APP IS LISTENING ON PORT " + port);
});
