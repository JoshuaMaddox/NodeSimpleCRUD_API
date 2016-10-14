const squel = require('squel').useFlavour('mysql')
const connection = require('../config/db')
const tablename = 'users'

//Create a table called users - our users schema - the shape of the data
connection.query(`CREATE TABLE IF NOT EXISTS ${tablename} (
  name VARCHAR(50),
  age SMALLINT,
  id INT NOT NULL AUTO_INCREMENT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)`, err => {
  if(err) throw err
})

exports.findAll = function() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tablename}`, (err, users) => {
      if(err) return reject(err)
      resolve(users)
    })
  })
}

exports.create = function(newUser) {
  console.log('I am newUser: ', newUser)
  return new Promise((resolve, reject) => {
    let sql = squel.insert()
      .into(tablename)
      .setFields(newUser)
      .toString();

    connection.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

exports.update = function(updatedUser) {
  console.log('I am an updatedUser', updatedUser)
  return new Promise((resolve, reject) => {
    let sql = squel.update()
      .table(tablename)
      .where(`${updatedUser.id} = id`)
      .setFields(updatedUser)
      .toString()

      connection.query(sql, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

exports.delete = function(deleteUser) {
  console.log('I am an id to Delete', deleteUser)
  return new Promise((resolve, reject) => {
    let sql = squel.delete()
      .from(tablename)
      .where(`${deleteUser.id}=id`)
      .order("id")
      .toString()

    connection.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}



