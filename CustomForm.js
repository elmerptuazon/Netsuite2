/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */

 define(['N/ui/dialog'],
 		function(dialog) {
 			function helloWorld() {
 				var options = {
 					title: 'Hello',
 					message: 'World'
 				};
 				try {
 					dialog.alert(options);
					log.debug({
						title: 'Success',
						details: 'Alert Displayed'
					})
 				}catch(e) {
 					log.error({
 						title: e.name,
 						details: e.message
 					});
 				}
 			}
 			return { pageInit: helloWorld };
 		});