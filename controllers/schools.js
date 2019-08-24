const express = require('express')
const schoolsApi = require('../models/schools.js')
const statesApi = require('../models/states.js')
const schoolsRouter = express.Router()

schoolsRouter.get('/:stateId', (req, res) => {
    statesApi.getState(req.params.stateId).then(stateInDB => {
        schoolsApi.getSchools().then(schoolsInDB => {      
            res.render('schools', {schoolsInDB, stateInDB, _id: req.params.stateId})
        })
    })
})

schoolsRouter.get('/addSchool/:stateId', (req, res) => {
    statesApi.getState(req.params.stateId).then(stateInDB => {
        res.render('addSchool', {stateInDB, _id: req.params.stateId})
    })
})

schoolsRouter.post('/:stateId', (req, res) => {
    schoolsApi.addSchool(req.body).then(() => {
        res.redirect(req.params.stateId)
    })
})

module.exports = {
    schoolsRouter
}