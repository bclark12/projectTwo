const express = require('express')

const billsApi = require('../models/model.js')

const Router = express.Router()

//dont have to have functions in the handlers
//can direct to a hbs with only links
Router.get('/', (req, res) => {
    res.render('allBills')
})

module.exports = {
    Router
}