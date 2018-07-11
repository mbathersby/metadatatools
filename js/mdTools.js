var mdObjs;
var csvFile;
var selectedObj;
var userInfo;

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

var fieldTypeMap = function () {
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

var packageXml = function () {
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

function buildTable(tableId, cols, fields, sample) {

	$('#' + tableId + ' tbody').html('');

	for (var i = 0; i < cols.length; i++) {
		var tableRow = '<tr data-index="' + i + '">'
			 + '<td data-label="Column Name" data-index="0">'
			 + '<div class="slds-truncate" title="' + cols[i] + '">' + cols[i] + '</div>'
			 + '</td>'
			 + '<td data-label="Sample Data" data-index="0">'
			 + '<div class="slds-truncate" title="' + sample[cols[i]] + '">' + sample[cols[i]] + '</div>'
			 + '</td>'
			 + '<td data-label="Map To" data-index="2">'
			 + '<div class="slds-form-element">'
			 + '<div class="slds-form-element__control">'
			 + '<div class="slds-select_container">'
			 + '<select class="slds-select mappingSelect" data-index="' + cols[i] + '">'
			 + '<option value=""></option>'

			for (var j = 0; j < fields.length; j++) {
				if (fields[j].nillable) {
					if (fields[j].name == cols[i] || fields[j].label == cols[i]) {
						tableRow += '<option class="slds-p-around_xx-small" data-type="' + fields[j].type + '" value="' + fields[j].name + '" selected >' + fields[j].label + ' (' + fields[j].type + ')' + '</option>';
					} else {
						tableRow += '<option class="slds-p-around_xx-small" data-type="' + fields[j].type + '" value="' + fields[j].name + '" >' + fields[j].label + ' (' + fields[j].type + ')' + '</option>';
					}
				}
			}

			tableRow += '</select>'
			 + '</td>'
			 + '</tr>';

		$('#' + tableId + ' tbody').append(tableRow);
	}

$('#' + tableId).removeClass('slds-hide');

}

var columnToFieldMap = function () {
	var columnToFieldMap = {};

	var selectInputs = document.getElementsByClassName('mappingSelect');

	var i;
	for (i = 0; i < selectInputs.length; i++) {
		var index = selectInputs[i].dataset['index'];
		var fieldName = selectInputs[i].value;

		columnToFieldMap[index] = (fieldName != null) ? fieldName : '';
	}

	return columnToFieldMap;
}

var swapMap = function (json) {
	var ret = {};
	for (var key in json) {
		ret[json[key]] = key;
	}
	return ret;
}

function constructPackage() {
	$('uploadStatus').html('Building deployment package...');

	var fileColumns = csvFile.meta.fields;
	var fileRows = csvFile.data;
	var sObjectType = selectedObj;
	var colMap = columnToFieldMap();

	var zip = new JSZip();
	zip.file('package.xml', packageXml());

	/*var developerName;
	var xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
	+ '<CustomMetadata xmlns="http://soap.sforce.com/2006/04/metadata" '
	+ 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
	+ 'xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n'; */

	for (var i = 0; i < fileRows.length; i++) {
		var fileRow = fileRows[i];
		var colList = Object.values(colMap);
		colMap = swapMap(colMap);

		var rowElements = [];

		var developerName = '';

		//console.log(rowData);

		// loop through fieldMap
		for (var j = 0; j < colList.length; j++) {

			var fieldName = colList[j];
			var fieldValue = fileRow[colMap[fieldName]];
			var fieldType = "TEXT";

			//console.log(fieldName + " : " + fieldValue);

			if (fieldName == "DeveloperName") {
				rowElements.unshift('\t<label>' + fieldValue + '</label>\n');
				developerName = fieldValue;
			} else {

				if (fieldValue == "") {
					rowElements.push(
						'\t<values>\n'
						 + '\t\t<field>' + fieldName + '</field>\n'
						 + '\t\t<value xsi:nil="true"/>\n'
						 + '\t</values>\n');
				} else {

					rowElements.push(
						'\t<values>\n'
						 + '\t\t<field>' + fieldName + '</field>\n'
						//+ '\t\t<value xsi:type="xsd:' + this.fieldTypeMap()[fieldType] + '">' + fieldValue + '</value>\n'
						 + '\t\t<value>' + fieldValue + '</value>\n'
						 + '\t</values>\n');

				}

			}

		}

		var xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
			 + '<CustomMetadata xmlns="http://soap.sforce.com/2006/04/metadata" '
			 + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
			 + 'xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n';

		for (var k = 0; k < rowElements.length; k++) {
			xml += rowElements[k];
		}

		xml += '</CustomMetadata>';

		if (developerName != '') {
			zip.file('customMetadata/' + sObjectType.replace('__mdt', '') + '.' + developerName + '.md', xml);
		}
	}

	zip.generateAsync({
		type: "base64",
		compression: "DEFLATE",
		compressionOptions: {
			level: 9
		}
	})
	.then(function (base64) {
		//window.location = "data:application/zip;base64," + base64;
		//self.queueDeployment(c, base64);
		console.log(base64);
	});
}
