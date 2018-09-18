function pkgInit(){
    setBaseXml();
    getDescribeParents();
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

function getDescribeParents(){
	conn.describeGlobal(function(err, res) {
		if (err) { return console.error(err); }
						
		mdObjs = [];

		for(key in res.sobjects){
			var sObj = res.sobjects[key];
			//if(sObj.name.includes('__mdt')){
				mdObjs.push(sObj);

				$('#metadata-select').append($("<option></option>")
				.attr("value", sObj.name)
				.text(sObj.label + ' (' + sObj.name + ')')
				);
			//}
		}
	});
}

function setXmlBody(){
    
}
