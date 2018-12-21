/** 
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */


 define(['N/task'], 
 	function(task) {
 		function userEventForScheduled(context) {
 			var scheduledTask = task.create({
 				taskType: task.TaskType.SCHEDULED_SCRIPT,
 				scriptId: 317,
 				deploymentId: 1168
 			});
 			scheduledTask.submit();
 		}
 		return {
 			afterSubmit: userEventForScheduled
 		}
 	});