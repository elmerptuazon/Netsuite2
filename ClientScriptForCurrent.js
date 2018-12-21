/**
*@NApiVersion 2.0
*@NScriptType ClientScript
*/

define(['N/currentRecord', 'N/format'],
	function(currentRecord, format) {
  		function pageInit() {
          
        }
		function resolveURL(context) {
			var record = currentRecord.get();

			var customer = record.getValue({
				fieldId: 'custpage_employee'
			});

			var startdate = record.getValue({
				fieldId: 'custpage_startdate'
			});

			var parsedstartdate = '';
			if(startdate != undefined) {	
					parsedstartdate = format.format({
					value: startdate,
					type: format.Type.DATE
				});
			}

			var enddate = record.getValue({
				fieldId: 'custpage_enddate'
			});

			var parsedenddate = '';
			if(enddate != undefined) {
					parsedenddate = format.format({
					value: enddate,
					type: format.Type.DATE
				});
			}
				window.location.href += '&customer=' + customer + '&startdate=' + parsedstartdate + '&enddate=' + parsedenddate;
		}
		return {
          	pageInit: pageInit,
			resolveURL: resolveURL
		};
	});