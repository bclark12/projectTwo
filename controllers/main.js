const express = require('express')

const billsApi = require('../models/main.js')

const mainRouter = express.Router()

//dont have to have functions in the handlers
//can direct to a hbs with only links
mainRouter.get('/', (req, res) => {
    res.render('main')
})

module.exports = {
    mainRouter
}