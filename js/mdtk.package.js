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
	conn.describe(apiVersion, function(err, res) {
		if (err) { return console.error(err); }
						
		mdTypes = [];
		
		console.log(res);

		for(key in res){
			var mdType = res[key];
			//if(sObj.name.includes('__mdt')){
				mdTypes.push(mdType);

				$('#metadata-select').append($("<option></option>")
				.attr("value", mdType)
				.text(mdType)
				);
			//}
		}
	});
}

function setXmlBody(){
    
}
