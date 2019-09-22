'use strict';

const co = require("co");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

var html;

function* loadHtml() {
  if(!html) {
    html = yield fs.readFileAsync('static/index.html', 'utf-8');
  }
  return html;
}

module.exports.handler = co.wrap(function* (event, context, callback) {
  let html = yield loadHtml();

  const response =  {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    },
    body: html,
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
});
