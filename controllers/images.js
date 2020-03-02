const Image = require('../models/image');
const User = require('../models/user');
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
});

const WandC = {
    'hot': ['Skirt', 'Shorts', 'T-Shirt', 'Shirt', 'Polos', 'Dress', 'Sleevless', 'Sandals'],
    'cold': ['Blazer', 'Sweatshirt', 'Hoodies', 'Blouse', 'Jacket', 'Denim', 'Coat', 'Gloves', 'Cardigan', 'Jumpsuit', 'Boots', 'Tracksuit'],
    'rainy': ['Rain', 'Jacket', 'Umbrella', 'Raincoats'],
    'essentials': ['Underwear', 'Sleepwear', 'Tights', 'Leggings', 'Pants', 'Jeans', 'Sneakers', 'Panties']
};

// have not included case where user uploads a duplicate image
async function create(req, res) {
    const img = req.body.imgURL;
    const user = await User.findById(req.user._id);
    if (!user) res.status(400).json('user not signed in');
    app.models.predict('e0be3b9d6a454f0493ac3a30784001ff', img)
        .then(function (response) {
            // initialize empty object
            let imgObj = {
                url: img,
                classification: [],
                confidence: [],
                typeWeather: []
            };
            // put clarifai data in object and create document
            response.outputs[0].data.concepts.forEach(function (d) {
                imgObj.classification.push(d.name);
                imgObj.confidence.push(d.value);
            });
            // add typeweather to image obj
            let mainClassArr = imgObj.classification[0].split(' ');
            mainClassArr.forEach(function (c) {
                for (const condition in WandC) {
                    if (WandC[condition].includes(c)) {
                        imgObj.typeWeather.push(condition);
                    };
                };
            });
            Image.create(imgObj)
                .then(function (image) {
                    user.images.push(image);
                    user.save();
                    res.json(image);
                })
                .catch(function (e) {
                    res.status(400).json(e);
                });
        },
            function (error) {
                console.log('error: ', error);
                res.status(400).send(error);
            });
}

function index(req, res) {
    User.findById(req.user._id)
        .populate('images')
        .exec(function (e, u) {
            if (e) res.status(400).json('user does not exit');
            const images = u.images
            res.json({ images: images });
        });
};

module.exports = {
    create,
    index
}