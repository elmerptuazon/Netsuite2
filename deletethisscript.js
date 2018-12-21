define(['N/ui/serverWidget', 'N/search'],
	function(ui, search) {
		function formCreate(context) {
			var form = ui.createForm({
					title: 'Record Form'
				});
				form.addSubmitButton({
					label: 'Submit'
				});
				form.addResetButton({
					label: 'Reset'
				});
				form.addButton({
					id: 'custpage_filter',
					label: 'Filter',
					functionName: 'saveRecord'
				});

			var fieldgroup = form.addFieldGroup({
					id: 'custpage_fieldgroup',
					label: 'Record Search'
				});

			var employee = form.addField({
				id: 'custpage_employee',
				type: ui.FieldType.SELECT,
				label: 'Select Employee',
				source: 'customer',
				container: 'custpage_fieldgroup'
			});
				employee.updateLayoutType({
					layoutType: ui.FieldLayoutType.NORMAL
				});
				employee.updateBreakType({
					breakType: ui.FieldBreakType.NONE
				});

			var startdate = form.addField({
				id: 'custpage_startdate',
				type: ui.FieldType.DATE,
				label: 'Start Date',
				container: 'custpage_fieldgroup'
			});			

			

		}
	}//ui, search
);//define