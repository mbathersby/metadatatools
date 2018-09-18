		</div>
		
		<script>
			
			$(document).ready(this, init());
			
			if(!jsforce.browser.isLoggedIn()){
				$('#noLoginContainer').removeClass('slds-hide');
			} 
			
			jsforce.browser.on('connect', function(conn) {
				
				connection = jsforce.browser.connection;
				
				$('#overlay').addClass('slds-backdrop_open');
				$('#spinner').removeClass('slds-hide');
				
				console.log('Connecting to ' + connection.instanceUrl);
				$('#noLoginContainer').addClass('slds-hide');
				var userQuery = 'select Name, Username from User where Id = \'' + connection.userInfo.id + '\' limit 1';
				
				connection.query(userQuery, function(err, res){
					userInfo = res.records[0];
					$('#userFullname').html(userInfo.Name);
					$('#userUsername').html(' (' + userInfo.Username + ')');
				})
					
				.then(function(){
					$('#overlay').removeClass('slds-backdrop_open');
					$('#spinner').addClass('slds-hide');
					$('#container').removeClass('slds-hide');
				});
			});
			
			function logout(){
				jsforce.browser.logout();
				window.location.reload();
			}

		</script>
		
	</body>
	
<html>	
