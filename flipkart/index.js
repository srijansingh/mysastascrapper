const express = require('express');
const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;
const port = 8002;

const {flipkart} = require('./scrapper/flipkart');




const app = express();

async function main(){
   
    await flipkart();
  
}

new CronJob('0 0 23 * * *', function() {
   main();
    }, null, true, 'Asia/Kolkata');






app.get('/', (req, res) => res.send('Flipkart'))

mongoose.connect(
    'mongodb+srv://webscraping:Qwerty123@clusterscraping-eukyu.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }
).then(

    app.listen(port,  ()=> {
        console.log(`Server running at http://localhost:${port}`);
    })
).catch(err => {
    console.log(err);
})
