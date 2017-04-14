/**
 * Created by sthompson on 4/11/17.
 */

var router = require("./router.js");
//Problem: We need a simple way to look at a user's badge count and JavaScript point from a web browser
//Solution: Use Node.js to perform the profile look ups and server our template via HTTP

//Create a web server
var http = require('http');
http.createServer(function (request, response) {
    router.home(request, response);
    router.user(request, response);
}).listen(3000);
console.log('Server running at http://<workspace-url>/');


//Storing data:
const fs = require('fs');
const myObj = require("./JSON_sample.json");
let body = '';
let masterArray = [];

function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

const getFileContent = () => {
    fs.readFile("./JSON_sample.json", (err, data) => {
        if (err) throw err;
        //console.log("made it here");
        body += data.toString();
        //console.dir(body);
        fs.readFile('end', () => {
            masterArray = JSON.parse(body);
            console.dir(masterArray);
        });
    })
};

const storeFileContent = (dataToWrite) => fs.writeFile("./JSON_writeSample.json", dataToWrite, (err) => {
    if (err) throw err;
    console.log("Data successfully stored!: " + dataToWrite);
});

const displayGuestsShort = (theMasterArray) => {
    let contentArray = theMasterArray.splice(0, 1);
    //if(myObj.hasOwnProperty("<property name>")){
    //alert("yes, i have that property");
    //}

}

const displayGuestsLong = (theMasterArray) => {


};

const sortedByName = (theMasterArray) => {


};

const sortedByStatus = (theMasterArray) => {


};

const sortedByType = (theMasterArray) => {

};

module.exports.getFileContent = getFileContent;
module.exports.storeFileContent = storeFileContent;