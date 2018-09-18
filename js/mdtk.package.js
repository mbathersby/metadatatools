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
	
	conn.metadata.describe(apiVersion, function(err, res) {
		if (err) { return console.error(err); }
		
		var mdTypes = [];
	
		console.log(res);
		
		for(key in res.metadataObjects){
			mdTypes.push(res.metadataObjects[key]);
		}
		
		mdTypes.sort(function(a, b) {
    			(a.xmlName > b.xmlName) - (a.xmlName < b.xmlName);
		});

		for(var i=0; i < mdTypes.length; i++){
			$('#metadata-select')
			.append($("<option></option>")
				.attr("value", mdTypes[i])
				.text(mdTypes[i].xmlName)
		       );
		}
	});
}

function parentSelected(){
	
}

function setXmlBody(){
    
}
