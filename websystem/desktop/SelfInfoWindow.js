Ext.define('MyDesktop.SelfInfoWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'selfinfo-win',
    
    launcherText:'个人信息',
    
    init : function(){
    	var me = this;
        this.launcher = {
            text: me.launcherText,
            iconCls:'selfinfo-icon-grid'
        };
    },

    createWindow : function(){
		var me = this;
		var desktop = this.app.getDesktop();
		Ext.require('controller.SelfInfoController');
		var win = desktop.getWindow('selfinfo-win');
		Ext.application({
			name : 'desktop',
			appFolder : './',
			launch : function() {
				if (!win) {
					win = desktop.createWindow({
						id : 'selfinfo-win',
						title : me.launcherText,
						width : 800,
						height : 680,
						iconCls : 'selfinfo-icon-grid',
						animCollapse : false,
						closable : true,
						closeAction : 'destory',
						layout : 'fit',
						items : {
							xtype : 'selfinfopanel'
						},
						listeners:{
							beforeclose:function(){
								var modifyPasswordWin = Ext.getCmp('modifyPasswordWin');
								if(modifyPasswordWin){
									modifyPasswordWin.close();
								}
								var modifySelfInfoWin = Ext.getCmp('modifySelfInfoWin');
								if(modifySelfInfoWin){
									modifySelfInfoWin.close();
								}
							}
						}
					});
				}
				win.show();
				return win;
			},
			controllers : [ 'controller.SelfInfoController' ]
		});
	}
});
