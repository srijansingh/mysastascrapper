const request = require('request-promise');
const cheerio = require('cheerio');
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;

const Flipkart = require('../model/flipkart');


module.exports = {
    recam : () => {
        amazonHeader = async () =>{ 
            const electronicsItem = [
                'camera',
                'canon camera',
                'nikon camera',
                'sony camera'
            ];
            const electronics = [];
            for(searchIndex=0; searchIndex <= electronicsItem.length; searchIndex++){
                for(index=0;index <=15; index++){
                    const result = await request.get(`https://www.amazon.in/s?k=${electronicsItem[searchIndex]}&page=${index}`);
                    const $ = await cheerio.load(result);
                
                    $('.s-asin').each((i,el)=> {
                        const title = $(el).find('.sp__name').text();  
                        const price = $(el).find('.sc-gZMcBi.cRtfMN').text();
                       
                        const image = 'https://i.postimg.cc/MZM83BnS/rd-logo.png';
                        
                        const datas = {i,title,price,image};
    
                    
                        electronics.push(datas);
                        console.log(datas)

                        const productListing =new Flipkart(
                            {   
                                title:title,
                                price:price,
                                image:image
                            });
            
                            productListing.save() 
                            .then((listing)=> {
                                console.log(listing)
                            })
                            .catch(err => {
                                console.log(err);
                            })
            
                        
                    });
                }
            }
                
            return electronics;
        }
    
        

            const main = async () =>{
                const amazonHead = await amazonHeader();
            }

            main();

        },



    relap : () => {
        amazonHeader = async () =>{ 
            const electronicsItem = [
                'laptop',
                'HP laptop',
                'dell laptop',
                'acer laptop',
                'asus laptop'
            ];
            const electronics = [];
            for(searchIndex=0; searchIndex <= electronicsItem.length; searchIndex++){
                for(index=0;index <=15; index++){
                    const result = await request.get(`https://www.reliancedigital.in/search?q=${electronicsItem[searchIndex]}&page=${index}`);
                    const $ = await cheerio.load(result);
                
                    $('.pl__container__sp').each((i,el)=> {
                        const title = $(el).find('.sp__name').text();  
                        const price = $(el).find('.sc-gZMcBi.cRtfMN').text();
                       
                        const image = 'https://i.postimg.cc/MZM83BnS/rd-logo.png';
                        
                        const datas = {i,title,price,image};
    
                    
                        electronics.push(datas);
                        console.log(datas)

                        const productListing =new Flipkart(
                            {   
                                title:title,
                                price:price,
                                image:image
                            });
            
                            productListing.save() 
                            .then((listing)=> {
                                console.log(listing)
                            })
                            .catch(err => {
                                console.log(err);
                            })
            
                    });
                }
            }
                
            return electronics;
        }
    
        
    
    
        const main = async () =>{
            const amazonHead = await amazonHeader();
        }
    
        main();
    
        }
}