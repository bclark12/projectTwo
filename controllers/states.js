const express = require('express')
const statesApi = require('../models/states.js')
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

statesRouter.post('/', (req,res) => {
    statesApi.addState(req.body).then(() => {
        res.redirect('/states')
    })
})

module.exports = {
    statesRouter
}