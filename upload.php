<?php include 'header.php'; ?>

<script src="js/jszip.js" type="text/javascript"></script>
<script src="js/papaparse.js" type="text/javascript"></script>
<script src="js/mdtk.deploy.js" type="text/javascript"></script>

<div class="slds-page-header slds-m-bottom_medium slds-p-around_x-medium">
	<div class="slds-grid">
		<div class="slds-col slds-has-flexi-truncate">
			<div class="slds-media slds-no-space slds-grow">
				<div class="slds-media__figure">
					<span class="slds-icon_container slds-icon-standard-orders" title="Description of icon when needed">
						<svg class="slds-icon slds-icon_x-small" aria-hidden="true">
							<use xlink:href="slds/assets/icons/standard-sprite/svg/symbols.svg#orders"></use>
						</svg>
					</span>
				</div>
				<div class="slds-media__body">
					<h1 class="slds-page-header__title slds-truncate" title="Upload Custom Metadata">Upload Custom Metadata</h1>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="slds-grid slds-gutters slds-m-around_x-small">
	<div class="slds-col slds-size_1-of-3">
		
		<article class="slds-card">
			<div class="slds-card__header slds-grid">
				<header class="slds-media slds-media_center slds-has-flexi-truncate">
					<div class="slds-media__figure">
						<span class="slds-icon_container slds-icon-standard-entity" title="entity">
							<svg class="slds-icon slds-icon_small" aria-hidden="true">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="slds/assets/icons/standard-sprite/svg/symbols.svg#entity"></use>
							</svg>
						</span>
					</div>
					<div class="slds-media__body">
						<h2 class="slds-card__header-title">
							<a href="javascript:void(0);" class="slds-card__header-link slds-truncate" title="Accounts">
								<span class="slds-text-heading_small">Select Metadata Object</span>
							</a>
						</h2>
					</div>
				</header>
			</div>
			
			<div class="slds-card__body">
				<div class="slds-form-element slds-m-around_medium">
					<label class="slds-form-element__label" for="select-01">Custom Metadata Objects</label>
					<div class="slds-form-element__control">
						<div class="slds-select_container">
							<select class="slds-select" id="object-select">
								<option value="" disabled selected>Please select</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			
		</article>
		
		<article class="slds-card">
			<div class="slds-card__header slds-grid">
				<header class="slds-media slds-media_center slds-has-flexi-truncate">
					<div class="slds-media__figure">
						<span class="slds-icon_container slds-icon-doctype-csv" title="csv">
							<svg class="slds-icon slds-icon_small" aria-hidden="true">
								<use xlink:href="slds/assets/icons/doctype-sprite/svg/symbols.svg#csv"></use>
							</svg>
						</span>
					</div>
					<div class="slds-media__body">
						<h2 class="slds-card__header-title">
							<a href="javascript:void(0);" class="slds-card__header-link slds-truncate" title="Accounts">
								<span class="slds-text-heading_small">Select CSV File</span>
							</a>
						</h2>
					</div>
				</header>
			</div>
			<div class="slds-card__body">
				<div class="slds-form-element slds-m-around_medium">
					<div class="slds-form-element__control">
						<div class="slds-file-selector slds-file-selector_files">
							<div class="slds-file-selector__dropzone">
								<input type="file" class="slds-file-selector__input slds-assistive-text" accept=".csv" id="file-upload-input" aria-labelledby="file-selector-primary-label file-selector-secondary-label" />
								<label class="slds-file-selector__body" for="file-upload-input" id="file-selector-secondary-label">
									<span class="slds-file-selector__button slds-button slds-button_neutral">
										<svg class="slds-button__icon slds-button__icon_left" aria-hidden="true" >
											<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#upload" />
										</svg>Upload Files</span>
										<span name="fileName" class="slds-file-selector__text slds-medium-show">No File Selected</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
		
		<article class="slds-card slds-hide" id="file-info">
			<div class="slds-card__header slds-grid">
				<header class="slds-media slds-media_center slds-has-flexi-truncate">
					<div class="slds-media__figure">
						<span class="slds-icon_container slds-icon-utility-info-alt" title="account">
							<svg class="slds-icon slds-icon-text-default slds-icon_small" aria-hidden="true">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#info_alt"></use>
							</svg>
						</span>
					</div>
					<div class="slds-media__body">
						<h2 class="slds-card__header-title">
							<a href="javascript:void(0);" class="slds-card__header-link slds-truncate" title="Accounts">
								<span class="slds-text-heading_small">File Information</span>
							</a>
						</h2>
					</div>
				</header>
			</div>
			<div class="slds-card__body slds-p-horizontal_medium">
				<dl class="slds-list_horizontal slds-wrap">
					<dt class="slds-item_label slds-text-color_weak slds-truncate" title="First Label">File Name:</dt>
					<dd class="slds-item_detail slds-truncate" title="File Name" name="fileName"></dd>
					<dt class="slds-item_label slds-text-color_weak slds-truncate" title="First Label">File Size:</dt>
					<dd class="slds-item_detail slds-truncate" title="File Name" id="file-size"></dd>
					<dt class="slds-item_label slds-text-color_weak slds-truncate" title="First Label">Last Modified:</dt>
					<dd class="slds-item_detail slds-truncate" title="File Name" id="last-modified"></dd>
					<dt class="slds-item_label slds-text-color_weak slds-truncate" title="First Label">Total Rows:</dt>
					<dd class="slds-item_detail slds-truncate" title="File Name" id="rowCount"></dd>
				</dl>
			</div>
		</article>
		
	</div>
	<div class="slds-col slds-size_2-of-3">
		
		<div class="slds-hide" id="mappingTable">
			<article class="slds-card">
				<div class="slds-card__header slds-grid">
					<header class="slds-media slds-media_center slds-has-flexi-truncate">
						<div class="slds-media__body">
							<h2 class="slds-card__header-title">
								<a href="javascript:void(0);" class="slds-card__header-link slds-truncate" title="Accounts">
									<span class="slds-text-heading_small">Map CSV Columns</span>
								</a>
							</h2>
						</div>
					</header>
				</div>
				<div class="slds-card__body slds-p-horizontal_medium">
					
					<table class="slds-table slds-table_bordered slds-table_cell-buffer slds-table_col-bordered">
						<thead>
							<tr class="slds-text-title_caps">
								<th scope="col slds-size_1-of-3">
									<div class="slds-truncate" title="Column Name">CSV Column Name</div>
								</th>
								<th scope="col slds-size_1-of-3">
									<div class="slds-truncate" title="Map To">Sample Data</div>
								</th>
								<th scope="col slds-size_1-of-3">
									<div class="slds-truncate" title="Map To">Map To Field</div>
								</th>
							</tr>
						</thead>
						<tbody id="mappingTableBody"></tbody>
					</table>
					
				</div>
			</article>
		</div>
		
	</div>
