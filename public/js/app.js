console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecast = document.querySelector('#forecast')
const weatherError = document.querySelector('#weatherError')
const loc = document.querySelector('#loc')

forecast.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    forecast.textContent = 'Loading...'
    weatherError.textContent = ''
    loc.textContent = ''

    fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
        if(data.error){
            forecast.textContent = ''
            loc.textContent = ''
            weatherError.textContent = data.error
        }else{
            // console.log(data.location);
            // console.log(data.forecast);
            loc.textContent = data.location
            forecast.textContent = 'Max temperature is ' + (data.forecast.temp_max - 273.15).toFixed(2) + '°C, Min temperature is ' + (data.forecast.temp_min - 273.15).toFixed(2) + '°C and humidity level is '+ data.forecast.humidity + '.'
        }
    })

    search.value = ''
})

})