const express = require('express')

teamsApi = require('../models/teams')
schoolsApi = require('../models/schools')
statesApi = require('../models/states')

const teamsRouter = express.Router()


teamsRouter.get('/:schoolId', (req, res) => {
    teamsApi.getTeams().then(teamsInDB => { 
        schoolsApi.getSchool(req.params.schoolId).then(singleSchool => {
             
    res.render('teams', {teamsInDB, singleSchool})
        })
    })
})

teamsRouter.get('/addTeam/:schoolId', (req, res) => {
    schoolsApi.getSchool(req.params.schoolId).then(singleSchool => {

    res.render('addTeam', {singleSchool})
    })

})

teamsRouter.post('/:schoolId', (req, res) => {
    teamsApi.addTeam(req.body).then(() => {
        res.redirect('/main/redirect')
    })
})







module.exports = {
    teamsRouter
}