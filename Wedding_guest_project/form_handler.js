/**
 * Created by sthompson on 4/17/17.
 */
var qs = require('querystring');
var http = require('http');

console.log("Made it here!")
var http = require('http');
var querystring = require('querystring');

function processPost(request, response, callback) {
    console.log("I'm in processPost!");
    var queryData = "";
    if(typeof callback !== 'function') return null;
    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            request.post = querystring.parse(queryData);
            callback();
        });

    } else {
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end();
    }
}
module.exports.processPost = processPost;