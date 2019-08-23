const express = require('express')

const statesRouter = express.Router()
//dont have to have functions in the handlers
//can direct to a hbs with only links
statesRouter.get('/', (req, res) => {
    res.render('states');
})

module.exports = {
    statesRouter
}