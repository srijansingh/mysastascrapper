const request = require('request-promise');
const cheerio = require('cheerio');
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;

const clothing = [];



const clothingItem = [
    'shirt',
    'jeans',
    'trousers',
    't-shirt'
]

const Amazonlisting = require('../model/product');

module.exports = {
    mobile : () => {
                amazonHeader = async () =>{ 
                const electronicsItem = [
                    'mobiles',
                    'redmi mobile',
                    'samsung mobile',
                    'vivo mobile',
                    'honor mobile',
                    'nokia mobile'
                ];
                const electronics = [];
                for(searchIndex=0; searchIndex <= electronicsItem.length; searchIndex++){
                    for(index=0;index <=15; index++){
                        
                        const result = await request.get(`https://www.amazon.in/s?k=${electronicsItem[searchIndex]}&page=${index}`);
                        const $ = await cheerio.load(result);
                    
                        $('.s-asin').each((i,el)=> {
                            const title = $(el).find('h2 span').text();  
                            const price = $(el).find('.a-price-whole').text();
                            const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                            const image = $(el).find('.s-image').attr('src');
                            const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                            const item = electronicsItem[searchIndex];
                            const datas = {i,title, price, rating, image, link, item };
                            const tes = {i, item}
                          
                            electronics.push(datas);
                            console.log(tes)
                            
                        });
                    }
                }
                    
                return electronics;
            }
            
         amazonDescription = async (amazonHead) =>{
            return await Promise.all(
                amazonHead.map(async product => {
                    const html = await request.get(product.link);
                    const $ = await cheerio.load(html);
        
                    product.allimage = $('.a-dynamic-image').attr('data-a-dynamic-image');
                    product.id = $("#averageCustomerReviews").attr("data-asin");
                    product.description = $('#productDescription p').text().trim();
                    // product.title = $("#productTitle").text().trim();
                    product.brand = $("#bylineInfo").text();
                    // product.rating = $("#acrPopover").attr("title");
                    // product.ratingCount = $("#acrCustomerReviewText").text();
                    // product.mrp = $(".priceBlockStrikePriceString").text();
                    // product.price = $("#priceblock_ourprice").text();
                
                    const id = product.id;
                    const title = product.title;
                    const subcategory = product.item;
                    const link = product.link;
                    const image = product.image;
                    const allimage = product.allimage;
                    const description = product.description;
                    const brand = product.brand;
                    const rating = product.rating;
                    const price = product.price;
                    const category = "Mobile";
                    const productDesc = {id,title,price,brand,description, rating,link,image, allimage};
                    
                        const productListing =new Amazonlisting(
                        {
                            id : id,
                            link:link,
                            brand: brand,
                            category: category,
                            subcategory:subcategory,
                            title:title,
                            price:price,
                            rating:rating,
                            description:description,
                            image:image,
                            allimage:allimage,
                        }
                        
                        );

                        productListing.save() 
                        .then((listing)=> {
                            console.log(listing)
                        })
                        .catch(err => {
                            console.log(err);
                        })

                    return product;
                })    
            )
        }
    
        
        const main = async () =>{
            const amazonHead = await amazonHeader();
            const amazonFullData = await amazonDescription(amazonHead);
            console.log("Total scrapped : " + amazonFullData.length);
            return amazonFullData;
        }

        main();
        
    },



    // Camera

    camera : () => {
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
                    const title = $(el).find('h2 span').text();  
                    const price = $(el).find('.a-price-whole').text();
                    const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                    const image = $(el).find('.s-image').attr('src');
                    const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                    const item = electronicsItem[searchIndex];
                    const datas = {i,title,price,rating,link,image,item };

                  
                    electronics.push(datas);
                    console.log(datas)
                    
                });
            }
        }
            
        return electronics;
    }
    
 amazonDescription = async (amazonHead) =>{
    return await Promise.all(
        amazonHead.map(async product => {
            const html = await request.get(product.link);
            const $ = await cheerio.load(html);

            product.allimage = $('.a-dynamic-image').attr('data-a-dynamic-image');
            product.id = $("#averageCustomerReviews").attr("data-asin");
            product.description = $('#productDescription p').text().trim();
            product.brand = $("#bylineInfo").text();
           
        
            const id = product.id;
            const title = product.title;
            const subcategory = product.item;
            const link = product.link;
            const image = product.image;
            const allimage = product.allimage;
            const description = product.description;
            const brand = product.brand;
            const rating = product.rating;
            const price = product.price;
            const category = "Camera";
            const productDesc = {id,title,price,brand,description, rating,link,image, allimage};
            
                const productListing =new Amazonlisting(
                {
                    id : id,
                    link:link,
                    brand: brand,
                    category: category,
                    subcategory:subcategory,
                    title:title,
                    price:price,
                    rating:rating,
                    description:description,
                    image:image,
                    allimage:allimage,
                }
                
                );

                productListing.save() 
                .then((listing)=> {
                    console.log(listing)
                })
                .catch(err => {
                    console.log(err);
                })

            return product;
        })    
    )
}


const main = async () =>{
    const amazonHead = await amazonHeader();
    const amazonFullData = await amazonDescription(amazonHead);
    console.log("Total scrapped : " + amazonFullData.length);
    return amazonFullData;
}

