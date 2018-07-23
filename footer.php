		<script>
			
			/*var mdObjs;
				var csvFile;
				var selectedObj;
			var userInfo;*/
			
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
			
			$('#file-upload-input').change(function(){
				$('#file-info').removeClass('slds-hide');
				var file = $(this)[0].files[0];
				
				$("[name='fileName']").html(file.name);
				$('#file-size').html((file.size / 1024).toFixed(1) + ' KB');
				
				$('#last-modified').html(moment(file.lastModified).format('lll'));
				
				var reader = new FileReader();
				
				reader.onload = function(){
					csvFile = Papa.parse(reader.result, {header:true});
					console.log('CSV File Data');
					console.log(csvFile);
					$("#rowCount").html(csvFile.data.length - 1);
					
					if($('#object-select').val() != null){
						buildTable('mappingTable', csvFile.meta.fields, selectedObj.fields, csvFile.data[0]);
					}
				};
				
				reader.readAsText(file);
				
			});
			
			$('#object-select').change(function(){
				//selectedObj = $('#object-select').val();
				//console.log('Selected Object: ', selectedObj);
				
				var conn = jsforce.browser.connection;
				
				conn.sobject($(this).val()).describe(function(err, res) {
					selectedObj = res;
					console.log('Selected Object: ', selectedObj);
					
					if(csvFile != null){
						buildTable('mappingTable', csvFile.meta.fields, selectedObj.fields, csvFile.data[0]);
					}	
				});
				
			});
			
		</script>
		
	</body>
	
<html>	