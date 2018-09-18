var userInfo, conn;
var apiVersion = '43.0';

$(document).ready(this, init());

function init() {
	setNavigation();
	
	jsforce.browser.init({
		clientId: '3MVG9d8..z.hDcPI8U4xIar0rbAfGvpz7BlQxnsOysVaE4_ZcC9zCoNIbxYE.mMWcvnwcZJ.darnhxzlfTWtG',
		redirectUri: 'https://metadatatoolkit.herokuapp.com/authorize.htm',
		proxyUrl: 'https://mdtk-proxy.herokuapp.com/proxy/'
	});
	
	if(!jsforce.browser.isLoggedIn()){
		$('#noLoginContainer').removeClass('slds-hide');
	}
}

jsforce.browser.on('connect', function(connection) {

	conn = jsforce.browser.connection;

	$('#overlay').addClass('slds-backdrop_open');
	$('#spinner').removeClass('slds-hide');

	console.log('Connecting to ' + conn.instanceUrl);
	$('#noLoginContainer').addClass('slds-hide');

	var userQuery = 'select Name, Username from User where Id = \'' + conn.userInfo.id + '\' limit 1';

	conn.query(userQuery, function(err, res){
		userInfo = res.records[0];
		$('#userFullname').html(userInfo.Name);
		$('#userUsername').html(' (' + userInfo.Username + ')');
	})

	.then(function(){
		$('#overlay').removeClass('slds-backdrop_open');
		$('#spinner').addClass('slds-hide');
		$('#container').removeClass('slds-hide');
	});
});

function login(instance) {
	jsforce.browser.config.loginUrl = 'https://' + instance + '.salesforce.com';
	jsforce.browser.login();
}

function logout(){
	jsforce.browser.logout();
	window.location.reload();
}

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);

    $(".slds-context-bar__item a").each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(this).closest('.slds-context-bar__item').addClass('slds-is-active');
        }
    });
}

function showToast(msg, duration){
	
	$('#errorToast #toastMessage').html(msg);
	$('#errorToast').removeClass('slds-hide');
	
	function hideToast() {
		$('#errorToast').addClass('slds-hide')
	}
	
	setTimeout(
		hideToast,
		duration
	);
	
}
