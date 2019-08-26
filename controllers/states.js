const express = require('express')
const statesApi = require('../models/states.js')
const schoolsApi = require('../models/schools.js')
const statesRouter = express.Router()
//dont have to have functions in the handlers
//can direct to a hbs with only links
statesRouter.get('/', (req, res) => {
    statesApi.getStates().then(statesInDB => {
        schoolsApi.getSchools().then(schoolsInDB => {
            for (i = 0; i < statesInDB.length; i++) {
                const matchingSchools = []
                for (j = 0; j < schoolsInDB.length; j++) {                   
                   if (statesInDB[i]._id == schoolsInDB[j].stateId) {
                       matchingSchools.push(schoolsInDB[j])
                       statesInDB[i].schools = matchingSchools.length                 
                    }                    
                }
            }
            res.render('states', {statesInDB});
        })
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
        res.redirect('/main/redirect')
    })
})

statesRouter.put('/:stateId', (req, res) => {
    statesApi.updateState(req.params.stateId, req.body).then(() => {
        res.redirect('/main/redirect')
    })
})

statesRouter.delete('/:stateId', (req, res) => {
    statesApi.deleteState(req.params.stateId).then(() => {
        res.redirect('/main/redirect')
    })
})
statesRouter.delete('/', (req, res) => {
    statesApi.deleteNoNameStates().then(() => {
        console.log('Button Pressed')
        res.redirect('/main/redirect')
    })
})

module.exports = {
    statesRouter
}