/**
 * Created by sthompson on 4/15/17.
 */

const myObj = require("./myJsonFile.json");
let body = '';
let masterArray = [];
const fs = require('fs');
const app = require('./app.js');



/*
 const form = document.getElementById("guest_form");
 const guest_list = document.getElementById("guest_list");
 form.addEventListener('submit', e => {
 e.preventDefault();
 const name = document.getElementById("name").value;
 const guest_num = document.getElementById("guest_number").value;

 //guest_type radio buttons
 let guest_type = "";
 if(document.getElementById("bride").checked) {
 guest_type = "bride";
 }else if(document.getElementById("groom").checked) {
 guest_type = "groom";
 }

 //status radio buttons
 let status = "";
 if(document.getElementById("yes").checked) {
 status = "yes";
 } else if(document.getElementById("undecided").checked) {
 status = "undecided";
 } else if(document.getElementById("no").checked) {
 status = "no";
 }

 console.log(name + guest_num + guest_type + status +"");

 //Create new guest entry
 const list_item = document.createElement('li');
 list_item.innerHTML = "<p>Name: " + name + "</p>" +
 "<p>Number of guests: " + guest_num + "</p>" +
 "<p>Party of the: " + guest_type + "</p>" +
 "<p>Status: " + status + "</p>" +
 "<img src='img/couple.svg' alt='couple'>";
 guest_list.appendChild(list_item);
 });

 */
const write = (content, response) => {
    response.write(content);
};

const view = (templateName, value, response) => {
    let content = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    response.write(content);
};
/*
const mergeValues = (templateName, values, response, callback) => {
    let content = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
   // console.log("IN MERGEVALUES. Here's the content: "+ content);
    //getFileContent start
    fs.readFile("./myJsonFile.json", (err, data) => {
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
            let revisedContent = content.replace("{{guest_list}}", guest_list);
            //console.log("REVISED CONTENT: " + revisedContent);
            try {
                write(revisedContent, response, function(err) { write.end(); });
            }
            catch(err){
                console.error("Error returned from write function: "+ err);
            }
            //return merged content
        });
});
*/

const findContent = (templateName, content, response, callback) => {
    console.log("Finding content");
    content = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    console.log("End of findContent function");
    // console.log("IN MERGEVALUES. Here's the content: "+ content);
    //getFileContent start
    };

const processContent = (content, response, callback) => {
    console.log("Processing content");
    fs.readFile("./myJsonFile.json", (err, data) => {
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
            //console.log("REVISED CONTENT: " + revisedContent);
        });
    })
};


const onFindContentDone = (templateName, content, response) => {
    console.log("Finished finding content");
    processContent(content, response, onProcessingContentDone);
};

const onProcessingContentDone = (templateName, content, response) => {
    console.log("Finished processing content");
    write(content, response, function(err) {
        write.end();
    });
};




/*
const getFileContent = () => {
    fs.readFile("./JSON_sample.json", (err, data) => {
        if (err) throw err;
        body += data.toString();
        //console.log("body:" + body);
        //console.dir(body);
        fs.readFile('end', () => {
           let masterArray = JSON.parse(body);
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
            console.log("returning " + divs.length + " divs from getFileContent: " + divs);
            return mergeContent(divs, content);
        });
    })
};
*/
/*const createDivs = (masterArray) => {
 console.log("in createDivs" + masterArray);
 let divs = [];
 console.log("Length: "+ masterArray.length);
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
 console.log("This is the new div: " + newDiv);
 }
 console.log("returning from getFileContent: " + divs);
 return divs;
};*/


//divs is an array of div strings
//read from each item in divs
/*
const storeFileContent = (dataToWrite) => fs.writeFile("./JSON_writeSample.json", dataToWrite, (err) => {
    if (err) throw err;
    //console.log("Data successfully stored!: " + dataToWrite);
});

const displayGuestsShort = (theMasterArray) => {
    let contentArray = theMasterArray.splice(0, 1);
    //if(myObj.hasOwnProperty("<property name>")){
    //alert("yes, i have that property");
    //}

};

const displayGuestsLong = (theMasterArray) => {


};

const sortedByName = (theMasterArray) => {


};

const sortedByStatus = (theMasterArray) => {


};

const sortedByType = (theMasterArray) => {

};*/

module.exports.findContent = findContent;
module.exports.onFindContentDone = onFindContentDone;
//module.exports.getFileContent = getFileContent;
//module.exports.storeFileContent = storeFileContent;
module.exports.view = view;