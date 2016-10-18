Ext.define('controller.RecycleController', {
	extend : 'Ext.app.Controller',
	alias : 'controller.recycleController',
	views : [ 'view.RecycleView' ],
	requires:[ 'MyDesktop.ServerModel' ],
	alertTitle : 'Info',
	serverError : 'Server error.',
	selectFile : 'Please select file.',
	deleteSuccess : 'Delete success.',
	deleteFailure : 'Delete failure.',
	recoverSuccess : 'Recover success.',
	recoverFailure : 'Recover failure.',
	confirmDelete : 'Confirm delete?',
	confirmRecover : 'Confirm recover?',
	server:'',
	init : function() {
		var me = this;
		server = new MyDesktop.ServerModel();
		this.control({
			'window button[action=clear]' : {
				removeclick : function(collection, rollback) {
					me.clearFile(collection, rollback);
				}
			},
			'actioncolumn#fileGridActionRecover' : {
				recoverclick : function(store, row,rollback) {
					me.recoverView(store.getAt(row).getData().uuid,rollback);
				}
			}
		});
	},
	clearFile : function(collection, rollback) {
		var me = this;
		if (0 >= collection.getCount()) {
			Ext.Msg.alert(me.alertTitle, me.selectFile);
		} else {
			Ext.Msg.confirm(me.alertTitle, Ext.String.format(me.confirmDelete,
					collection.getCount()), function(button) {
				if (button == 'yes') {
					me.doClear(collection.keys, rollback);
				}
			});
		}
	},
	doClear : function(file, rollback) {
		var me = this;
		Ext.Ajax.request({
			url : server.location+'/fileScanRecord/clearFile.do',
			cors:true,
			method : 'POST',
			jsonData : {
				files : file
			},
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
	recoverView : function(fileUuid,rollback) {
		var me = this;
		Ext.Msg.confirm(me.alertTitle, me.confirmRecover, function(btn) {
			if ('yes' == btn) {
				me.doRecoverView(fileUuid,rollback);
			}
		});
	},
	doRecoverView : function(fileUuid,rollback) {
		var me = this;
		Ext.Ajax.request({
			url : server.location+'/fileScanRecord/recoverFile.do',
			method : 'POST',
			cors:true,
			jsonData : 'fileUuid=' + fileUuid,
			success : function(response) {
				var rJson = Ext.decode(response.responseText);
				if (rJson.success) {
					Ext.Msg.alert(me.alertTitle, me.recoverSuccess,function(){
						rollback();
					});
				} else {
					Ext.Msg.alert(me.alertTitle, me.recoverFailure);
				}
			},
			failure : function() {
				Ext.Msg.alert(me.alertTitle, me.serverError);
			}
		});
	}
});