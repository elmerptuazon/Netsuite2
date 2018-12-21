/**
*@NApiVersion 2.0
*@NScriptType Suitelet
*/

define(['N/ui/serverWidget', 'N/search', 'N/log', 'N/task'],
	function(ui, search, log, task){
		function formCreate(context) {
			if(context.request.method == 'GET') {
				//**create form
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
					functionName: 'resolveURL'
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
				startdate.updateLayoutType({
					layoutType: ui.FieldLayoutType.NORMAL
				});
				startdate.updateBreakType({
					breakType: ui.FieldBreakType.STARTCOL
				});

				var enddate = form.addField({
					id: 'custpage_enddate',
					type: ui.FieldType.DATE,
					label: 'End Date',
					container: 'custpage_fieldgroup'
				});
				enddate.updateLayoutType({
					layoutType: ui.FieldLayoutType.NORMAL
				});
				enddate.updateBreakType({
					breakType: ui.FieldBreakType.STARTCOL
				});
				//***********************
				form.clientScriptFileId = 9498;
				//**add sublist
				var formsublist = form.addSublist({
					id: 'custpage_sublist',
					type: ui.SublistType.LIST,
					label: 'Custom List'
				});
				formsublist.addMarkAllButtons();
				formsublist.addRefreshButton();

				formsublist.addField({
					id: 'custpage_sublist_id',
					type: ui.FieldType.CHECKBOX,
					label: 'Select'
				});
				formsublist.addField({
					id: 'custpage_sublist_idnumber',
					type: ui.FieldType.TEXT,
					label: 'ID No.'
				});
				formsublist.addField({
					id: 'custpage_sublist_document',
					type: ui.FieldType.TEXT,
					label: 'Document #'
				});
				formsublist.addField({
					id: 'custpage_sublist_date',
					type: ui.FieldType.DATE,
					label: 'Date'
				});
				formsublist.addField({
					id: 'custpage_sublist_customer',
					type: ui.FieldType.SELECT,
					label: 'Customer',
					source: 'customer'
				}).updateDisplayType({
					displayType: ui.FieldDisplayType.INLINE
				});
				formsublist.addField({
					id: 'custpage_sublist_purchase',
					type: ui.FieldType.TEXT,
					label: 'Purchase #'
				});
				formsublist.addField({
					id: 'custpage_sublist_status',
					type: ui.FieldType.TEXT,
					label: 'Status'
				});
				formsublist.addField({
					id: 'custpage_sublist_startdate',
					type: ui.FieldType.TEXT,
					label: 'Start Date'
				});
				formsublist.addField({
					id: 'custpage_sublist_enddate',
					type: ui.FieldType.TEXT,
					label: 'End Date'
				});

				//**filter
				var filters = [
						{
							name: 'mainline',
							operator: search.Operator.IS,
							values: ['T']
						},
						{
							name: 'status',
							operator: search.Operator.ANYOF,
							values: ['CustInvc:A']
						}
					];
					if(context.request.parameters.customer != undefined){
						filters.push(
							{
								name: 'entity',
								operator: search.Operator.IS,
								values: [context.request.parameters.customer]
							}
						);
					}
					if(context.request.parameters.startdate != undefined){
						filters.push(
							{
								name: 'startdate',
								operator: search.Operator.ONORAFTER,
								values: [context.request.parameters.startdate]
							}
						);
					}
					if(context.request.parameters.enddate != undefined){
						filters.push(
							{
								name: 'enddate',
								operator: search.Operator.ONORBEFORE,
								values: [context.request.parameters.enddate]
							}
						);
					}
				
					var customFilter = search.create({
						type: search.Type.INVOICE,
						title: 'Current Invoice',
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
								name: 'otherrefnum'
							},
							{
								name: 'status'
							},
							{
								name: 'tranid'
							}
						],
						filters:filters
					});


					//set sublist val
					var counter = 0;
					customFilter.run().each(function(result) {
						var entity = result.getValue(
							{
								name: 'entity'
							});
						var trandate = result.getValue(
							{
								name: 'trandate'
							});
						var externalid = result.getValue(
							{
								name: 'externalid'
							});
						var otherrefnum = result.getValue(
							{
								name: 'otherrefnum'
							});
						var status = result.getValue(
							{
								name: 'status'
							});
						var tranid = result.getValue(
							{
								name: 'tranid'
							});

						formsublist.setSublistValue({
							id: 'custpage_sublist_id',
							line: counter,
							value: 'F'
						});
						formsublist.setSublistValue({
							id: 'custpage_sublist_idnumber',
							line: counter,
							value: result.id
						});
						formsublist.setSublistValue({
							id: 'custpage_sublist_document',
							line: counter,
							value: tranid
						});
						formsublist.setSublistValue({
							id: 'custpage_sublist_date',
							line: counter,
							value: trandate
						});
						formsublist.setSublistValue({
							id: 'custpage_sublist_customer',
							line: counter,
							value: entity
						});
						formsublist.setSublistValue({
							id: 'custpage_sublist_purchase',
							line: counter,
							value: 'otherrefnum'
						});
						formsublist.setSublistValue({
							id: 'custpage_sublist_status',
							line: counter,
							value: 'externalid'
						});
						formsublist.setSublistValue({
							id: 'custpage_sublist_startdate',
							line: counter,
							value: trandate
						});
						formsublist.setSublistValue({
							id: 'custpage_sublist_enddate',
							line: counter,
							value: trandate
						});
						counter++;
						return true;
					});

					log.debug({
						title: 'check',
						details: customFilter
					});

				context.response.writePage(form);
			}
			else if(context.request.method == 'POST'){
				var lineCount = context.request.getLineCount({
					group: 'custpage_sublist'
				});
				var invoiceids = [];
				for(var i = 0; i<lineCount; i++) {
					var checked = context.request.getSublistValue({
						group: 'custpage_sublist',
						name: 'custpage_sublist_id',
						line: i
					});
					if(checked === 'T') {
						var internalid = context.request.getSublistValue({
							group: 'custpage_sublist',
							name: 'custpage_sublist_idnumber',
							line: i
						});
						invoiceids.push(internalid);
					}
				}
				var scheduledTask = task.create({//create task script for scheduled
	 				taskType: task.TaskType.SCHEDULED_SCRIPT,
	 				scriptId: 'customscript_scheduledtask_elmer',
	 				deploymentId: 'customdeploy_scheduledtask_elmer',
	 				params: {
	 					custscript_invoiceids_elmer: invoiceids
	 				}
	 			});
	 			scheduledTask.submit();
			}
		}
		return {
			onRequest : formCreate
		};
	});
