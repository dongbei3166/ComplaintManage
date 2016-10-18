Ext.define('MyDesktop.ReportWindow', {
	extend : 'Ext.ux.desktop.Module',

	id : 'report-win',
	
	launcherText : '报表统计',

	init : function() {
		var me = this;
		me.launcher = {
			text : me.launcherText,
			iconCls : 'report-icon-grid'
		};
	},

	createWindow : function() {
		var me = this;
		var desktop = this.app.getDesktop();
		Ext.require('controller.ReportController');
		var win = desktop.getWindow('report-win');
		Ext.application({
			name : 'desktop',
			appFolder : './',
			launch : function() {
				if (!win) {
					win = desktop.createWindow({
						id : 'report-win',
						title : me.launcherText,
						width : 800,
						height : 680,
						iconCls : 'report-icon-grid',
						animCollapse : false,
						closable : true,
						closeAction : 'destory',
						layout : 'fit',
						items : {
							xtype : 'reportpanel'
						}
					});
				}
				win.show();
				return win;
			},
			controllers : [ 'controller.ReportController' ]
		});
	}
});
