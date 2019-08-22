const express = require('express')
const app = express()
const methodOverride = require('method-override')
const hbs = require('hbs')

const { mainRouter } = require('./controllers/main.js')

app.use(express.urlencoded())

app.use(express.json())

app.use(methodOverride('_method'))

app.use(express.static(__dirname+"/public"))

app.set('view engine', 'hbs')

app.use('/main', mainRouter)

const PORT = process.env.PORT || 2000

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
