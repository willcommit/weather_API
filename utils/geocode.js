const request = require('request');

const geocode = (address, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='
        + encodeURIComponent(address)
        + ',se&units=metric&appid=4d5803668921d5f121ea065512aad0e7';

    request({ url: url, json: true }, (error, {body}) => {
        if(error){
            callback('unable to connect', undefined)
        } else if (body.cod === "404") {
            callback ('Check your input string ' + body.message, undefined)
        } else {
            callback(undefined, {
                Name: body.name
            })
        }
    })
}

module.exports = geocode;