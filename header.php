<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="x-ua-compatible" content="ie=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<title>Salesforce Metadata Toolkit</title>
	
	<script src="js/jquery-3.3.1.min.js" type="text/javascript"></script>
	<script src="js/moment.js" type="text/javascript"></script>
	<script src="js/jszip.js" type="text/javascript"></script>
	<script src="js/jsforce-core.min.js" type="text/javascript"></script>
	<script src="js/jsforce-api-metadata.min.js" type="text/javascript"></script>
	<script src="js/papaparse.js" type="text/javascript"></script>
	<script src="js/js.cookie.js" type="text/javascript"></script>
	<script src="js/mdTools.js" type="text/javascript"></script>
	
	<link rel="stylesheet" type="text/css" href="slds/assets/styles/salesforce-lightning-design-system.css" />
	
</head>
<body>

	<div class="slds-brand-band slds-brand-band_large"></div>
	
	<div role="status" id="spinner" class="slds-spinner slds-spinner_medium slds-spinner_inverse slds-hide">
		<span class="slds-assistive-text">Loading</span>
		<div class="slds-spinner__dot-a"></div>
		<div class="slds-spinner__dot-b"></div>
	</div>
	
	<div class="slds-hide" id="uploadStatus"></div>
	
	<div id="overlay" class="slds-backdrop slds-backdrop_open"></div>
	
	<div id="noLoginContainer" class="slds slds-hide">
		<section role="alertdialog" tabindex="-1" aria-labelledby="prompt-heading-id" aria-describedby="prompt-message-wrapper" class="slds-modal slds-fade-in-open slds-modal_prompt" aria-modal="true">
			<div class="slds-modal__container">
				<header class="slds-modal__header slds-theme_info slds-theme_alert-texture">
					<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close">
						<svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
							<use xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#close" />
						</svg>
						<span class="slds-assistive-text">Close</span>
					</button>
					<h2 class="slds-text-heading_medium" id="prompt-heading-id">Authentication Required</h2>
				</header>
				<div class="slds-modal__content slds-p-around_medium slds-text-align_center" id="prompt-message-wrapper">
					<p>You must be loged in to a Salesforce Instance to use this toolkit</p>
				</div>
				<footer class="slds-modal__footer slds-theme_default">
					<button class="slds-button slds-button_neutral" onclick="login('login');">Production Login</button>
					<button class="slds-button slds-button_neutral" onclick="login('test');">Sandbox Login</button>
				</footer>
			</div>
		</section>
	</div>
	
	<div id="container" class="slds slds-hide">
	
		<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_info" role="alert">
			<span class="slds-assistive-text">info</span>
			<span class="slds-icon_container slds-icon-utility-user slds-m-right_x-small" title="Description of icon when needed">
				<svg class="slds-icon slds-icon_x-small" aria-hidden="true">
					<use xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#user"></use>
				</svg>
			</span>
			<h2>Logged in as <span id="userFullname"></span> <span id="userUsername"></span>.
				<!--a onclick="logout();">Log out</a-->
			</h2>
		</div>
		
		<div id="menu" class="slds-dropdown-trigger slds-dropdown-trigger_click" style="top: 7px; left: 7px; position: fixed;">
			<button class="slds-button slds-button_icon slds-button_icon-border-inverse slds-button_icon-x-small" aria-haspopup="true" title="Show More">
				<svg class="slds-button__icon" aria-hidden="true">
					<use xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
				</svg>
				<span class="slds-assistive-text">Show More</span>
			</button>
			<div id="menu-dropdown" class="slds-dropdown slds-dropdown_left slds-text-body_regular">
				<ul class="slds-dropdown__list" role="menu" aria-label="Show More">
					<li class="slds-dropdown__item" role="presentation">
						<a href="index.php" role="menuitem" tabindex="0">
							<span class="slds-truncate" title="Dashboard">Dashboard</span>
						</a>
					</li>
					<li class="slds-has-divider_top-space" role="separator"></li>
					<li class="slds-dropdown__item" role="presentation">
						<a href="upload.php" role="menuitem" tabindex="0">
							<span class="slds-truncate" title="Upload Custom Metadata">Upload Custom Metadata</span>
						</a>
					</li>
					<li class="slds-dropdown__item" role="presentation">
						<a href="delete.php" role="menuitem" tabindex="0">
							<span class="slds-truncate" title="Delete Custom Metadata">Delete All Custom Metadata</span>
						</a>
					</li>
					<li class="slds-has-divider_top-space" role="separator"></li>
					<li class="slds-dropdown__item" role="presentation">
						<a href="javascript:logout();" role="menuitem" tabindex="-1">
							<span class="slds-truncate" title="Logout">Logout</span>
						</a>
					</li>
				</ul>
			</div>
		</div>