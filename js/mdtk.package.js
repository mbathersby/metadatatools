var xmlObj;

var isTest = true;

function pkgInit(){
	if(localStorage['mdtk.package.xml'] == null){
		localStorage['mdtk.package.xml'] = JSON.stringify({
			'head' : '<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">',
			'foot' : '<version>' + apiVersion + '</version>\n</Package>',
			'body' : []
		});
	} 
	
	xmlObj = JSON.parse(localStorage['mdtk.package.xml']);
	
	if(isTest){
		setTestPackage();	
	}

	setBaseXml();
	getDescribeParents();
}

var describeParent = {};
var describeChildren = {};

function setBaseXml(){

	$('#xmlHead').text(xmlObj.head);
	
	var xmlBodyString = '';
	
	if(xmlObj.body.length > 0){
		
		//sortPackage();

		console.log(xmlObj.body);
		
		for(var i=0; i < xmlObj.body.length; i++){
		
			var mdTypeObjs = xmlObj.body[i];
			console.log(mdTypeObjs);

			for(key in mdTypeObjs){
				
				var typeString = '\t<types>';	
				
				var mdTypeObj = mdTypeObjs[key];
				console.log(mdTypeObj);
				
				/*mdTypeObj.sort(function(a, b) {
					return a.localeCompare(b);
				});*/
				
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

	var original = xmlObj.body;
	var ordered = {};

	Object.keys(original).sort().forEach(function(key) {
		ordered[key] = original[key];
	});
	
	xmlObj.body = ordered;
	
	localStorage['mdtk.package.xml'] = JSON.stringify(xmlObj);
}	

function resetPackage(){
	xmlObj['body'] = [];
	localStorage['mdtk.package.xml'] = JSON.stringify(xmlObj);
	setBaseXml();
}

function setTestPackage(){
	xmlObj['body'] = [{'CustomObject' : ['Opportunity', 'Document', 'Account', 'Contact']}, {'ApexClass' : ['MyClass', 'MyClass_Test']}];
	localStorage['mdtk.package.xml'] = JSON.stringify(xmlObj);
	setBaseXml();
}
