var mdTypes, xmlObj, xmlChildren;
var describeParent = {};
var describeChildren = {};

jsforce.browser.on('connect', function(connection) {
	pkgInit();
});

function pkgInit(){
	if(localStorage['mdtk.package.xml'] == null){
		localStorage['mdtk.package.xml'] = JSON.stringify({
			'head' : '<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">',
			'foot' : '<version>' + CONN.version + '</version>\n</Package>',
			'body' : {}
		});
	} 
	
	xmlObj = JSON.parse(localStorage['mdtk.package.xml']);
	
	setBaseXml();
	getDescribeParents();
}

function setBaseXml(){
	sortPackage();
	
	$('#xmlHead').text(xmlObj.head);
	
	var xmlBodyString = '';
	
	if(Object.keys(xmlObj.body).length == 0){
		$('#xmlBody').html('<br/>');
	} 
	
	else {
		
		for(key in xmlObj.body){
			
			var typeString = '\t<types>';	
			
			var mdTypeObj = xmlObj.body[key];
			
			mdTypeObj.sort(function(a, b) {
				return a.localeCompare(b);
			});
			
			for(var j=0; j < mdTypeObj.length; j++){
				typeString += '\n\t\t<members>' + mdTypeObj[j] + '</members>';
			}
			
			typeString += '\n\t\t<name>' + key + '</name>';
			typeString += '\n\t</types>\n';
			
			xmlBodyString += typeString;
			
			//$('#xmlBody').append(typeString);
		}
		
		$('#xmlBody').text(xmlBodyString);
	}
	
	$('#xmlFoot').text(xmlObj.foot); 
}

function getDescribeParents(){
	
	CONN.metadata.describe(CONN.version, function(err, res) {
		if (err) { return console.error(err); }
		
		
		mdTypes = [];
		
		for(key in res.metadataObjects){
			mdTypes.push(res.metadataObjects[key]);
		}
		
		mdTypes.sort(function(a, b) {
			return a.xmlName.localeCompare(b.xmlName);
		});
	});
}

function searchTypes(){
	var searchTerm = event.target.value;
	
	$('#metadata-listbox').html(null);
	
	if(searchTerm.length > 1){
		
		mdTypes.forEach(function(item, index){
			
			if(item.xmlName.includes(searchTerm)){
				
				var parentName = item.xmlName;
				console.log(parentName);
				
				var optionString = '<li role="presentation" class="slds-listbox__item">'
				+ '<div name="' + item.xmlName + '" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option" onclick="parentSelected()">'
				+ '<span class="slds-media__figure slds-listbox__option-icon"></span>'
				+ '<span class="slds-media__body" title="' + item.xmlName + '">'
				+ '<span class="slds-truncate" title="' + item.xmlName + '">' + item.xmlName + '</span>'
				+ '</span>'
				+ '</div>'
				+ '</li>';
				
				$('#metadata-listbox').append(optionString);
				
			}
			
		});
		
		$('#metadata-combobox').addClass('slds-is-open');
		
		} else {
		$('#metadata-combobox').removeClass('slds-is-open');
		$('#metadataTree').addClass('slds-hide');
		
	}
}

