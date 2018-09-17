$(document).ready(this, setBaseXml);

var setBaseXml = function(){
  
  var xmlHead = '<?xml version="1.0" encoding="UTF-8"?>\n\t<Package xmlns="http://soap.sforce.com/2006/04/metadata">';
  var xmlFoot = '\t<version>' + apiVersion + '</version>\n</Package>';

    console.log(xmlHead);
    console.log(xmlFoot);

    $('#xmlHead pre').append(xmlHead); 
    $('#xmlFoot pre').append(xmlFoot); 
}
