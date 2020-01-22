const User = require('../models/user')
const Trip = require('../models/trip')
const Weather = require('../models/weather')

async function create(req, res) {
    //refactor weather for DB
    req.body.weather.forEach(function(w){
        w.icon = w.weather.icon;
        w.description = w.weather.description;
    });
    Weather.create(req.body.weather)
        .then(function (weathers) {
            let trip = new Trip({
                destination: req.body.destination,
                duration: req.body.duration,
                weather: weathers,
                suggestedItems: req.body.suggestedItems
            });
            return trip.save();
        })
        .then(async function (t) {
            let user = await User.findById(req.user._id);
            user.trips.push(t);
            return user.save();
        })
        .then(function () {
            // maybe send all trips back to pupulate sate
            // or just the additional trip
            res.status(200).json(`Saved trip to ${req.body.destination}`);
        })
        .catch(function (e) {
            res.status(400).json(e);
        });
};

function index(req, res) {
    User.findById(req.user._id).
    then(function(u){
        console.log('u',u);
        return Trip.where('_id')
        .in(u.trips).populate('weather')
        .populate('suggestedItems')
        .sort('date');
    })
    .then(function(trips){
        console.log('trips',trips);
        res.status(200).json(trips);
    })
    .catch(function(e){
        res.status(400).json(e);
    });
}

module.exports = {
    create,
    index
};