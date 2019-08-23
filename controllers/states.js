const express = require('express')
const statesApi = require('..models/states.js')
const statesRouter = express.Router()
//dont have to have functions in the handlers
//can direct to a hbs with only links
statesRouter.get('/', (req, res) => {
    statesApi.getStates().then(statesInDB => {
    res.render('states', {statesInDB});
    })
})

statesRouter.get('/addState', (req, res) => {
    res.render('addState', {})
})

module.exports = {
    statesRouter
}