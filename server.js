// Setup empty JS object to act as endpoint for all routes
projectData = {};
let nations=[];
let nationCodes=[];
// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port=8000;
const server=app.listen(port,listening);
function listening(){
    console.log(`sever is running in localhost:${port}`);
};
const readXlsxFile = require('read-excel-file/node');
// File path.
readXlsxFile('CountryCode.xlsx').then((rows) => {
   for(var i=1;i<240;i++){
       nations.push(rows[i][0]);
       nationCodes.push(rows[i][2]);
   };
});
//GET request
app.get('/Nation',reqNations);
function reqNations(req,res){
    res.send(nations);
};
app.get('/Code',reqCodes);
function reqCodes(req,resp){
    resp.send(nationCodes);
};
//POST request
app.post('/addData',addData);
function addData(req,res){
    let Data=req.body;
    projectData['date']=Data.date;
    projectData['temperature']=Data.temperature;
    projectData['feelings']=Data.feelings;
    res.send(projectData);
    console.log(projectData);

};