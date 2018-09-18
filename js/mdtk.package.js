var xmlObj;

function pkgInit(){
	if(localStorage['mdtk.package.xml'] == null){
		localStorage['mdtk.package.xml'] = JSON.stringify({
			'head' : '<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">',
			'foot' : '<version>' + apiVersion + '</version>\n</Package>',
			'body' : [{'CustomObject' : ['Account', 'Contact']}, {'ApexClass' : ['MyClass', 'MyClass_Test']}]
		});
	} 
	
	sortPackage();
	setBaseXml();
	getDescribeParents();
}

var describeParent = {};
var describeChildren = {};

function setBaseXml(){
	xmlObj = JSON.parse(localStorage['mdtk.package.xml']);

	$('#xmlHead').text(xmlObj.head);
	
	var xmlBodyString = '';
	
	if(xmlObj.body.length > 0){

		xmlObj.body.sort(function(a, b) {
    			return a.localeCompare(b);
		});
		
		console.log(xmlObj.body);
		
		for(var i=0; i < xmlObj.body.length; i++){
		//for(key in xmlObj.body){
		
			var mdTypeObjs = xmlObj.body[i];
			console.log(mdTypeObjs);

			for(key in mdTypeObjs){
				
				var typeString = '\t<types>';	
				
				var mdTypeObj = mdTypeObjs[key];
				console.log(mdTypeObj);
				
				for(var j=0; j < mdTypeObj.length; j++){
					typeString += '\n\t\t<members>' + mdTypeObj[j] + '</members>';
				}
			
				typeString += '\n\t\t<name>' + key + '</name>';
				typeString += '\n\t</types>\n';

				xmlBodyString += typeString;
			
			}
		}
	}
	
	$('#xmlBody').text(xmlBodyString);
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

function sortPackage(){
	var package = JSON.parse(localStorage['mdtk.package.xml']);
	
	var original = package['body'];
	var ordered = {};
		
	Object.keys(original).sort().forEach(function(key) {
		ordered[key] = original[key];
	});
	
	package['body'] = ordered;
	
	localStorage['mdtk.package.xml'] = JSON.stringify(package);
}	

function resetPackage(){
	var package = JSON.parse(localStorage['mdtk.package.xml']);
	
	package['body'] = [];
	
	localStorage['mdtk.package.xml'] = JSON.stringify(package);
	
	setBaseXml();
}

function setTestPackage(){
	var package = JSON.parse(localStorage['mdtk.package.xml']);
	
	package['body'] = [{'CustomObject' : ['Account', 'Contact']}, {'ApexClass' : ['MyClass', 'MyClass_Test']}];
	
	localStorage['mdtk.package.xml'] = JSON.stringify(package);
	
	setBaseXml();
}
