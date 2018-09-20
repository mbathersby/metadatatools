<?php include 'header.php'; ?>

<!--
	TODOs:
	- Add spinner when retrieving metadata files
	- Save to computer function
-->

<script src="js/mdtk.package.js" type="text/javascript"></script>

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
					<h1 class="slds-page-header__title slds-truncate" title="Metadata Package Builder">Metadata Package Builder</h1>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="slds-grid slds-gutters slds-m-around_x-small">
	
	<div class="slds-col slds-size_5-of-12">
		
		<div class="slds-box slds-theme_default">
			<div class="slds-form-element">
				<label class="slds-form-element__label" for="combobox-id-12">Metadata Types</label>
				<div class="slds-form-element__control">
					<div class="slds-combobox_container">
						<div id="metadata-combobox" class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click" aria-expanded="false" aria-haspopup="listbox" role="combobox">
							<div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
								<svg class="slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default" aria-hidden="true">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#search" />
								</svg>
								<input type="text" onkeyup="searchTypes()" class="slds-input slds-combobox__input" id="metadata-search" aria-autocomplete="list" aria-controls="listbox-id-9" autoComplete="off" role="textbox" placeholder="Search..." />
							</div>
							<div id="listbox-id-10" class="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid" role="listbox">
								<ul class="slds-listbox slds-listbox_vertical" role="presentation" id="metadata-listbox">
									
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div id="noMetadataMessage" class="slds-hide">
				
				<div class="slds-scoped-notification slds-media slds-media_center" role="status">
					<div class="slds-media__figure">
						<span class="slds-icon_container slds-icon-utility-warning" title="information">
							<svg class="slds-icon slds-icon_x-small slds-icon-text-warning" aria-hidden="true">
								<use xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#warning" />
							</svg>
							<span class="slds-assistive-text">information</span>
						</span>
					</div>
					<div class="slds-media__body">
						<p>No <span id="mdType"></span> metadata files found</p>
					</div>
				</div>
				
			</div>
			
			<div id="metadataTree" class="slds-hide">
				
				<div class="slds-form-element">
					<div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_right">
						<svg class="slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#search" />
						</svg>
						<input id="metadata-child-search" class="slds-input" type="text" value="" />
					</div>
				</div>
				
				<table id="treeTable" aria-multiselectable="true" class="slds-table slds-table_header-hidden slds-table_bordered slds-table_edit slds-tree slds-table_tree slds-m-top_small" role="treegrid">
					<thead class="slds-assistive-text">
						<tr class="slds-line-height_reset">
							<th class="slds-text-title_caps slds-text-align_right" scope="col" style="width: 3.25rem;">
								<div class="slds-truncate slds-assistive-text" id="column-group-header" title="Choose a row to select">Choose a row to select</div>
							</th>
							<th aria-label="Account Name" class="slds-text-title_caps" scope="col">
								<div class="slds-th__action">
									<div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
										<span class="slds-truncate" title="Account Name">Account Name</span>
									</div>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
				
			</div>
		</div>
	</div>
	<div class="slds-col slds-size_7-of-12">
		<article class="slds-card">
			<div class="slds-card__header slds-grid slds-border_bottom slds-p-bottom_small">
				<header class="slds-media slds-media_center slds-has-flexi-truncate">
					<div class="slds-media__figure">
						<span class="slds-icon_container slds-icon-doctype-xml" title="account">
							<svg class="slds-icon slds-icon_small" aria-hidden="true">
								<use xlink:href="slds/assets/icons/doctype-sprite/svg/symbols.svg#xml"></use>
							</svg>
							<span class="slds-assistive-text">account</span>
						</span>
					</div>
					<div class="slds-media__body">
						<h2 class="slds-card__header-title">
							<a href="javascript:void(0);" class="slds-card__header-link slds-truncate" title="Package XML">
								<span>Package XML</span>
							</a>
						</h2>
					</div>
					<div class="slds-no-flex">
						<div class="slds-dropdown-trigger slds-dropdown-trigger_click">
							<button onclick="toggleMenu(this)" class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" title="Show More">
								<svg class="slds-button__icon" aria-hidden="true">
									<use xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
								</svg>
								<span class="slds-assistive-text">Show More</span>
							</button>
							<div class="slds-dropdown slds-dropdown_actions slds-dropdown_right">
								<ul class="slds-dropdown__list" role="menu">
									<li class="slds-dropdown__item" role="presentation">
										<a href="javascript:void(0);" role="menuitem" tabindex="-1" onclick="copyToClipboard()">
											<span class="slds-truncate" title="Copy to Clipboard">Copy to Clipboard</span>
										</a>
									</li>
									<li class="slds-dropdown__item slds-has-submenu" role="presentation">
										<a role="menuitem" href="javascript:void(0);" aria-haspopup="true" aria-expanded="false" tabindex="-1">
											<span class="slds-truncate" title="Save As">Save As</span>
											<svg class="slds-icon slds-icon_xx-small slds-icon-text-default slds-m-left_small slds-shrink-none" aria-hidden="true">
												<use xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
											</svg>
										</a>
										<div class="slds-dropdown slds-dropdown_submenu slds-dropdown_submenu-left">
											<ul class="slds-dropdown__list" role="menu" aria-label="Save As">
												<li class="slds-dropdown__item" role="presentation">
													<a href="javascript:void(0);" role="menuitem" tabindex="0" onclick="saveAs('package.xml')">
														<span class="slds-truncate" title="Submenu Item One">package.xml</span>
													</a>
												</li>
												<li class="slds-dropdown__item" role="presentation">
													<a href="javascript:void(0);" role="menuitem" tabindex="1" onclick="saveAs('destructiveChanges.xml')">
														<span class="slds-truncate" title="Submenu Item One">destructiveChanges.xml</span>
													</a>
												</li>
												<li class="slds-dropdown__item" role="presentation">
													<a href="javascript:void(0);" role="menuitem" tabindex="2" onclick="saveAs('destructiveChangesPre.xml')">
														<span class="slds-truncate" title="Submenu Item One">destructiveChangesPre.xml</span>
													</a>
												</li>
												<li class="slds-dropdown__item" role="presentation">
													<a href="javascript:void(0);" role="menuitem" tabindex="3" onclick="saveAs('destructiveChangesPost.xml')">
														<span class="slds-truncate" title="Submenu Item One">destructiveChangesPost.xml</span>
													</a>
												</li>
											</ul>
											<!--a href="javascript:void(0);" role="menuitem" tabindex="0" onclick="saveToComputer()">
												<span class="slds-truncate" title="Save to Computer">Save As</span>
											</a-->
										</li>
										<li class="slds-has-divider_top-space" role="separator"></li>
										<li class="slds-dropdown__item" role="presentation">
											<a href="javascript:void(0);" onclick="resetPackage()" role="menuitem" tabindex="-1">
												<span class="slds-truncate" title="Reset Package">Reset Package</span>
											</a>
										</li>
										<li class="slds-dropdown__item" role="presentation">
											<a href="javascript:void(0);" onclick="setTestPackage()" role="menuitem" tabindex="-1">
												<span class="slds-truncate" title="Create Test Package">Create Test Package</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</header>
				</div>
				<div id="xmlOutput" class="slds-card__body slds-card__body_inner">
					<pre id="xmlHead" style="margin: 0px 0px;"lang="xml"></pre>
					<pre id="xmlBody" style="margin: 0px 0px;" lang="xml"></pre>
					<pre id="xmlFoot" style="margin: 0px 0px;" lang="xml"></pre>
				</pre>
			</div>
		</article>
	</div>
	
	<script>
		/*jsforce.browser.on('connect', function(connection) {
			pkgInit();
		});*/
	</script>
	
	<?php include 'footer.php'; ?>
