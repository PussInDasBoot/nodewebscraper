const request = require('request');
const url = 'http://substack.net/images/';
const cheerio = require('cheerio');


request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(body);
    $('tr').each(function(i, element){
      var permission = $(this).find('td').first().text();
      var relurl = $(this).find('td').last().find('a').attr('href');
      var aburl = 'http://substack.net'+relurl;
      var extension = relurl.split('.')[1]
      console.log(permission);
    });
  }

});