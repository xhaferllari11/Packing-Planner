const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '479485b1a3e043bd91fae629b4eaaf16'
})

app.models.predict('e0be3b9d6a454f0493ac3a30784001ff', 'https://www.dickies.com/dw/image/v2/AAYI_PRD/on/demandware.static/-/Sites-master-catalog-dickies/default/dw45b9e7cd/images/main/WL450_AG_FR.jpg?sw=1563&sh=2000&sm=fit').then(
    function (response) {
        console.log(JSON.stringify(response));
    },
    function (error) {
        console.log("ERROR:");
        console.log(error);
    }
);