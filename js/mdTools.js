function login(instance) {
	var loginUrl = 'https://' + instance + '.salesforce.com';

	jsforce.browser.init({
		loginUrl: loginUrl,
		clientId: '3MVG9d8..z.hDcPI8U4xIar0rbAfGvpz7BlQxnsOysVaE4_ZcC9zCoNIbxYE.mMWcvnwcZJ.darnhxzlfTWtG',
		redirectUri: 'https://metadatatoolkit.herokuapp.com/authorize.htm',
		proxyUrl: 'https://node-salesforce-proxy.herokuapp.com/proxy/'
	});

	jsforce.browser.login();

}