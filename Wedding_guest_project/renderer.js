/*const fs = require("fs");

const view = (templateName, values, response) => {
    let fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    //Write out the contents to the response
    fileContents = mergeValues(values, fileContents);
    response.write(fileContents);
};

const  mergeValues = (values, content) => {
    let guest_list = '';
    for(let i = 0; i<values.length; i++) {
        //console.log("value: " + values[i]);
        //Replace all {{key}} with the value from the values object
        guest_list += values[i];
    }
    //console.log("guest_list: " + guest_list);
    content = content.replace("{{guest_list}}", guest_list);
    //return merged content
    return content;
};

module.exports.view = view;
    */