/**
 *@NApiVersion 2.x
 *@NScriptType MapReduceScript
 */

define(['N/search', 'N/record', 'N/format', 'N/email'], 
	function(search, record, format, email) {
		function getInputData() {
			var filters = [
				{
					name: 'status',
					operator: search.Operator.ANYOF,
					values: ['CustInvc:A']
				},
				{
					name: 'mainline',
					operator: search.Operator.IS,
					values: ['T']
				}
			];

			var customFilter = search.create({
				type: search.Type.INVOICE,
				title: 'Invoice',
				columns: [
					{
						name: 'trandate'
					},
					{
						name: 'postingperiod'
					}
				],
				filters: filters
			});
			return customFilter;
		}

		function map(mapContext) {
			var searchResult = JSON.parse(mapContext.value);
			var recordId = searchResult.id;
			var recordProfile = record.load({
				type: 'customrecord_dunningprofile',
				id: recordId,
				isDynamic: true
			});

			var Days = recordDays.getValue({
				fieldId: 'custrecord_daysoverdue'
			});

			var dateToday = new Date();
			var parsedDateToday = format.format({
				value: dateToday,
				type: format.Type.DATE
			});

			var recordDate = searchResult.getValue({
				name: 'trandate'
			});

			log.debug({
				title: 'check',
				details: searchResult + ' : ' + recordId + ' : ' + recordProfile + ' : ' + recordDays + ' : ' + Days + ' : ' + dateToday + ' : ' + parsedDateToday  + ' : ' + recordDate
			});

			if((recordDate + Days) >= dateToday) {
				log.debug({
				title: 'check',
				details: (recordDate + Days) + dateToday
			});
				// email.send({
				// 	author: recordProfile.getValue({
				// 		fieldId: 'custrecord_emailauthor'
				// 	}),
				// 	recipients: 'elmer@cloudcompasstech.com',
				// 	subject: 'Text Email',
				// 	body: 'Sample Content'
				// });
			}

		}


		return {
			getInputData: getInputData,
			map: map
		}
	});