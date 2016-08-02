const request = require('request');
const url = 'http://substack.net/images/';
const cheerio = require('cheerio');
const fs = require('fs');
const json2csv = require('json2csv');
var fields = ['File Permission', 'Absolute URL', 'File Type'];
var results = []


request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(body);
    $('tr').each(function(i, element){
      var permission = $(this).find('td').first().text();
      var relurl = $(this).find('td').last().find('a').attr('href');
      var aburl = 'http://substack.net'+relurl;
      var extension = relurl.split('.')[1]
      var row = {
        'File Permission': permission,
        'Absolute URL': aburl,
        'File Type': extension
      }
      results.push(row);
    });
    var csv = json2csv({data: results, fields: fields});
    fs.writeFile('output.csv', csv, function(err) {
      if (err) throw err;
      console.log('It\'s saved!');
    })
  }

});