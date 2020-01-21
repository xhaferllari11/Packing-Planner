const Image = require('../models/image');
const User = require('../models/user');
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
})

// have not included case where user uploads a duplicate image
async function create(req, res) {
    const img = req.body.imgURL;
    const user = await User.findById(req.user._id);
    if (!user) res.status(400).json('user not signed in');
    app.models.predict('e0be3b9d6a454f0493ac3a30784001ff', img).then(
        function (response) {
            // initialize empty object
            let imgObj = {
                url: img,
                classification: [],
                confidence: []
            };
            // put clarifai data in object and create document
            response.outputs[0].data.concepts.forEach(function (d) {
                imgObj.classification.push(d.name);
                imgObj.confidence.push(d.value);
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
        }
    );
}

function index(req, res) {
    console.log('alksd');

    User.findById(req.user._id)
    .populate('images')
    .exec(function(e,u){
        if (e)  res.status(400).json('user does not exit');
        console.log('u',u)
        const images = u.images
        console.log('images',images);
        res.json({ images: images });
    });
}

module.exports = {
    create,
    index
}