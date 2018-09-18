var xmlObj;

function pkgInit(){
	if(localStorage['mdtk.package.xml'] == null){
		localStorage['mdtk.package.xml'] = JSON.stringify({
			'head' : '<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">',
			'foot' : '<version>' + apiVersion + '</version>\n</Package>',
			'body' : [{'CustomObject' : ['Account', 'Contact'], 'ApexClass' : ['MyClass', 'MyClass_Test']}]
		});
	} 
	
	setBaseXml();
	getDescribeParents();
}

var describeParent = {};
var describeChildren = {};

function setBaseXml(){
	xmlObj = JSON.parse(localStorage['mdtk.package.xml']);

	$('#xmlHead').text(xmlObj.head);
	
	if(xmlObj.body.length > 0){
		
		console.log(xmlObj.body);
		
		for(var i=0; i < xmlObj.body.length; i++){
		//for(key in xmlObj.body){
		
			var mdTypeObjs = xmlObj.body[i];
			console.log(mdTypeObj);

			for(key in mdTypeObjs){
				
				var typeString = '\t<types>';	
				
				var mdTypeObj = mdTypeObjs[key];
				
				for(var j=0; j < mdTypeObj.length; j++){
					typeString += '\n\t\t<members>' +mdTypeObj[j] + '</members>';
				}
			
				typeString += '\n\t\t<name>' + key + '</name>';
				typeString += '\n\t</types>\n';

				$('#xmlBody').append().text(typeString);
			
			}
		}
	}
	
	//$('#xmlBody').text($('#xmlBody').text().replace(/\n$/, ""));
	$('#xmlFoot').text(xmlObj.foot); 
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
