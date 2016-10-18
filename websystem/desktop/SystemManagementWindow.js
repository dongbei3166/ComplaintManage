Ext.define('MyDesktop.SystemManagementWindow', {
	extend : 'Ext.ux.desktop.Module',

	id : 'systemmanagement-win',
	
	launcherText : 'systemmanagement-win',

	init : function() {
		var me = this;
		me.launcher = {
			text : me.launcherText,
			iconCls : 'systemmanage-icon-grid'
		};
	},

	createWindow : function() {
		var me = this;
		var desktop = this.app.getDesktop();
		Ext.require('controller.SystemManagementController');
		var win = desktop.getWindow('systemmanagement-win');
		Ext.application({
			name : 'desktop',
			appFolder : './',
			launch : function() {
				if (!win) {
					win = desktop.createWindow({
						id : 'systemmanagement-win',
						title : me.launcherText,
						width : 800,
						height : 680,
						iconCls : 'systemmanage-icon-grid',
						animCollapse : false,
						closable : true,
						closeAction : 'destory',
						layout : 'fit',
						items : {
							xtype : 'systemmanagementpanel'
						}
					});
				}
				win.show();
				return win;
			},
			controllers : [ 'controller.SystemManagementController' ]
		});
	}
});
