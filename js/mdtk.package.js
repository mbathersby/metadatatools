$(document).ready(this, setBaseXml);

var setBaseXml = function(){
  
    var baseXml = '&#60;&#60;&#60;&#60;&#60;';
  
  /*?xml version="1.0" encoding="UTF-8"?>\n'
    + '&#60;Package xmlns="http://soap.sforce.com/2006/04/metadata">\n'
    + '\n'
    + '&#60;version>' + apiVersion + '</version>\n'
    + '&#60;/Package></pre>';*/

    console.log(baseXml);

    $('#xmlOutput').append(baseXml); 
  
}
