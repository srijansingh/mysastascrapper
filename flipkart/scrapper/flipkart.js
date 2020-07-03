const request = require('request-promise');
const cheerio = require('cheerio');
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;


 
const Product = require('../model/product');
const Flipkart = require('../model/flipkart');

module.exports = {
    flipkart : () => {
        flipkartHeader = async () => {
            Product.distinct("category")
            .then(result => {
                console.log(result)
                return result
            }).then(async response => {
                return await Promise.all(
                    response.map(async list =>{
                        for(index=0; index<=10; index++){
                            const result = await request.get('https://www.flipkart.com/search?q='+list+"&page="+index);
                            const $ = await cheerio.load(result);
                        
                            $('.bhgxx2 ').each((i,el)=> {
                        
                                const title = $(el).find('._3wU53n').text();
                                const price = $(el).find('._1vC4OE').text().slice(1);
                                const image =  "https://i.postimg.cc/5083fXrz/flipkart.png";
                                
                                const flipkart = new Flipkart({
                                    title:title,
                                    price:price,
                                    image:image
                                })
                                
                                flipkart.save()
                                .then(res => {
                                    console.log(res)
                                })
                            
                            });
                        }
                       
                    }
                ))
            })
        }

        main = async () => {
            const flipHead = await flipkartHeader();
           
        }

        main();
    }
    
}







