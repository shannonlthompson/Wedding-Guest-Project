/**
 * Created by sthompson on 4/11/17.
 */
//Create a web server
const renderer = require("./renderer.js");
//const retrieve = require("./retrieve_content.js");
const http = require('http');
//Storing data:
const fs = require('fs');
const commonHeader = {'Content-type': 'text/html'};

//let starting_content = ["<h1>There are no guests in your list. Please complete the form above to start your guest list!</h1>"];



http.createServer(function (request, response) {
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
}).listen(3000);

const findContent = (templateName, content, response, callback) => {
    //console.log("Finding content");
    content = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    //console.log("End of findContent function");
    // console.log("IN MERGEVALUES. Here's the content: "+ content);
    //getFileContent start
    callback(templateName, content, response, processContent);
};

const processContent = (templateName, content, response, callback) => {
    console.log("Processing content");
    let body = fs.readFileSync("./myJsonFile.json");
        let masterArray = JSON.parse(body);
        // console.log("length of masterArray: " + masterArray.length);
        //console.log("here's the master array: "+ masterArray);
        // console.log("in createDivs" + masterArray);
        let divs = [];
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
            let newDiv = "<div class=project " + status +" " +  type + ">" +
                "<li>" + name + "</li>" +
                "<li>" + party + "</li>" +
                "<li>" + street + "</li>" +
                "<li>" + city + ", " + state + " " + zip + "</li>" +
                "</div>";
            divs.push(newDiv);
            //console.log("This is the new div: " + newDiv);
        }
        //console.log("returning " + divs.length + " divs from getFileContent: " + divs);
        let guest_list = '';
        //console.log("Merging values");
        for(let i = 0; i<divs.length; i++) {
            //  console.log("value: " + values[i]);
            guest_list += divs[i];
        }
        //console.log("guest_list: " + guest_list);
        content = content.replace("{{guest_list}}", guest_list);
    //console.log(content);
    callback(templateName, content, response);
};

/*const processContent = (templateName, content, response, callback) => {
    console.log("Processing content");
    fs.readFile("./myJsonFile.json", (err, data) => {
        let body = '';
        if (err) throw err;
        body += data.toString();
        fs.readFile('end', () => {
            let masterArray = JSON.parse(body);
            // console.log("length of masterArray: " + masterArray.length);
            //console.log("here's the master array: "+ masterArray);
            // console.log("in createDivs" + masterArray);
            let divs = [];
            for (let i = 2; i < masterArray.length; i++) {
                let name = masterArray[i].name;
                let status = masterArray[i].stat;
                let party = masterArray[i].party;
                let type = masterArray[i].type;
                let street = masterArray[i].street;
                let city = masterArray[i].city;
                let state = masterArray[i].state;
                let zip = masterArray[i].zip;
                let newDiv = "<div class=project " + status +" " +  type + ">" +
                    "<li>" + name + "</li>" +
                    "<li>" + party + "</li>" +
                    "<li>" + street + "</li>" +
                    "<li>" + city + ", " + state + " " + zip + "</li>" +
                    "</div>";
                divs.push(newDiv);
                //console.log("This is the new div: " + newDiv);
            }
            //console.log("returning " + divs.length + " divs from getFileContent: " + divs);
            let guest_list = '';
            //console.log("Merging values");
            for(let i = 0; i<divs.length; i++) {
                //  console.log("value: " + values[i]);
                guest_list += divs[i];
            }
            //console.log("guest_list: " + guest_list);
            content = content.replace("{{guest_list}}", guest_list);
        });
    })
    console.log(content);
    //callback(templateName, content, response);
};
*/
const view = (templateName, value, response) => {
    let content = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    response.write(content);
};

const onFindContentDone = (templateName, content, response, callback) => {
    console.log("Finished finding content");
    callback(templateName, content, response, onProcessContentDone);
};

const onProcessContentDone = (templateName, content, response) => {
    console.log("Finished processing content");
    try {
        response.write(content);
        console.log("wrote this content: "+ content);
    } catch (err) {
        throw err;
    }
};

//retrieve.getFileContent();
//let starting_content = retrieve.getFileContent();
//startServerNoContent(starting_content);
let anobject = {a:1,b:'hello'};
let result = JSON.stringify(anobject);
//console.log("Stringified OBJECT: "+ result);
//retrieve.storeFileContent(result);