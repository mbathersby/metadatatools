<?php include 'header.php'; ?>

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
	<div class="slds-col slds-size_1-of-2">
		!!! DECRIBE LIST TO GO HERE !!!
	</div>
	<div class="slds-col slds-size_1-of-2">
		<article class="slds-card">
		  <div class="slds-card__header slds-grid">
		    <header class="slds-media slds-media_center slds-has-flexi-truncate">
		      <div class="slds-media__figure">
			<span class="slds-icon_container slds-icon-standard-account" title="account">
			  <svg class="slds-icon slds-icon_small" aria-hidden="true">
			    <use xlink:href="slds/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
			  </svg>
			  <span class="slds-assistive-text">account</span>
			</span>
		      </div>
		      <div class="slds-media__body">
			<h2 class="slds-card__header-title">
			  <a href="javascript:void(0);" class="slds-card__header-link slds-truncate" title="Accounts">
			    <span>Accounts</span>
			  </a>
			</h2>
		      </div>
		      <div class="slds-no-flex">
			<div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">
			  <button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" title="Show More">
			    <svg class="slds-button__icon" aria-hidden="true">
			      <use xlink:href="slds/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
			    </svg>
			    <span class="slds-assistive-text">Show More</span>
			  </button>
			  <div class="slds-dropdown slds-dropdown_actions slds-dropdown_right">
			    <ul class="slds-dropdown__list" role="menu">
			      <li class="slds-dropdown__item" role="presentation">
				<a href="javascript:void(0);" role="menuitem" tabindex="0">
				  <span class="slds-truncate" title="Action One">Action One</span>
				</a>
			      </li>
			      <li class="slds-dropdown__item" role="presentation">
				<a href="javascript:void(0);" role="menuitem" tabindex="-1">
				  <span class="slds-truncate" title="Action Two">Action Two</span>
				</a>
			      </li>
			      <li class="slds-dropdown__item" role="presentation">
				<a href="javascript:void(0);" role="menuitem" tabindex="-1">
				  <span class="slds-truncate" title="Action Three">Action Three</span>
				</a>
			      </li>
			    </ul>
			  </div>
			</div>
		      </div>
		    </header>
		  </div>
		</article>
	</div>
</div>

<?php include 'footer.php'; ?>
