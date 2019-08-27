const express = require('express')

const mainRouter = express.Router()
//dont have to have functions in the handlers
//can direct to a hbs with only links
mainRouter.get('/', (req, res) => {
    res.render('main')
})
mainRouter.get('/redirect', (req, res) => {
    res.render('redirect')
    
})

module.exports = {
    mainRouter
}