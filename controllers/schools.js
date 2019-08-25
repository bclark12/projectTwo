const express = require('express')
const schoolsApi = require('../models/schools.js')
const statesApi = require('../models/states.js')
const schoolsRouter = express.Router()
//try loop here
console.log(statesApi.getStates().then(states => {
    console.log(states[0].state)
    })
)
        schoolsRouter.get('/:stateId', (req, res) => {
            statesApi.getState(req.params.stateId).then(stateInDB => {               
                schoolsApi.getSchools().then(schoolsInDB => {
                    console.log(schoolsInDB[14].stateId)
                    console.log(schoolsInDB)  //schoolsInDB is an array
                    //loop here  
                    const matchingSchools = []
                    for (j = 0; j < schoolsInDB.length; j++) {
                        console.log(j)
                        if (schoolsInDB[j].stateId == req.params.stateId) {
                            console.log(schoolsInDB[j])
                            matchingSchools.push(schoolsInDB[j])
                        }                    
                    }
                    let testSchools = [
                      {
                        _id: '5d61e56cad02c743de1e3844',
                        name: 'nostatename',
                        state: 'Idaho',
                        students: 32523,
                        mascot: 'asdfg',
                        athleticsRank: 5,
                        stateId: '5d61e002be6c234321ee6e4d',
                        __v: 0
                      },
                      {
                        _id: '5d628e62306f0d4519f51568',
                        name: 'idaho college',
                        state: '',
                        students: 2344,
                        mascot: 'asss',
                        athleticsRank: 6,
                        stateId: '5d61e002be6c234321ee6e4d',
                        __v: 0
                      }
                    ]
                    //statesApi.getStates().then(states => {
                        //console.log(states[0].state)
                                                               
                        res.render('schools', {schoolsInDB, stateInDB, testSchools, matchingSchools, _id: req.params.stateId})
                    
                    
                  
                    //})
                })
            })
        })
    //}
//})



schoolsRouter.get('/addSchool/:stateId', (req, res) => {
    statesApi.getState(req.params.stateId).then(stateInDB => {
        res.render('addSchool', {stateInDB, _id: req.params.stateId})
    })
})
//will post to specific state
statesApi.getStates().then(states => {
    for (i = 0; i < states.length; i++) {
        //schoolsRouter.post('/:stateId', (req, res) => {
        schoolsRouter.post('/:stateId', (req, res) => {
            schoolsApi.addSchool(req.body).then(() => {
                res.send('worked')
            })
        })
    }
})

module.exports = {
    schoolsRouter
}