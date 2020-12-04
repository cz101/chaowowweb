

//var DOMParser = require('xmldom').DOMParser;
var xmlsource = "../goodreads.xml"
var domParser = new DOMParser();
 
//Parse the XML string into an XMLDocument object using
//the DOMParser.parseFromString() method.
var xmlDocument = domParser.parseFromString(xmlsource, "text/xml");
console.log(xmlDocument);