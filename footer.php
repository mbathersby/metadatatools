		</div>
		
		<script>
			
			$(document).ready(this, init());
			
			if(!jsforce.browser.isLoggedIn()){
				$('#noLoginContainer').removeClass('slds-hide');
			} 
			
			jsforce.browser.on('connect', function(conn) {
				
				$('#overlay').addClass('slds-backdrop_open');
				$('#spinner').removeClass('slds-hide');
				
				console.log('Connecting to ' + conn.instanceUrl);
				$('#noLoginContainer').addClass('slds-hide');
				var userQuery = 'select Name, Username from User where Id = \'' + conn.userInfo.id + '\' limit 1';
				
				conn.query(userQuery, function(err, res){
					userInfo = res.records[0];
					$('#userFullname').html(userInfo.Name);
					$('#userUsername').html(' (' + userInfo.Username + ')');
					}).then(function(res){
					conn.describeGlobal(function(err, res) {
						if (err) { return console.error(err); }
						
						mdObjs = [];
						
						for(key in res.sobjects){
							var sObj = res.sobjects[key];
							if(sObj.name.includes('__mdt')){
								mdObjs.push(sObj);
								
								$('#object-select').append($("<option></option>")
								.attr("value", sObj.name)
								.text(sObj.label + ' (' + sObj.name + ')')
								);
							}
						}
					});
					}).then(function(){
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