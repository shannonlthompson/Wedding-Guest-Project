/**
 * Created by sthompson on 4/11/17.
 */
const form_handler = require("./form_handler.js");
const http = require('http');
const fs = require('fs');
const commonHeader = {'Content-type': 'text/html'};
const cheerio = require('cheerio');
const sort = require('./sort.js');
let objectArray = [];
let currentList = [];
let mainHTML = "";
let firstTimeInitiated = 0;
let totalGuests = 0;

//Use the values submitted from the form to handle new form elements
http.createServer(function (request, response) {
    if(request.method == 'POST') {
        form_handler.processPost(request, response, function () {
            // console.log(request.post);
            createNewDiv(request.post, response, addNewGuest);
            // Use request.post here
            response.writeHead(200, commonHeader);
            view("header", {}, response);
            view("main", {}, response);
            view("footer", {}, response);
            response.end();
            console.log('Server running at http://localhost:3000/');
        });
    }

    // } else if(request.method == 'GET') {
    //     sort.sort_by_name(request, response, function () {
    //         // console.log(request.post);
    //         sort();
    //         // Use request.post here
    //         response.writeHead(200, commonHeader);
    //         view("header", {}, response);
    //         view("main", {}, response);
    //         view("footer", {}, response);
    //         response.end();
    //         console.log('Server running at http://localhost:3000/');
    //     });
    // }

    else if (firstTimeInitiated === 0) {
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
    //If there's a property with mobile_user_name, the mobile version of the form was filled out
    if(data.mobile_user_name) {
        let newGuest = "<div class='guest rounded-crn" + "'>" +
            "<p class='g_name" + "'>" + data.mobile_user_name + "</p>" +
            "<p class='g_number" + "'>" + data.mobile_guest_number + "</p>" +
            "<p class='g_type" + "'>" + data.mobile_guest_type + "'s guest</p>" +
            "<p class='g_status" + "'>" + "On the list? " + data.mobile_status + "</p>"
            + "</div>";
        let newObject = {
            "name": data.mobile_user_name,
            "stat": data.mobile_status,
            "party": data.mobile_guest_number,
            "type": data.mobile_guest_type
        };
        objectArray.unshift(newObject);
        //console.log(newGuest);
        totalGuests = totalGuests + parseInt(data.mobile_guest_number, 10);
        callback(newGuest, response, addNewGuest);
    } else {
        let newGuest = "<div class='guest rounded-crn" + "'>" +
            "<p class='g_name" + "'>" + data.user_name + "</p>" +
            "<p class='g_number" + "'>" + data.guest_number + "</p>" +
            "<p class='g_type" + "'>" + data.guest_type + "'s guest</p>" +
            "<p class='g_status" + "'>" + "On the list? " + data.status + "</p>"
            + "</div>";
        let newObject = {
            "name": data.user_name,
            "stat": data.guest_number,
            "party": data.guest_type,
            "type": data.status
        };
        objectArray.unshift(newObject);
        //console.log(newGuest);
        totalGuests = totalGuests + parseInt(data.guest_number, 10);
        callback(newGuest, response, addNewGuest);
    }
};

const addNewGuest = (new_guest, response, callback) => {
    currentList.unshift(new_guest);
    let updated_guest_list = '';
    for(let i = 0; i<currentList.length; i++) {
        updated_guest_list += currentList[i];
    }
    let content = fs.readFileSync('./views/main.html', {encoding: "utf8"});
    content = content.replace("{{guest_list}}", updated_guest_list);
    content = content.replace("{{number_guest}}", totalGuests);
    console.log("Replacing {{number_guest}} with: "+ totalGuests);
    mainHTML = content;
};

const processContent = (templateName, content, response, callback) => {
    //console.log("Processing content");
    let body = fs.readFileSync("./myJsonFile.json");
        let masterArray = JSON.parse(body);
        objectArray = objectArray.concat(masterArray);
        console.log("Object Array length: " + objectArray.length);
        for (let i = 0; i < masterArray.length; i++) {
            let name = masterArray[i].name;
            let status = masterArray[i].stat;
            let party = masterArray[i].party;
            totalGuests += parseInt(party, 10);
            let type = masterArray[i].type;
            let newDiv = "<div class='guest rounded-crn" + "'>" +
                "<p class='g_name" +"'>" + name + "</p>" +
                "<p class='g_number" +"'>" + party + "</p>" +
                "<p class='g_type" +"'>" + type + "'s guest</p>" +
                "<p class='g_status" +"'>" +"On the list? "+ status + "</p>"
                + "</div>";
            console.log("New div: " + newDiv);
            currentList.push(newDiv);

        }
        let guest_list = '';
        for(let i = 0; i<currentList.length; i++) {
            guest_list += currentList[i];
        }
        content = content.replace("{{guest_list}}", guest_list);
        content = content.replace("{{number_guest}}", totalGuests);
        console.log("Replacing {{number_guest}} with: "+ totalGuests);
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
