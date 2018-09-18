var userInfo, connection;
var apiVersion = '43.0';

function init() {
	setNavigation();
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
