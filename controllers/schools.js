const express = require('express')
const schoolsApi = require('../models/schools.js')
const statesApi = require('../models/states.js')
const schoolsRouter = express.Router()
//try loop here
console.log(statesApi.getStates().then(states => {
    console.log(states[0].state)
    })
)
statesApi.getStates().then(states => {
schoolsRouter.get('/'+ states[0].state +'/:stateId', (req, res) => {
    statesApi.getState(req.params.stateId).then(stateInDB => {
        schoolsApi.getSchools().then(schoolsInDB => {      
            res.render('schools', {schoolsInDB, stateInDB, _id: req.params.stateId})
        })
    })
})
})

// console.log(statesApi.getStates().then(states => {
//     console.log(states[0].state)
//     })
// )
statesApi.getStates().then(states => {
    return states[0].states
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