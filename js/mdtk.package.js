$(document).ready(this, setBaseXml);

var setBaseXml = function(){
  
    var baseXml = '<pre><?xml version="1.0" encoding="UTF-8"?>\n'
    + '\t<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n'
    + '\n'
    + '\t<version>' + apiVersion + '</version>\n'
    + '</Package></pre>';

    console.log(baseXml);

    $('#xmlOutput').html(baseXml); 
  
}