function parentSelected(){
	console.log(event.target);
	
	var parentName = event.target.title; 
	console.log('Selected Parent Name: ' + parentName);
	
	$('#metadata-search').val(parentName);
	$('#metadata-combobox').removeClass('slds-is-open');
	
	var query = [{type: parentName}];
	
	$('#metadataTree').addClass('slds-hide');
	$('#treeTable tbody').html(null);
	$('#noMetadataMessage').addClass('slds-hide');
	
	CONN.metadata.list(query, CONN.version, function(err, res){
		
		if (err) { 
			return console.error(err); 
		}
		
		console.log(res);
		
		if(res == null){
			$('#mdType').text(parentName);
			$('#noMetadataMessage').removeClass('slds-hide');
			return;
		} 
		
		else if (!Array.isArray(res)){
			xmlChildren = res;
			
		} else {
			xmlChildren = res.sort(function(a, b) {
				return a.fullName.localeCompare(b.fullName);
			});
		}
		
		xmlChildren.forEach(function(item, index){
			
			var childType = item.type;
			var childName = item.fullName;
			var checked = '';
			var rowColor = '#ffffff';
			
			if(Object.keys(xmlObj.body).includes(childType)){
				if(xmlObj.body[childType].includes(childName)){
					checked = 'checked';
					rowColor = '#E7F3FD';
				}
			}
			
			
			var tableRow = '<tr aria-level="1" style="background-color: ' + rowColor + ';"aria-posinset="1" aria-selected="false" aria-setsize="4" class="slds-hint-parent" tabindex="'+ index +'">'
			+ '<td class="slds-text-align_right" role="gridcell" style="width: 3.25rem;">'
			+ '<div class="slds-checkbox">'
			+ '<input type="checkbox" onclick="rowSelected('+ index +')" name="options" id="checkbox-'+ index +'" aria-labelledby="check-button-label-'+ index +' column-group-header" value="checkbox-'+ index +'" ' + checked + ' />'
			+ '<label class="slds-checkbox__label" for="checkbox-'+ index +'" id="check-button-label-'+ index +'">'
			+ '<span class="slds-checkbox_faux"></span>'
			+ '<span class="slds-form-element__label slds-assistive-text">' + item.fullName + '</span>'
			+ '</label>'
			+ '</div>'
			+ '</td>'
			+ '<th class="slds-tree__item" data-label="Account Name" scope="row">'
			+ '<div class="slds-truncate" title="' + item.fullName + '">' + item.fullName + '</div>'
			+ '</th>'
			+ '</tr>';
			
			$('#treeTable tbody').append(tableRow);
			
		});
		
		$('#metadataTree').removeClass('slds-hide');
	});
}

function rowSelected(i){
	
	var row = $('checkbox-' + i).prevObject[0].activeElement;
	
	
	var childType = xmlChildren[i].type;
	var childName = xmlChildren[i].fullName;
	
	console.log(childType);
	console.log(childName);
	
	if(row.checked){
		
		$(row).closest('tr').css('background-color', '#E7F3FD');
		
		if(!Object.keys(xmlObj.body).includes(childType)){
			xmlObj.body[childType] = [];
		}
		
		xmlObj.body[childType].push(childName);
		
		} else {
		$(row).closest('tr').css('background-color', '#ffffff');
		
		var childIndex = xmlObj.body[childType].indexOf(childName);
		console.log(childIndex);
		xmlObj.body[childType].splice( childIndex, 1 );
		
		if(xmlObj.body[childType].length == 0){
			delete xmlObj.body[childType];
		}
	}
	
	//xmlObj.body = body;
	localStorage['mdtk.package.xml'] = JSON.stringify(xmlObj);
	
	setBaseXml();
}

function copyToClipboard() {
	const el = document.createElement('textarea');
	el.value = $('#xmlHead').text() + '\n' + $('#xmlBody').text() + $('#xmlFoot').text();
	document.body.appendChild(el);
	
	el.select();
	
	document.execCommand('copy');
	document.body.removeChild(el);
}

function saveAs(fileName){
	
	var xml = String($('#xmlHead').text() + '\n' + $('#xmlBody').text() + $('#xmlFoot').text());
	
	var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
	
	var blob = new Blob(xml, {type: 'text/plain'});
    var url = window.URL.createObjectURL(blob);
	//var fileName = 'package.xml';
	
	a.href = url;
	a.download = fileName;
	a.click();
	
	window.URL.revokeObjectURL(url);
	
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

function sortChildren(){
	
	var original = xmlChildren;
	var ordered = {};
	
	Object.keys(original).sort().forEach(function(key) {
		ordered[key] = original[key];
	});
	
	xmlChildren = ordered;
	//localStorage['mdtk.package.xml'] = JSON.stringify(xmlObj);
}

function resetPackage(){
	$('input[id^="checkbox-"]').prop('checked', false);
	
	$('#metadata-search').val('');
	$('#treeTable tbody').html(null);
	$('#metadataTree').addClass('slds-hide');
	
	xmlObj['body'] = [];
	localStorage['mdtk.package.xml'] = JSON.stringify(xmlObj);
	setBaseXml();
}

function setTestPackage(){
	xmlObj['body'] = {'CustomObject' : ['Opportunity', 'Document', 'Account', 'Contact'], 'ApexClass' : ['MyClass', 'MyClass_Test']};
	localStorage['mdtk.package.xml'] = JSON.stringify(xmlObj);
	setBaseXml();
}
