function showTooltip(id){
	var tooltip = document.getElementById(id);
	$(tooltip).removeClass('slds-hide');
}

function hideTooltip(id){
	var tooltip = document.getElementById(id);
	$(tooltip).addClass('slds-hide');
}

function setCookie(cname, cvalue) {
	document.cookie = cname + '=' + hash.access_token + ';';
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var x = getCookie(cname);
    if (x != "") {
        return x;
    } 
	return "";
}