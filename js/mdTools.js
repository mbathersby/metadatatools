function init(instance) {
	jsforce.browser.config.loginUrl = 'https://' + instance + '.salesforce.com';
	jsforce.browser.init({
		clientId: '3MVG9d8..z.hDcPI8U4xIar0rbAfGvpz7BlQxnsOysVaE4_ZcC9zCoNIbxYE.mMWcvnwcZJ.darnhxzlfTWtG',
		redirectUri: 'https://metadatatoolkit.herokuapp.com/authorize.htm',
		proxyUrl: 'https://metadatatoolkit.herokuapp.com/proxy/proxy.php'
	});
}

function login(instance) {
	this.init();
	jsforce.browser.login();
}
