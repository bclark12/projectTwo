const mongoose = require('mongoose')

const connectionString = "mongodb://localhost/main";

mongoose.connect(connectionString, { useNewUrlParser: true}).then( () => {
  console.log(`connected to our mongodb at ${connectionString}`)
})

module.exports = mongoose