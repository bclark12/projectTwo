const express = require('express')


const teamsRouter = express.Router()

teamsRouter.get('/:schoolId', (req, res) => {
    res.render('teams')
})





module.exports = {
    teamsRouter
}