const request = require('request');

weatherAPI = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&units=I`

async function index(req,res){
    // get weather only // a save button will persist
    request(weatherAPI + '&lat=' + req.body.lat
        + '&lon=' + req.body.lon, function(e,r,body){
            if (e) res.status(400).json(e);
            console.log('we',body);
            rawBody = JSON.parse(body);
            console.log('we2',rawBody);
            res.json(rawBody);
        });
}

module.exports = {
    index
}