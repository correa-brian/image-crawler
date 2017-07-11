const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const search_query = process.argv[2];
let images = [];

function crawlWebPage(search_query){
  if(search_query === undefined){
    process.stdout.write('Please enter a category to search.\n');
    return false
  }

  return requestWebPage(`https://unsplash.com/search/${search_query}`)
  .then((data) => {
    return saveImages(data)
  })
  .then((result) => {
    process.stdout.write(result)
    return result
  })
  .catch((err) => {
    throw new Error(err);
  })
}

function requestWebPage(url){
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if(err){
        return reject(err);
      }
      resolve(body);
    });
  });
}

function saveImages(body){
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(body);
    $('img', 'div#gridMulti').each(function(){
      let img = $(this).attr('src');
      images.push(img);
    });

    if(images.length == 0){
      resolve(`No pictures were found \n`);
    }

    for(let i = 0; i < images.length; i++){
      request(images[i]).pipe(fs.createWriteStream('images/'+search_query+ i +'.jpg'));
    }

    return resolve(`${images.length} ${search_query} images were saved. \n`);
  });
}

module.exports = crawlWebPage(search_query)
