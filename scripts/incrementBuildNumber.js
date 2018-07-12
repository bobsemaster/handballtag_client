#!/usr/bin/env node

// Save hook under `project-root/hooks/before_prepare/`
//
// Don't forget to install xml2js using npm
// `$ npm install xml2js`

var fs = require('fs');
var xml2js = require('xml2js');

// Read config.xml
fs.readFile('config.xml', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  // Get XML
  var xml = data;

  // Parse XML to JS Obj
  xml2js.parseString(xml, function (err, result) {
    if (err) {
      return console.log(err);
    }

    // Get JS Obj
    var obj = result;

    // ios-CFBundleVersion doen't exist in config.xml
    if (typeof obj['widget']['$']['ios-CFBundleVersion'] === 'undefined') {
      obj['widget']['$']['ios-CFBundleVersion'] = buildDate();
    }

    // android-versionCode doen't exist in config.xml
    if (typeof obj['widget']['$']['android-versionCode'] === 'undefined') {
      obj['widget']['$']['android-versionCode'] = buildDate();
    }

    // Increment build numbers (separately for iOS and Android)
    obj['widget']['$']['ios-CFBundleVersion'] = buildDate();
    obj['widget']['$']['android-versionCode'] = buildDate();

    // Build XML from JS Obj
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);

    // Write config.xml
    fs.writeFile('config.xml', xml, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('Build number successfully incremented');
    });

  });

  function buildDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    if (month < 10) {
      month += '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (date.getSeconds() < 10) {
      second = '0' + second;
    }
    return `${year}${month}${day}${hour}${minute}${second}`;
  }
});
