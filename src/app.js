
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const helpMethod = require('../utils/helperMethods')
const weather = require('../utils/weatherAPI')

const app = express()
const port = process.env.PORT || 3000

// define paths for server config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// const ISOstartPath = path.join(__dirname, '../../ISO_start') //test path

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static to serve, css and susch
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Wille's Weather App",
    })
})

app.get('/weather', (req, res) => {

    const locationName = req.query.location

    if (!locationName) {
        return res.render('404',{
            title: 'Page not found!',
            errorText: 'Bad search string'
        })
    }

    weather(locationName, (error, {Weather, Temp} = {}) => {
        if(error){
            return res.send({error})
        }
    
        res.send({
            location: helpMethod.capitalize(locationName),
            forecast: Weather,
            temp: Temp
        })
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        helpText: 'This is a help text for you',
        name: 'Wille'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ME!',
        name: 'Wille'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found dude'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
});