const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const anyBody = require('body/any');
const moment = require('moment')
const jsonFile = require(path.resolve('./data.json'))

const mesGET = function(res){
  fs.readFile('data.json', (err, buffer) => {
    let messages = JSON.parse(buffer);
    return res.end(JSON.stringify(messages))
  });
}

const mesGETId = function(res, idFrom){
  let singleMes;
  fs.readFile('data.json', (err, buffer) => {
    let messages = JSON.parse(buffer);
    messages.forEach((item, index) => {
      if(idFrom === item.id){
        return singleMes = item 
      }
    })
  return res.end(JSON.stringify(singleMes))
  })
}

const mesPOST = function(req, res){
  anyBody(req, (err,body) => {
    body.time = moment().format('LLL')
    body.id = uuid() 
    fs.readFile('data.json', (err, buffer) => {
      let messages = JSON.parse(buffer);
      messages.push(body);
      fs.writeFile('data.json', JSON.stringify(messages), err => {
        return res.end('Message Successfully Posted');
      })
    })     
  }) 
}

const mesDELETE = function(res, idFrom){
  fs.readFile('data.json', (err, buffer) => {
    let messages = JSON.parse(buffer)
    let newMes = messages.filter((elem, index)=> {
      if(elem.id !== idFrom){
        return elem
      }
    })
    fs.writeFile('data.json', JSON.stringify(newMes), err => {
      console.log(err)
    })
  return res.end('Your File Was Succesfully Deleted')
  }) 
}

const mesPUT = function(res, idFrom, req){
  anyBody(req, (err,body) => {
    fs.readFile('data.json', (err, buffer) =>{
      let messages =  JSON.parse(buffer)
      let newMes = messages.map((elem, index) => {
        if(elem.id === idFrom){
          elem.author = body.author
          elem.text = body.text
          return elem
        } else {
          return elem
        }
      })
      fs.writeFile('data.json', JSON.stringify(newMes), err => {})
    })
    return res.end('Message Successfully Replaced');
  })
}

module.exports = {
  mesGET: mesGET,
  mesGETId: mesGETId,
  mesPOST: mesPOST,
  mesDELETE: mesDELETE,
  mesPUT: mesPUT
}