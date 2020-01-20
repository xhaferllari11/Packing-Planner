const request = require('request');

weatherAPI = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&units=I`

// &lat=32.7&lon=-96.8

async function index(req,res){
    console.log('req went in;',req.body);
    // get weather // a save button will persist

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