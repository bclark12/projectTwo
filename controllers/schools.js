const express = require('express')
const schoolsApi = require('../models/schools.js')
const statesApi = require('../models/states.js')
const teamsApi = require('../models/teams')
const schoolsRouter = express.Router()

console.log(statesApi.getStates().then(states => {
    console.log(states[0].state)
    })
)

schoolsRouter.get('/', (req, res) => {               
    schoolsApi.getSchools().then(schoolsInDB => {
        teamsApi.getTeams().then(teamsInDB => {
            for (i = 0; i < schoolsInDB.length; i++) {
                const matchingTeams = []
                for (j = 0; j < teamsInDB.length; j++) {                   
                    if (schoolsInDB[i]._id == teamsInDB[j].schoolId) {
                        matchingTeams.push(teamsInDB[j])
                        schoolsInDB[i].teams = matchingTeams.length                
                    }                    
                }
            }
            res.render('allSchools', {schoolsInDB})        
        })
    })
})

schoolsRouter.get('/editSchool/:schoolId' ,(req, res) => {
    schoolsApi.getSchool(req.params.schoolId).then(singleSchool => {
    res.render('editSchool', {singleSchool})
    })
})

schoolsRouter.get('/chooseState', (req, res) => {               
    statesApi.getStates().then(statesInDB => {                                                                                
        res.render('chooseState', {statesInDB})                                                                          
    })
})

schoolsRouter.get('/chooseStateForSchools', (req, res) => {               
    statesApi.getStates().then(statesInDB => {                                                                                
        res.render('chooseStateForSchools', {statesInDB})                                                                          
    })
})

schoolsRouter.get('/:stateId', (req, res) => {
    statesApi.getState(req.params.stateId).then(stateInDB => {               
        schoolsApi.getSchools().then(schoolsInDB => {
            const matchingSchools = []
            for (j = 0; j < schoolsInDB.length; j++) {
                if (schoolsInDB[j].stateId == req.params.stateId) {
                    matchingSchools.push(schoolsInDB[j])
                }                    
            }
            teamsApi.getTeams().then(teamsInDB => {
                for (i = 0; i < schoolsInDB.length; i++) {
                    const matchingTeams = []
                    for (j = 0; j < teamsInDB.length; j++) {                   
                        if (schoolsInDB[i]._id == teamsInDB[j].schoolId) {
                            matchingTeams.push(teamsInDB[j])
                            schoolsInDB[i].teams = matchingTeams.length                
                        }                    
                    }
                }                                                                                   
                res.render('schools', {schoolsInDB, stateInDB, matchingSchools, _id: req.params.stateId}) 
            })                                                                         
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
        res.redirect('/main/redirect')
    })
})

schoolsRouter.put('/editSchool/:schoolId', (req, res) => {
    schoolsApi.updateSchool(req.params.schoolId, req.body).then(() => {
        res.redirect('/main/redirect')
    })
})

schoolsRouter.delete('/editSchool/:schoolId', (req, res) => {
    schoolsApi.deleteSchool(req.params.schoolId).then(() => {
        res.redirect('/main/redirect')
    })
})

schoolsRouter.delete('/', (req, res) => {
    schoolsApi.deleteNoNameSchools().then(() => {
        res.redirect('/main/redirect')
    })
})

module.exports = {
    schoolsRouter
}