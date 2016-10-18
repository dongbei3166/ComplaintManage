Ext.define('controller.SelfInfoController', {
	extend : 'Ext.app.Controller',
	alias: 'controller.selfinfoController',
	views : [ 'view.SelfInfoView' ],
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
			'window button[action=saveSelfPassword]' : {
				saveSelfPasswordClick : function(form) {
					if (form.form.isValid()) {
						form.form.submit({
							url : 'data/UpdateJson.json',
							success : function(form, action) {
								Ext.Msg.alert(me.alertTitle, "修改个人密码成功");
							},
							failure : function(form, action) {
								Ext.Msg.alert(me.alertTitle, "修改个人密码失败");
							}
						});
					}
				}
			},
			'window button[action=saveSelfInfo]': {
				saveSelfInfoClick : function(form) {
					if (form.form.isValid()) {
						form.form.submit({
							method:'put',
							url : server.location+'/restful/lighttower/api/v1/users/'+form.getForm().getValues().userId,
							success : function(form, action) {
								Ext.Msg.alert(me.alertTitle, "修改个人信息成功");
							},
							failure : function(form, action) {
								Ext.Msg.alert(me.alertTitle, action.result.error.msg);
							}
						});
					}
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