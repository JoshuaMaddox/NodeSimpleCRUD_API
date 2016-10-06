const fs = require('fs')
const http = require('http');
const anyBody = require('body/any');
const jsonFile = require('./methods.js')

const server = http.createServer((req, res) => {
  let {mesGET, mesGETId, mesPOST, mesDELETE, mesPUT} = jsonFile
  let { url, method } = req
  let [ empty, messages, idFrom ] = url.split('/')

  if(url === '/messages'){
    switch(method){
      case 'GET':{
        mesGET(res)
      } break
      case 'POST': {
        mesPOST(req, res)
      } break
      default: {
      res.statusCode = 405;
      res.end('405 Not Found');       
      }; break;
    }
  }

  if(idFrom){
    switch(method){
      case 'GET':{
        mesGETId(res, idFrom)
      } break
      case 'DELETE': {
        mesDELETE(res, idFrom)
      } break
      case 'PUT': {
        mesPUT(res, idFrom, req)
      } break
      default: {
      res.statusCode = 405;
      res.end('405 Not Found');       
      }; break;
    }
  }   
});

server.listen(8000, err => {
  console.log(err || `Server listening...`);
});