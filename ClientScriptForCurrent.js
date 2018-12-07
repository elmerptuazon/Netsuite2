/**
*@NApiVersion 2.0
*@NScriptType ClientScript
*/

define(['N/currentRecord', 'N/search'],
	function(currentrecord, search) {
		function resolveURL(context) {
			var record = currentrecord.CurrentRecord;

			var customFilter = search.create({
				type: search.Type.INVOICE,
				title: 'Current Invoice',
				id: 'custpage_search_filter',
				filters: [
					{
						name: 'mainline',
						operator: 'is',
						values: ['T']
					},
					{
						name: 'status',
						operator: 'anyof',
						values: ['CustInvc:A']
					}
				],
				columns: [
					{
						name: 'entity'
					},
					{
						name: 'trandate'
					},
					{
						name: 'externalid'
					},
					{
						name: 'message'
					},
					{
						name: 'otherrefnum'
					},
					{
						name: 'status'
					},
					{
						name: 'tranid'
					}
				]
			});

			var customer = record.getValue({
				id: 'custpage_employee'
			});

			var startdate = record.getValue({
				id: 'custpage_startdate'
			});

			var enddate = record.getValue({
				id: 'custpage_enddate'
			});

			var output = url.resolveScript({
				scriptId: 'customscript_customerform_elmer',
				deploymentId: 'customdeploy_customerform_elmer',
				returnExternalUrl: true
			});
			return output + '&customer=' + customer + '&startdate=' + startdate + '&enddate=' + enddate;
		}
		return {
			validateField: resolveURL
		};
	});