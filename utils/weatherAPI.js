const request = require('request')

const weather = (address, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='
        + encodeURIComponent(address)
        + ',se&units=metric&appid=4d5803668921d5f121ea065512aad0e7';

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('unable to connect', undefined)
        } else if (body.cod === "404") {
            callback (body.message, undefined)
        } else {
            callback(undefined, {
                Weather: body.weather[0].main,
                Temp: body.main.temp
            })
        }
    })
}

module.exports = weather;