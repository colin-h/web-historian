var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require("http");

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {

  fs.readFile(this.paths.list, {encoding: 'utf-8'}, function (err, data) {
    if (err) { console.log(err) }

    cb(data.split("\n"));
  });

};

exports.isUrlInList = function(url, cb){

 this.readListOfUrls(function (data) {
   data.indexOf(url) > -1 ? cb(true) : cb(false);
 });

};

exports.addUrlToList = function(url, cb){

  this.isUrlInList(url, function (bool){
    //checks if url is in list already
    if (bool === false) {
      fs.appendFile(exports.paths.list, url, function(err){
        (err) ? cb(false) : cb(true)
      });
    }
  });

};

exports.isUrlArchived = function(url, cb){

  //read site directory to see what's there
  fs.readdir(this.paths.archivedSites, function (err, files) {
    if (err) { console.log(err) }
    //if url in array of files
    url.indexOf(files) > -1 ? cb(true) : cb(false);
  })
};

exports.downloadUrls = function(array){


  array.forEach(function(item){
    fs.writeFile(exports.paths.archivedSites + '/' + item)
  });









  // //for items in sites.txt (make func take parameter of cb)
  // this.readListOfUrls(function (dataArray){
  //   dataArray.forEach(function (item){
  //     exports.isUrlArchived(item, function (bool) {
  //       if (bool === false) {
  //         http.get(item, function(response){
  //           var body = "";
  //           response.on('data', function(chunk) {
  //             body += chunk;
  //           });
  //           console.log(body);

  //           // console.log(response);
  //           response.end();
  //           // fs.appendFile(exports.paths.archivedSites, item)
  //         })
  //       }
  //     })
  //   })
  // })

};













