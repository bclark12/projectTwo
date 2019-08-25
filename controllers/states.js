const express = require('express')
const statesApi = require('../models/states.js')
const schoolsApi = require('../models/schools.js')
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

statesRouter.get('/:stateId', (req, res) => {
    statesApi.getState(req.params.stateId).then(singleState => {
        res.render('editState', {singleState})
    })
})

statesRouter.post('/', (req,res) => {
    statesApi.addState(req.body).then(() => {
        res.redirect('/states')
    })
})

statesRouter.put('/:stateId', (req, res) => {
    statesApi.updateState(req.params.stateId, req.body).then(() => {
        res.redirect('/states')
    })
})

statesRouter.delete('/:stateId', (req, res) => {
    statesApi.deleteState(req.params.stateId).then(() => {
        res.redirect('/states')
    })
})
statesRouter.delete('/', (req, res) => {
    statesApi.deleteNoNameStates().then(() => {
        console.log('Button Pressed')
        res.redirect('/states')
    })
})

module.exports = {
    statesRouter
}