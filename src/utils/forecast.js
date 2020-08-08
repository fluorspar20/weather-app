const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const coordUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}&APPID=61aa8f28cca4654865d870872f1d0a61`

    request({url: coordUrl, json: true}, (error,response) => {
        if(error){
            callback('Invalid Location',undefined)
        }else{
            callback(undefined , response.body.main)
        }
    })
}

module.exports = forecast