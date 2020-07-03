const express = require('express');
const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;
const port = 8001;

const {ebay} = require('./scrapper/ebay');




const app = express();

async function main(){
    
    await ebay();
}

new CronJob('0 0 21 * * *', function() {
   main();
    }, null, true, 'Asia/Kolkata');






app.get('/', (req, res) => res.send('Ebay'))

mongoose.connect(
    'mongodb+srv://webscraping:Qwerty123@clusterscraping-eukyu.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }
).then(

    app.listen(port,  ()=> {
        console.log(`Server running at http://localhost:${port}`);
    })
).catch(err => {
    console.log(err);
})
