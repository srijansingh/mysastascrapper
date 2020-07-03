const express = require('express');
const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;
const port = 8000;
const {mobile, camera, laptop} = require('./scrapper/amazon');




const app = express();

async function main(){
    await camera();
    await mobile();
    await laptop();
    
}

new CronJob('0 0 19 * * *', function() {
   main();
    }, null, true, 'Asia/Kolkata');






app.get('/', (req, res) => res.send('Amazon'))

mongoose.connect(
    'mongodb+srv://webscraping:Qwerty123@clusterscraping-eukyu.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }
).then(

    app.listen(port,  ()=> {
        console.log(`Server running at http://localhost:${port}`);
    })
).catch(err => {
    console.log(err);
})
