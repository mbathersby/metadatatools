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
