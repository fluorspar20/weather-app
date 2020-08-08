const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmx1b3JzcGFyIiwiYSI6ImNrZGZzMnc3YjB6Nm8yd25yeTRmN3Bzc3IifQ.z4amK8lAAMtY6HJhCFvthw&limit=1`
    request({url: url , json: true}, (error,response) => {
        if(error || response.body.features.length === 0){
            callback('Location not found',undefined)
        }else{
            callback(undefined , {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode