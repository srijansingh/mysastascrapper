const request = require('request-promise');
const cheerio = require('cheerio');
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;


 
const Product = require('../model/product');
const Flipkart = require('../model/flipkart');

module.exports = {
    ebay : () => {
        ebayHeader = async () => {
            Product.distinct("category")
            .then(result => {
                console.log(result)
                return result
            }).then(async response => {
                return await Promise.all(
                    response.map(async list =>{
                        for(index= 1; index <3; index++ ){
                            const result = await request.get(`https://www.ebay.com/sch/i.html?_nkw=${list}&_ipg=200&_pgn=${index}`);
                            const $ = await cheerio.load(result);
                        
                            $('.s-item ').each((i,el)=> {
                        
                                const title = $(el).find('.s-item__title').text();
                                const price = $(el).find('.s-item__price').text().split(' ')[1];
                                const image= "https://i.postimg.cc/kGgBT5k8/ebay.png";
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
            const flipHead = await ebayHeader();
           
        }

        main();
    }
    
}














