const express = require('express')
const app = express()
const methodOverride = require('method-override')
const hbs = require('hbs')

const { mainRouter } = require('./controllers/main.js')
const { statesRouter } = require('./controllers/states.js')
const { schoolsRouter } = require('./controllers/schools.js')
const { teamsRouter } = require('./controllers/teams.js')

app.use(express.urlencoded())

app.use(express.json())

app.use(methodOverride('_method'))

app.use(express.static(__dirname+"/public"))

app.set('view engine', 'hbs')

app.use('/main', mainRouter)
app.use('/states', statesRouter)
app.use('/schools', schoolsRouter)
app.use('/teams', teamsRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