main();

},


laptop : () => {
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
                const result = await request.get(`https://www.amazon.in/s?k=${electronicsItem[searchIndex]}&page=${index}`);
                const $ = await cheerio.load(result);
            
                $('.s-asin').each((i,el)=> {
                    const title = $(el).find('h2 span').text();  
                    const price = $(el).find('.a-price-whole').text();
                    const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                    const image = $(el).find('.s-image').attr('src');
                    const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                    const item = electronicsItem[searchIndex];
                    const datas = {i,title,price,rating,link,image,item };

                
                    electronics.push(datas);
                    console.log(datas)
                    
                });
            }
        }
            
        return electronics;
    }

    amazonDescription = async (amazonHead) =>{
    return await Promise.all(
        amazonHead.map(async product => {
            const html = await request.get(product.link);
            const $ = await cheerio.load(html);

            product.allimage = $('.a-dynamic-image').attr('data-a-dynamic-image');
            product.id = $("#averageCustomerReviews").attr("data-asin");
            product.description = $('#productDescription p').text().trim();
            // product.title = $("#productTitle").text().trim();
            product.brand = $("#bylineInfo").text();
            // product.rating = $("#acrPopover").attr("title");
            // product.ratingCount = $("#acrCustomerReviewText").text();
            // product.mrp = $(".priceBlockStrikePriceString").text();
            // product.price = $("#priceblock_ourprice").text();
        
            const id = product.id;
            const title = product.title;
            const subcategory = product.item;
            const link = product.link;
            const image = product.image;
            const allimage = product.allimage;
            const description = product.description;
            const brand = product.brand;
            const rating = product.rating;
            const price = product.price;
            const category = "Laptop";
            const productDesc = {id,title,price,brand,description, rating,link,image, allimage};
            
                const productListing =new Amazonlisting(
                {
                    id : id,
                    link:link,
                    brand: brand,
                    category: category,
                    subcategory:subcategory,
                    title:title,
                    price:price,
                    rating:rating,
                    description:description,
                    image:image,
                    allimage:allimage,
                }
                
                );

                productListing.save() 
                .then((listing)=> {
                    console.log(listing)
                })
                .catch(err => {
                    console.log(err);
                })

            return product;
        })    
    )
    }


    const main = async () =>{
    const amazonHead = await amazonHeader();
    const amazonFullData = await amazonDescription(amazonHead);
    console.log("Total scrapped : " + amazonFullData.length);
    return amazonFullData;
    }

    main();

    },

    
}



// clothing : () => {
//     amazonHeader = async () =>{
//     for(searchIndex=0; searchIndex <= clothingItem.length; searchIndex++){
//         for(index=0;index <=10; index++){
//             const result = await request.get(`https://www.amazon.in/s?k=${clothingItem[searchIndex]}&page=${index}`);
//             const $ = await cheerio.load(result);
        
//             $('.s-asin').each((i,el)=> {
//                 const title = $(el).find('h2 span').text();  
//                 const price = $(el).find('.a-price-whole').text();
//                 const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
//                 const image = $(el).find('.s-image').attr('src');
//                 const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
//                 const item = clothingItem[searchIndex];
//                 const datas = {i,title,price,rating,link,image,item };

              
//                 clothing.push(datas);
//                 console.log(datas)
                
//             });
//         }
//     }
        
//     return clothing;
// }

// amazonDescription = async (amazonHead) =>{
// return await Promise.all(
//     amazonHead.map(async product => {
//         const html = await request.get(product.link);
//         const $ = await cheerio.load(html);

//         product.allimage = $('.a-dynamic-image').attr('data-a-dynamic-image');
//         product.id = $("#averageCustomerReviews").attr("data-asin");
//         product.description = $('#productDescription p').text().trim();
//         // product.title = $("#productTitle").text().trim();
//         product.brand = $("#bylineInfo").text();
//         // product.rating = $("#acrPopover").attr("title");
//         // product.ratingCount = $("#acrCustomerReviewText").text();
//         // product.mrp = $(".priceBlockStrikePriceString").text();
//         // product.price = $("#priceblock_ourprice").text();
    
//         const id = product.id;
//         const title = product.title;
//         const category = product.item;
//         const link = product.link;
//         const image = product.image;
//         const allimage = product.allimage;
//         const description = product.description;
//         const brand = product.brand;
//         const rating = product.rating;
//         const price = product.price;
//         const subcategory = "clothing";
//         const productDesc = {id,title,price,brand,description, rating,link,image, allimage};
        
//             const productListing =new Amazonlisting(
//             {
//                 id : id,
//                 link:link,
//                 brand: brand,
//                 category: category,
//                 subcategory: subcategory,
//                 title:title,
//                 price:price,
//                 rating:rating,
//                 description:description,
//                 image:image,
//                 allimage:allimage,
//             }
            
//             );

//             productListing.save()
//             .then((listing)=> {
//                 console.log(listing)
//             })
//             .catch(err => {
//                 console.log(err);
//             })

//         return product;
//     })    
// )
// }


// const main = async () =>{
// const amazonHead = await amazonHeader();
// const amazonFullData = await amazonDescription(amazonHead);
// console.log("Total scrapped : " + amazonFullData.length);
// return amazonFullData;
// }

// main();

// }