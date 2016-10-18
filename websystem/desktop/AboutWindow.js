Ext.define('MyDesktop.AboutWindow', {
    extend: 'Ext.ux.desktop.Module',
    id:'about',
    windowId: 'video-window',

    tipWidth: 160,
    
    tipHeight: 96,
    
    title:'About tools',
    
    init : function(){
    	var me = this;
        me.launcher = {
            text: me.title,
            iconCls:'video'
        };
    },

    createWindow : function(){
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow(me.windowId);

        if (!win) {
            win = desktop.createWindow({
                id: me.windowId,
                title: me.title,
                width: 740,
                height: 480,
                iconCls: 'video',
                animCollapse: false,
                border: false,
                layout: 'fit',
                items: [
                    {
                        xtype: 'panel',
                        id: 'about',
                        bodyStyle:'background:url(images/like.jpg) no-repeat top left;background-size:740px 450px;'
                    }
                ]
            });
        }

        if (me.tip) {
            me.tip.setTarget(win.taskButton.el);
        }

        return win;
    }
});
