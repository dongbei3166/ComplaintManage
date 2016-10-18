Ext.define('controller.ReportController', {
	extend : 'Ext.app.Controller',
	alias: 'controller.reportController',
	views : [ 'view.ReportView' ],
	requires:[ 'MyDesktop.ServerModel' ],
	alertTitle:'Info',
	serverError:'Server error.',
	selectFile:'Please select file.',
	deleteSuccess:'Delete success.',
	deleteFailure:'Delete failure.',
	confirmDelete:'Confirm delete?',
	server:'',
	init : function() {
		var me = this;
		server = new MyDesktop.ServerModel();
		this.control({
			'window button[action=del]' : {
				removeclick : function(collection,rollback) {
					me.delFile(collection,rollback);
				}
			},
			'actioncolumn#fileGridActionEdit': {
				viewclick : function(store,row) {
					me.doView(store.getAt(row).getData().uuid);
				}
			}
		});
	},
	delFile : function(collection,rollback) {
		var me = this;
		if (0 >= collection.getCount()) {
			Ext.Msg.alert(me.alertTitle, me.selectFile);
		}
		else{
			Ext.Msg.confirm(me.alertTitle, Ext.String.format(me.confirmDelete,collection.getCount()), function(button) {
				if (button == 'yes') {
					me.doDelete(collection.keys,rollback);
				}
			});
		}
	},
	doDelete : function(file,rollback) {
		var me = this;
		Ext.Ajax.request({
			url : server.location+'/fileScanRecord/moveFile.do',
			method : 'POST',
			cors:true,
			jsonData : {files:file},
			success : function(response) {
				var rJson = Ext.decode(response.responseText);
				if (rJson.success) {
					Ext.Msg.alert(me.alertTitle, me.deleteSuccess, function() {
						rollback();
					});
				} else {
					Ext.Msg.alert(me.alertTitle, me.deleteFailure);
				}
			},
			failure : function() {
				Ext.Msg.alert(me.alertTitle, me.serverError);
			}
		});
	},
	doView : function(fileUuid) {
		var me = this;
        try{ 
        	document.getElementById('downloadURL').src=server.location+'/fileScanRecord/download.do?fileUuid='+fileUuid;
        }catch(e){ 
        	Ext.Msg.alert(me.alertTitle, me.serverError);
        } 
	}
});