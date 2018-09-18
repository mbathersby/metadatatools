function pkgInit(){
    setBaseXml();
}

var xmlHead = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<Package xmlns="http://soap.sforce.com/2006/04/metadata">';

var xmlFoot = '<version>' + apiVersion + '</version>\n'
    + '</Package>';

var describeParent = {};
var describeChildren = {};
var xmlBodyObj = {};

function setBaseXml(){
    $('#xmlHead pre').text(xmlHead); 
    $('#xmlFoot pre').text(xmlFoot); 
}

function setXmlBody(){
    
}
