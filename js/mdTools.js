function init() {
	jsforce.browser.init({
		clientId: '3MVG9d8..z.hDcPI8U4xIar0rbAfGvpz7BlQxnsOysVaE4_ZcC9zCoNIbxYE.mMWcvnwcZJ.darnhxzlfTWtG',
		redirectUri: 'https://metadatatoolkit.herokuapp.com/authorize.htm',
		proxyUrl: 'https://mdtk-proxy.herokuapp.com/proxy/'
	});
}

function login(instance) {
	jsforce.browser.config.loginUrl = 'https://' + instance + '.salesforce.com';
	jsforce.browser.login();
}

var fieldTypeMap = function(){
        var typeMap = {};
        typeMap["TEXT"] = "string";
        typeMap["TEXTAREA"] = "string";
        typeMap["DOUBLE"] = "double";
        typeMap["PERCENT"] = "double";
        typeMap["BOOLEAN"] = "boolean";
        typeMap["DATE"] = "date";
        typeMap["DATETIME"] = "dateTime";
        typeMap["EMAIL"] = "string";                                                                
        typeMap["PHONE"] = "string";
        typeMap["PICKLIST"] = "string";
        typeMap["URL"] = "string";        
        return typeMap;
    }
	
var packageXml = function (){
	var packageXML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
		 + '\t<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n'
		 + '\t\t<types>\n'
		 + '\t\t\t<members>*</members>\n'
		 + '\t\t\t<name>CustomMetadata</name>\n'
		 + '\t\t</types>\n'
		 + '\t<version>42.0</version>\n'
		 + '</Package>';
	return packageXML;
}

function buildTable(tableId, cols, fields){
	
	$('#'+tableId+' tbody').html('');
	
	for(var i = 0; i < cols.length; i++){
		var tableRow = '<tr data-index="' + i + '">'
			+ '<td data-label="Column Name" data-index="0">'
			+ '<div class="slds-truncate" title="' + cols[i] + '">' + cols[i] + '</div>'
			+ '</td>'
			+ '<td data-label="Map To" data-index="2">'
			+ '<div class="slds-form-element">'
			+ '<div class="slds-form-element__control">'
			+ '<div class="slds-select_container">'
			+ '<select class="slds-select" data-index="' + cols[i] + '">'
			+ '<option value=""></option>'

			
			for(var j = 0; j < fields.length; j++){
				//if(fields[j].updateable){
					if(fields[j].name == cols[i] || fields[j].label == cols[i]){
						tableRow += '<option class="slds-p-around_xx-small" data-type="' + fields[j].type+ '" text="' + fields[j].label + '(' + fields[j].type+ ')" value="' + fields[j].name + '" selected />';
					} else {
						tableRow += '<option class="slds-p-around_xx-small" data-type="' + fields[j].type+ '" text="' + fields[j].label + '(' + fields[j].type+ ')" value="' + fields[j].name + '" />';
					}
				//}
			}
			
			
		tableRow += '</select>'
			+ '</td>'
			+ '</tr>';
			
		$('#'+tableId+' tbody').append(tableRow);
	}
};
