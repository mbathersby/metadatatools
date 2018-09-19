var mdTypes, xmlObj, xmlChildren;

function pkgInit(){
	if(localStorage['mdtk.package.xml'] == null){
		localStorage['mdtk.package.xml'] = JSON.stringify({
			'head' : '<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">',
			'foot' : '<version>' + apiVersion + '</version>\n</Package>',
			'body' : {}
		});
	} 
	
	xmlObj = JSON.parse(localStorage['mdtk.package.xml']);
	
	setBaseXml();
	getDescribeParents();
}

var describeParent = {};
var describeChildren = {};

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

	conn.metadata.describe(apiVersion, function(err, res) {
		if (err) { return console.error(err); }
		
		mdTypes = [];
		
		for(key in res.metadataObjects){
			mdTypes.push(res.metadataObjects[key]);
		}
		
		mdTypes.sort(function(a, b) {
			return a.xmlName.localeCompare(b.xmlName);
		});
		
		/*mdTypes.forEach(function(item, index){
		
			var optionString = '<li role="presentation" class="slds-listbox__item">'
              + '<div id="' + item.xmlName + '" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">'
                + '<span class="slds-media__figure slds-listbox__option-icon"></span>'
                + '<span class="slds-media__body">'
                  + '<span class="slds-truncate" title="' + item.xmlName + '">' + item.xmlName + '</span>'
                + '</span>'
              + '</div>'
            + '</li>';
			
			$('#metadata-listbox').append(optionString);
		
		});
		
		/*for(var i=0; i < mdTypes.length; i++){
			$('#metadata-select')
			.append($("<option></option>")
			.attr("value", mdTypes[i].xmlName)
			.text(mdTypes[i].xmlName)
			);
		}*/
	});
}

function searchTypes(){
	var searchTerm = event.target.value;
	
	if(searchTerm.length > 2){
	
		mdTypes.forEach(function(item, index){
		
			if(item.contains(searchTerm)){
			
				var optionString = '<li role="presentation" class="slds-listbox__item">'
				  + '<div id="' + item + '" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">'
					+ '<span class="slds-media__figure slds-listbox__option-icon"></span>'
					+ '<span class="slds-media__body">'
					  + '<span class="slds-truncate" title="' + item + '">' + item + '</span>'
					+ '</span>'
				  + '</div>'
				+ '</li>';
				
				$('#metadata-listbox').append(optionString);
			
			}
		
		});
		
		$('#metadata-combobox').addClass('slds-is-open');
	
	} else {
		$('#metadata-combobox').removeClass('slds-is-open');
	}
}

function parentSelected(){
	var selected = $('#metadata-select').val();
	var query = [{type: selected}];
	
	$('#treeTable tbody').html('');
	
	conn.metadata.list(query, apiVersion, function(err, res){
		console.log(selected);
		
		xmlChildren = res.sort(function(a, b) {
			return a.fullName.localeCompare(b.fullName);
		});
		
		//sortChildren();
		
		console.log(res);
		console.log(xmlChildren);
		
		//var index = 0;
		
		xmlChildren.forEach(function(item, index){
		
			var childType = item.type;
			var childName = item.fullName;
			var checked = '';
		
			if(Object.keys(xmlObj.body).includes(childType)){
				if(xmlObj.body[childType].includes(childName)){
					checked = 'checked';
				}
			}
			
		
			var tableRow = '<tr aria-level="1" aria-posinset="1" aria-selected="false" aria-setsize="4" class="slds-hint-parent" tabindex="'+ index +'">'
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
			+ '<div class="slds-truncate" title="Rewis Inc"><a href="javascript:void(0);" tabindex="-1">' + item.fullName + '</a></div>'
			+ '</th>'
			+ '</tr>';
			
			$('#treeTable tbody').append(tableRow);
			
		});
	});
}

function rowSelected(i){
	
	var row = $('checkbox-' + i).prevObject[0].activeElement;
	
	
	var childType = xmlChildren[i].type;
	var childName = xmlChildren[i].fullName;
	
	console.log(childType);
	console.log(childName);
	
	if(row.checked){
	
		if(!Object.keys(xmlObj.body).includes(childType)){
			xmlObj.body[childType] = [];
		}
		
		xmlObj.body[childType].push(childName);
		
	} else {
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

function setXmlBody(){
    
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
	
	$('#metadata-select').val('');
	$('#treeTable tbody').html('&nbsp;');
	
	xmlObj['body'] = [];
	localStorage['mdtk.package.xml'] = JSON.stringify(xmlObj);
	setBaseXml();
}

function setTestPackage(){
	xmlObj['body'] = {'CustomObject' : ['Opportunity', 'Document', 'Account', 'Contact'], 'ApexClass' : ['MyClass', 'MyClass_Test']};
	localStorage['mdtk.package.xml'] = JSON.stringify(xmlObj);
	setBaseXml();
}