</div>

<div class="slds-docked-form-footer">
	<button id="deployBtn" class="slds-button slds-button_brand" onclick="deploy();" disabled>Deploy</button>
	<!--div class="slds-button-group" role="group">
		<button class="slds-button slds-button_neutral">Edit</button>
		<button class="slds-button slds-button_neutral">Save</button>
		</div>
	<lightning:buttonGroup-->
</div>

<section id="prompt" role="alertdialog" tabindex="-1" aria-labelledby="prompt-heading-id" aria-describedby="prompt-message-wrapper" class="slds-modal" aria-modal="true">
	<div class="slds-modal__container">
		<header class="slds-modal__header slds-theme_warning slds-theme_alert-texture" style="border-bottom: none !important;">
			<button class="slds-button slds-button_icon slds-modal__close slds-hide" id="uploadStatusCloseBtn" title="Close" onclick="closePrompt();"> 
				<svg class="slds-button__icon slds-button__icon_large" aria-hidden="true" style="fill: #ffffff;">
					<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close" />
				</svg>
				<span class="slds-assistive-text">Close</span>
			</button>
			<h2 class="slds-text-heading_medium" id="prompt-heading-id">Deployment In Progress</h2>
		</header>
		<div class="slds-modal__content slds-p-around_medium slds-text-align_center" id="prompt-message-wrapper">
			<div id="deployStatus"></div>
			<div id="deployState"></div>
		</div>
	</div>
</section>

<script>
	$('#file-upload-input').change(function(){
		
	// reset mapping table and deploy button
	$('#mappingTable').addClass('slds-hide');
	$('#deployBtn').attr('disabled', 'true');

	$('#file-size').html('Calculating...');
	$('#file-info').removeClass('slds-hide');

	var file = $(this)[0].files[0];

	$("[name='fileName']").html(file.name);
	$('#file-size').html(numeral(file.size/1024).format('0,0.0') + ' KB');

	$('#last-modified').html(moment(file.lastModified).format('lll'));

	var reader = new FileReader();

	reader.onload = function(){
		csvFile = Papa.parse(reader.result, {header:true});
		console.log('CSV File Data');
		console.log(csvFile);
		$("#rowCount").html(numeral(csvFile.data.length - 1).format('0,0'));

		if((csvFile.data.length - 1) > maxPackageRows){
			showToast('You cannot deploy more than ' + numeral(maxPackageRows).format('0,0') + ' items at a time.\nPlease split your CSV into mutiple files of ' + numeral(maxPackageRows).format('0,0') + ' rows or less and deploy each file separately.', 7500);
		} 
		
		else if((file.size / 1024).toFixed(1) > maxPackageSize){
			showToast('Your package cannot be more than ' + numeral(maxPackageSize/1000).format('0,0.0') + 'MB.\nPlease split your CSV into mutiple files of ' + numeral(maxPackageSize/1000).format('0,0.0') + 'MB or less and deploy each file separately.', 7500);
		}

		else if($('#object-select').val() != null){
			buildTable('mappingTable', csvFile.meta.fields, selectedObj.fields, csvFile.data[0]);
			$('#deployBtn').removeAttr('disabled');
		}
	};

	reader.readAsText(file);

});
</script>

<?php include 'footer.php'; ?>
