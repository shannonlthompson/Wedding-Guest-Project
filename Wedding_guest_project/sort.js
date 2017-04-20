const http = require('http');

module.exports.sort_by_name = sort_by_name;

function sort_by_name(request, response, callback) {
    console.log("I'm in sort_by_name!");
    //console.log("I'm in processPost!");
    var queryData = "";
    if(typeof callback !== 'function') return null;
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end();
}