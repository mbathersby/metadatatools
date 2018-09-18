function pkgInit(){
    setBaseXml();
}

var xmlHead = '<?xml version="1.0" encoding="UTF-8"?>\r\n'
    + '\t<Package xmlns="http://soap.sforce.com/2006/04/metadata">';

var xmlFoot = '\t<version>' + apiVersion + '</version>\n'
    + '</Package>';

function setBaseXml(){
    $('#xmlHead pre').text(xmlHead); 
    $('#xmlFoot pre').text(xmlFoot); 
}
