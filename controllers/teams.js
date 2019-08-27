const express = require('express')

teamsApi = require('../models/teams')
schoolsApi = require('../models/schools')
statesApi = require('../models/states')

const teamsRouter = express.Router()

teamsRouter.get('/', (req, res) => {
    teamsApi.getTeams().then(teamsInDB => {   
        res.render('allTeams', {teamsInDB})
    })
})
teamsRouter.get('/chooseStateForTeams', (req, res) => {
    statesApi.getStates().then(statesInDB => {
        res.render('chooseStateForTeams', {statesInDB})
    })
})

teamsRouter.get('/chooseStateForTeamAdd', (req, res) => {
    statesApi.getStates().then(statesInDB => {
        res.render('chooseStateForTeamAdd', {statesInDB})
    })
})

teamsRouter.get('/:schoolId', (req, res) => {
    teamsApi.getTeams().then(teamsInDB => { 
        schoolsApi.getSchool(req.params.schoolId).then(singleSchool => {        
        const matchingTeams = []
        for (i = 0; i < teamsInDB.length; i++) {            
            if (teamsInDB[i].schoolId == req.params.schoolId) {                
                matchingTeams.push(teamsInDB[i])
            }                    
        }     
        res.render('teams', {teamsInDB, singleSchool, matchingTeams})
        })
    })
})

teamsRouter.get('/chooseSchoolForTeams/:stateId', (req, res) => {
    schoolsApi.getSchools().then(schoolsInDB => {
        const matchingSchools = []
        for (j = 0; j < schoolsInDB.length; j++) {
            if (schoolsInDB[j].stateId == req.params.stateId) {
                matchingSchools.push(schoolsInDB[j])
            }                    
        }
        statesApi.getState(req.params.stateId).then(singleState => {
            res.render('chooseSchoolForTeams', {matchingSchools, singleState})
        })
    })
})
teamsRouter.get('/chooseSchoolForTeamAdd/:stateId', (req, res) => {
    schoolsApi.getSchools().then(schoolsInDB => {
        const matchingSchools = []
        for (j = 0; j < schoolsInDB.length; j++) {
            if (schoolsInDB[j].stateId == req.params.stateId) {
                matchingSchools.push(schoolsInDB[j])
            }                    
        }
        res.render('chooseSchoolForTeamAdd', {matchingSchools, schoolsInDB, stateId: req.params.stateId})
    })
})

teamsRouter.get('/addTeam/:schoolId', (req, res) => {
    schoolsApi.getSchool(req.params.schoolId).then(singleSchool => {

    res.render('addTeam', {singleSchool})
    })

})

teamsRouter.get('/editTeam/:teamId', (req, res) => {
    teamsApi.getTeam(req.params.teamId).then(singleTeam => {
    res.render('editTeam', {singleTeam})
    })
})



teamsRouter.post('/:schoolId', (req, res) => {
    teamsApi.addTeam(req.body).then(() => {
        res.redirect('/main/redirect')
    })
})
teamsRouter.put('/editTeam/:teamId', (req, res) => {
    teamsApi.updateTeam(req.params.teamId, req.body).then(() => {
        res.redirect('/main/redirect')
    })
})

teamsRouter.delete('/editTeam/:teamId', (req, res) => {
    teamsApi.deleteTeam(req.params.teamId).then(() => {
        res.redirect('/main/redirect')
    })
})

teamsRouter.delete('/', (req, res) => {
    teamsApi.deleteNoNameTeams().then(() => {
        res.redirect('/main/redirect')
    })
})

teamsRouter.delete('/:teamId', (req, res) => {
    teamsApi.deleteNoNameTeams().then(() => {
        res.redirect('/main/redirect')
    })
})

module.exports = {
    teamsRouter
}