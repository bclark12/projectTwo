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
    for (i = 0; i < states.length; i++) {
        schoolsRouter.get('/' + states[i].state +'/:stateId', (req, res) => {
            statesApi.getState(req.params.stateId).then(stateInDB => {               
                schoolsApi.getSchools().then(schoolsInDB => {
                    console.log(schoolsInDB[9].state)
                    console.log(schoolsInDB.length)  //schoolsInDB is an array
                    // for (j = 0; j < schoolsInDB.length; j++) {
                    // if (schoolsInDB[j].state == states[i].state) {

                    // }
                    // }
                    //schoolsApi.getSchool()
                    //schoolsApi.getSchoolsByState(states[i]).then(matchingSchools => {
                        res.render('schools', {schoolsInDB, stateInDB, _id: req.params.stateId})
                    //})
                })
            })
        })
    }
})

// console.log(statesApi.getStates().then(states => {
//     console.log(states[0].state)
//     })
// )

schoolsRouter.get('/addSchool/:stateId', (req, res) => {
    statesApi.getState(req.params.stateId).then(stateInDB => {
        res.render('addSchool', {stateInDB, _id: req.params.stateId})
    })
})
//will post to specific state
statesApi.getStates().then(states => {
    for (i = 0; i < states.length; i++) {
        //schoolsRouter.post('/:stateId', (req, res) => {
        schoolsRouter.post('/' + states[i].state + '/:stateId', (req, res) => {
            schoolsApi.addSchool(req.body).then(() => {
                res.send('worked')
            })
        })
    }
})

module.exports = {
    schoolsRouter
}