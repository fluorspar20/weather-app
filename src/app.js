const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')  // the default location where Express expects views to live in views folder
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amogh Dixit'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Amogh Dixit'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Need Help?',
        name: 'Amogh Dixit',
        message: 'This website is built using Node.js . It fetches data from OpenWeatherMap and displays the weather forecast of the provided address. To get your forecast, just enter your address and it will display the forecast!'
    })
})

app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address , (error, data = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(data.longitude,data.latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Pune',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

/*an example handler which is used to set up an error message when the user
 tries to access the url- baseUrl/help/{anything that doesn't exist} */
app.get('/help/*', (req,res) => {
    res.render('errorPage', {
        errorMess: 'Help article not found',
        title: '404 Error',
        name: 'Amogh Dixit'
    })
})

app.get('*',(req,res) => {
    res.render('errorPage', {
        errorMess: 'Page not Found',
        title: '404 Error',
        name: 'Amogh Dixit'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is up on port '+ port);
})