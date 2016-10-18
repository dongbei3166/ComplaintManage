Ext.define('MyDesktop.WorkWindow', {
	extend : 'Ext.ux.desktop.Module',

	id : 'work-win',
	
	launcherText : 'work-win',
	
	init : function() {
		var me = this;
		me.launcher = {
			text : me.launcherText,
			iconCls : 'filesystem-icon-grid'
		};
	},

	createWindow : function() {
		var me = this;
		var desktop = this.app.getDesktop();
		Ext.require('controller.WorkbenchController');
		var win = desktop.getWindow('work-win');
		Ext.application({
			name : 'desktop',
			appFolder : './',
			launch : function() {
				if (!win) {
					win = desktop.createWindow({
						id : 'work-win',
						title : me.launcherText,
						width : 800,
						height : 680,
						iconCls : 'filesystem-icon-grid',
						animCollapse : false,
						closable : true,
						closeAction : 'destory',
						layout : 'fit',
						items : {
							xtype : 'workbenchpanel'
						}
					});
				}
				win.show();
				return win;
			},
			controllers : [ 'controller.WorkbenchController' ]
		});
	}
});
