Ext.define('controller.UserManagementController', {
	extend : 'Ext.app.Controller',
	alias : 'controller.usermanagementController',
	views : [ 'view.UserManagementView' ],
	requires : [ 'MyDesktop.ServerModel' ],
	alertTitle : 'Info',
	serverError : 'Server error.',
	selectFile : 'Please select file.',
	deleteSuccess : 'Delete success.',
	deleteFailure : 'Delete failure.',
	confirmDelete : 'Confirm delete?',
	server : '',
	init : function() {
		var me = this;
		server = new MyDesktop.ServerModel();
		this.control({
			'window button[action=deleteUser]' : {
				deleteUserClick : function(userId, rollback) {
					debugger;
					var me = this;
					Ext.Ajax.request({
						url : server.location
								+ '/restful/lighttower/api/v1/users/' + userId,
						method : 'Delete',
						success : function(conn, response, options, eOpts) {
							Ext.Msg.alert(me.alertTitle, '删除成功');
						},
						failure : function(response) {
							Ext.Msg.alert(me.alertTitle, me.serverError);
						}
					});
				}
			},'window button[action=saveUser]' : {
				saveUserClick : function(form) {
					if (form.form.isValid()) {
						form.form.submit({
							method:'post',
							url : server.location+'/restful/lighttower/api/v1/users/',
							success : function(form, action) {
								Ext.Msg.alert(me.alertTitle, "添加成功");
							},
							failure : function(form, action) {
								Ext.Msg.alert(me.alertTitle, action.result.error.msg);
							}
						});
					}
				
				}
			}
		});
	}
});