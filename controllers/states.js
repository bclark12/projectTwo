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
                console.log(i)
                console.log(statesInDB[0]._id)
                const matchingSchools = []
                for (j = 0; j < schoolsInDB.length; j++) {
                    console.log(j)
                    console.log(schoolsInDB[j].stateId)
                   if (statesInDB[i]._id == schoolsInDB[j].stateId) {
                       //console.log(statesInDB[i])
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