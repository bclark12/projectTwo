const express = require('express')

teamsApi = require('../models/teams')
schoolsApi = require('../models/schools')
statesApi = require('../models/states')

const teamsRouter = express.Router()


teamsRouter.get('/:schoolId', (req, res) => {
    teamsApi.getTeams().then(teamsInDB => { 
        schoolsApi.getSchool(req.params.schoolId).then(singleSchool => {
        console.log(teamsInDB)
        const matchingTeams = []
        for (i = 0; i < teamsInDB.length; i++) {
            console.log(i)
            if (teamsInDB[i].schoolId == req.params.schoolId) {
                console.log(teamsInDB[i].name)
                matchingTeams.push(teamsInDB[i])
            }                    
        }     
    res.render('teams', {teamsInDB, singleSchool, matchingTeams})
        })
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

teamsRouter.delete('/:teamId', (req, res) => {
    teamsApi.deleteNoNameTeams().then(() => {
        res.redirect('/main/redirect')
    })
})







module.exports = {
    teamsRouter
}