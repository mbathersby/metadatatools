function showTooltip(id){
	var tooltip = document.getElementById(id);
	$(tooltip).removeClass('slds-hide');
}

function hideTooltip(id){
	var tooltip = document.getElementById(id);
	$(tooltip).addClass('slds-hide');
}