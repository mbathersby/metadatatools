var xmlObj;

function pkgInit(){
	setBaseXml();
	getDescribeParents();
	
	if(localStorage.mdtk_package_xml == null){
		localStorage.mdtk_package_xml = JSON.stringify({
			'head' : '<?xml version="1.0" encoding="UTF-8\\"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">',
			'foot' : '<version>' + apiVersion + '</version>\n</Package>',
			'body' : []	
		});
	} 
}

var describeParent = {};
var describeChildren = {};

function setBaseXml(){
	xmlObj = JSON.parse(localStorage.mdtk_package_xml);

	$('#xmlHead pre').text(xmlObj.head);
	$('#xmlFoot pre').text(xmlObj.foot); 
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
    			return a.xmlName.localeCompare(b.xmlName);
		});

		for(var i=0; i < mdTypes.length; i++){
			$('#metadata-select')
			.append($("<option></option>")
				.attr("value", mdTypes[i].xmlName)
				.text(mdTypes[i].xmlName)
		       );
		}
	});
}

function parentSelected(){
	var selected = $('#metadata-select').val();
	console.log(selected);
	
	var query = [{type: selected}];

	conn.metadata.list(query, apiVersion, function(err, res){
		console.log(res);
	});
}

function setXmlBody(){
    
}
