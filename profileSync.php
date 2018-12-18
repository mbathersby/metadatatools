<?php include 'header.php'; ?>

		<!-- delete options
			
			ALL from single object
			OR
			From CSV Upload
			OR
			Select from list
			
			-->

		<div class="slds-page-header slds-m-bottom_medium slds-p-around_x-medium">
			<div class="slds-grid">
				<div class="slds-col slds-has-flexi-truncate">
					<div class="slds-media slds-no-space slds-grow">
						<div class="slds-media__figure">
							<span class="slds-icon_container slds-icon-standard-orders" title="Description of icon when needed">
								<svg class="slds-icon slds-icon_small" aria-hidden="true">
									<use xlink:href="slds/assets/icons/standard-sprite/svg/symbols.svg#orders"></use>
								</svg>
							</span>
						</div>
						<div class="slds-media__body">
							<h1 class="slds-page-header__title slds-truncate" title="Destroy Custom Metadata">Profile Synchroniser</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="slds-grid slds-gutters">

			<div class="slds-box slds-theme_default slds-size_1-of-2 slds-m-around_x-small">
				<div class="slds-form-element">
					<label class="slds-form-element__label" for="combobox-id-12">Select Source Profile</label>
					<div class="slds-form-element__control">
						<div class="slds-combobox_container">
							<div id="metadata-combobox" class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click" aria-expanded="false" aria-haspopup="listbox" role="combobox">
								<div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
									<svg class="slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default" aria-hidden="true">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#search" />
									</svg>
									<input type="text" onkeyup="searchProfiles()" class="slds-input slds-combobox__input" id="metadata-search" aria-autocomplete="list" aria-controls="listbox-id-9" autoComplete="off" role="textbox" placeholder="Search..." />
								</div>
								<div id="listbox-id-10" class="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid" role="listbox">
									<ul class="slds-listbox slds-listbox_vertical" role="presentation" id="metadata-listbox">
										
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		
			<div class="slds-box slds-theme_default slds-size_1-of-2 slds-m-around_x-small">
				<button class="slds-button slds-button_neutral slds-align_absolute_center" onclick="loginTarget('login');">Login to Target Org</button>
			</div>
			
		</div>
		
<?php include 'footer.php'; ?>