Ext.define('MyDesktop.UserManagementWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'usermanagement-win',
    
    launcherText:'用户管理',
    
    init : function(){
    	var me = this;
        this.launcher = {
            text: me.launcherText,
            iconCls:'usermanage-icon-grid'
        };
    },

    createWindow : function(){
		var me = this;
		var desktop = this.app.getDesktop();
		Ext.require('controller.UserManagementController');
		var win = desktop.getWindow('usermanagement-win');
		Ext.application({
			name : 'desktop',
			appFolder : './',
			launch : function() {
				if (!win) {
					win = desktop.createWindow({
						id : 'usermanagement-win',
						title : me.launcherText,
						width : 800,
						height : 680,
						iconCls : 'usermanage-icon-grid',
						animCollapse : false,
						closable : true,
						closeAction : 'destory',
						layout : 'fit',
						items : {
							xtype : 'usermanagementpanel'
						},
						listeners :{
							beforeclose:function(){
								var createUserWin = Ext.getCmp('createUserWin');
								if(createUserWin){
									createUserWin.close();
								}
								var resetPasswordWin = Ext.getCmp('resetPasswordWin');
								if(resetPasswordWin){
									resetPasswordWin.close();
								}
								var resetGroupWin = Ext.getCmp('resetGroupWin');
								if(resetGroupWin){
									resetGroupWin.close();
								}
								resetGroupWin
							}
						}
					});
				}
				win.show();
				return win;
			},
			controllers : [ 'controller.UserManagementController' ]
		});
	}
});
