function parseParms(str) {
	var pieces = str.split("&"), data = {}, i, parts;
	// process each query pair
	for (i = 0; i < pieces.length; i++) {
		parts = pieces[i].split("=");
		if (parts.length < 2) {
			parts.push("");
		}
		data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	}
	return data;
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

function getMetadataObjects(conn){
	conn.describeGlobal(function(err, res) {
		if (err) { return console.error(err); }
		console.log(res.sobjects);
	});
};

function checkCookie(cname) {
    var x = getCookie(cname);
    if (x != "") {
        return x;
	} 
	return "";
}

function showTooltip(id){
	var tooltip = document.getElementById(id);
	$(tooltip).removeClass('slds-hide');
}

function hideTooltip(id){
	var tooltip = document.getElementById(id);
	$(tooltip).addClass('slds-hide');
}