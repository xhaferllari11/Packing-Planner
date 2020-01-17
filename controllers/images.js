const Image = require('../models/image');
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
})

// have not included case where user uploads a duplicate image
function create(req, res) {
    const img = req.body.imgURL;
    app.models.predict('e0be3b9d6a454f0493ac3a30784001ff', img).then(
        function (response) {
            // initialize empty model
            let imgObj = {
                url: img,
                classification: [],
                confidence: []
            };
            // put clarifai data in model and create
            response.outputs[0].data.concepts.forEach(function (d) {
                imgObj.classification.push(d.name);
                imgObj.confidence.push(d.value);
            });
            Image.create( imgObj , function(e, image){
                if (e) res.status(400).json(e);
                console.log('image',image);
                res.json(image);
            });
        },
        function (error) {
            console.log('error: ', error);
            res.status(400).send(error);
        }
    );
}

module.exports = {
    create
}