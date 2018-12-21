/**
*@NApiVersion 2.0
*@NScriptType ScheduledScript
*/

define(['N/render', 'N/record','N/runtime', 'N/email'], 
	function(render, record,runtime, email) {//this will be passed to scheduledtask variable in suitelet
		function scheduledScript(context) {
			var currentScript = runtime.getCurrentScript();
			var invoiceIds = currentScript.getParameter({
				name: 'custscript_invoiceids_elmer'
			});
			var parsedinvoiceIds = JSON.parse(invoiceIds);//parsed array
			for(var i=0;i<parsedinvoiceIds.length;i++){
				var parsedToNumber = parseInt(parsedinvoiceIds[i]);//parsed number
				var renderTransaction = render.transaction({
					entityId: parsedToNumber,
					printMode: render.PrintMode.PDF
				});

				log.debug({
					title: 'Check',
					details: renderTransaction
				});

				// var records = record.load({
				// 	type: record.Type.INVOICE,
				// 	id: parsedToNumber,
				// 	isDynamic: true
				// });

				// var recipient = records.getValue({
				// 	fieldId: 'email'
				// });

				email.send({
					author: 2430,
					recipients: 'elmer@cloudcompasstech.com',
					subject: 'Test Email',
					attachments: [renderTransaction],
					body: 'Sample Content with attachment'
				});
			}
		}
		return {
			execute: scheduledScript
		}
	});