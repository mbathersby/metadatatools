$(document).ready(this, setBaseXml);

var setBaseXml = function(){
  
    var baseXml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '\t<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n'
    + '\n'
    + '\t<version>' + apiVersion + '</version>\n'
    + '</Package>';

    console.log(baseXml);

    $("#xmlOutput").innerHtml = baseXml; 
  
}
