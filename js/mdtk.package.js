$(document).ready(this, setBaseXml());

function setBaseXml(){
  
    var baseXml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '\t<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n'
    + '\n'
    + '\t<version>' + apiVersion + '</version>\n'
    + '</Package>';

    $('#xmlOutput').html(baseXml); 
  
}
