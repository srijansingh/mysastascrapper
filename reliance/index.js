const express = require('express');
const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;
const port = 8003;

const {recam,relap} = require('./scrapper/reliance');



const app = express();

async function main(){
    
    await recam();
    await relap();
}

new CronJob('0 0 22 * * *', function() {
   main();
    }, null, true, 'Asia/Kolkata');






app.get('/', (req, res) => res.send('Reliance'))

mongoose.connect(
    'mongodb+srv://webscraping:Qwerty123@clusterscraping-eukyu.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }
).then(

    app.listen(port,  ()=> {
        console.log(`Server running at http://localhost:${port}`);
    })
).catch(err => {
    console.log(err);
})
