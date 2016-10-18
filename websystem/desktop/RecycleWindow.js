Ext.define('MyDesktop.RecycleWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'recycle-win',
    
    launcherText:'recycle-win',
    
    init : function(){
    	var me = this;
        this.launcher = {
            text: me.launcherText,
            iconCls:'recycle-icon-grid'
        };
    },

    createWindow : function(){
		var me = this;
		var desktop = this.app.getDesktop();
		Ext.require('controller.RecycleController');
		var win = desktop.getWindow('recycle-win');
		Ext.application({
			name : 'desktop',
			appFolder : './',
			launch : function() {
				if (!win) {
					win = desktop.createWindow({
						id : 'recycle-win',
						title : me.launcherText,
						width : 800,
						height : 680,
						iconCls : 'recycle-icon-grid',
						animCollapse : false,
						closable : true,
						closeAction : 'destory',
						layout : 'fit',
						items : {
							xtype : 'recyclepanel'
						}
					});
				}
				win.show();
				return win;
			},
			controllers : [ 'controller.RecycleController' ]
		});
	}
});
