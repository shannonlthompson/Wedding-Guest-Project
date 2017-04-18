/**
 * Created by sthompson on 4/11/17.
 */
const form_handler = require("./form_handler.js");
const renderer = require("./renderer.js");
const http = require('http');
const fs = require('fs');
const commonHeader = {'Content-type': 'text/html'};
const cheerio = require('cheerio');
let currentList = [];
let mainHTML = "";
let firstTimeInitiated = 0;

//Next: Use the values submitted from the form to the server to handle new form elements
http.createServer(function (request, response) {
    if(request.method == 'POST') {
        form_handler.processPost(request, response, function () {
            console.log(request.post);
            createNewDiv(request.post, response, addNewGuest);
            // Use request.post here
            response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
            response.end();
        });
    } else if (firstTimeInitiated === 0) {
    response.writeHead(200, commonHeader);
    view("header", {}, response);
    try {
        findContent("main", {}, response, onFindContentDone);
    } catch(err){
        console.error(err);
    }
    view("footer", {}, response);
    response.end();
    console.log('Server running at http://localhost:3000/');
    firstTimeInitiated = 1;
}
else {
        response.writeHead(200, commonHeader);
        view("header", {}, response);
        view("main", {}, response);
        view("footer", {}, response);
        response.end();
        console.log('Server running at http://localhost:3000/');
    }
}).listen(3000);

const findContent = (templateName, content, response, callback) => {
    content = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    callback(templateName, content, response, processContent);
};


/*
const helloWorldCheerio = () => {
    let $mainhtml = cheerio.load(fs.readFileSync('./views/main.html', {encoding: "utf8"}));
    $mainhtml('p').text('Hello there!')
    $mainhtml.html();
    console.log("cheerio element:" + $mainhtml('p').text('Hello there!'));
    console.log("Ran cheerio");
};*/

const createNewDiv = (data, response, callback) => {

    let newGuest = "<div class='project" + " " + data.status + " " +  data.type + "'>" +
        "<p>" + data.user_name + "</p>" +
        "<p>" + data.guest_number + "</p>" +
        "<p>" + data.user_address + "</p>" +
        "<p>" + data.user_city + ", " + data.user_state + " " + data.user_zip + "</p>" +
        "</div>";
    console.log(newGuest);
    callback(newGuest, response, addNewGuest);
};

const addNewGuest = (new_guest, response, callback) => {
    currentList.unshift(new_guest);
    let updated_guest_list = '';
    for(let i = 0; i<currentList.length; i++) {
        updated_guest_list += currentList[i];
    }
    let content = fs.readFileSync('./views/main.html', {encoding: "utf8"});
    content = content.replace("{{guest_list}}", updated_guest_list);

    mainHTML = content;
};

const processContent = (templateName, content, response, callback) => {
    //console.log("Processing content");
    let body = fs.readFileSync("./myJsonFile.json");
        let masterArray = JSON.parse(body);
        //Explain why it starts at 2
        for (let i = 2; i < masterArray.length; i++) {
            let name = masterArray[i].name;
            let status = masterArray[i].stat;
            let party = masterArray[i].party;
            let type = masterArray[i].type;
            let street = masterArray[i].street;
            let city = masterArray[i].city;
            let state = masterArray[i].state;
            let zip = masterArray[i].zip;
            let newDiv = "<div class='project" + " " + status + " " +  type + "'>" +
                "<p>" + name + "<p/>" +
                "<p>" + party + "</p>" +
                "<p>" + street + "</p>" +
                "<p>" + city + ", " + state + " " + zip + "</p>" +
                "</div>";
            console.log("New div: " + newDiv);
            currentList.push(newDiv);
        }
        let guest_list = '';
        for(let i = 0; i<currentList.length; i++) {
            guest_list += currentList[i];
        }
        content = content.replace("{{guest_list}}", guest_list);
        mainHTML = content;
    callback(templateName, content, response);
};

const view = (templateName, value, response) => {
    if(templateName === "main"){
        response.write(mainHTML);
    } else {
    let content = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    response.write(content);
    }
};

const onFindContentDone = (templateName, content, response, callback) => {
    //console.log("Finished finding content");
    callback(templateName, content, response, onProcessContentDone);
};

const onProcessContentDone = (templateName, content, response) => {
    //console.log("Finished processing content");
    try {
        response.write(content);
        //console.log("wrote this content: "+ content);
    } catch (err) {
        throw err;
    }

};

/*Not used currently; use this to store values in JSON:
let anobject = {a:1,b:'hello'};
let result = JSON.stringify(anobject);*/
