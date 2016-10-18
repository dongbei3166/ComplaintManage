Ext.define('MyDesktop.GroupManagementWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'groupmanagement-win',
    
    launcherText:'组管理',
    
    init : function(){
    	var me = this;
        this.launcher = {
            text: me.launcherText,
            iconCls:'groupmanage-icon-grid'
        };
    },

    createWindow : function(){
		var me = this;
		var desktop = this.app.getDesktop();
		Ext.require('controller.GroupManagementController');
		var win = desktop.getWindow('groupmanagement-win');
		Ext.application({
			name : 'desktop',
			appFolder : './',
			launch : function() {
				if (!win) {
					win = desktop.createWindow({
						id : 'groupmanagement-win',
						title : me.launcherText,
						width : 800,
						height : 680,
						iconCls : 'groupmanage-icon-grid',
						animCollapse : false,
						closable : true,
						closeAction : 'destory',
						layout : 'fit',
						items : {
							xtype : 'groupmanagementpanel'
						}
					});
				}
				win.show();
				return win;
			},
			controllers : [ 'controller.GroupManagementController' ]
		});
	}
});
