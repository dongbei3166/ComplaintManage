Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'MyDesktop.AboutWindow',
        'MyDesktop.WorkWindow',
        'MyDesktop.UserManagementWindow',
        'MyDesktop.GroupManagementWindow',
        'MyDesktop.SystemManagementWindow',
        'MyDesktop.ReportWindow',
        'MyDesktop.SelfInfoWindow',
        'MyDesktop.Settings'
    ],

    personalText:'Personal',
    
    workWinText:'Work win',
    
    recycleText:'Recycle win',
    
    backupText:'Backup win',
    
    dataCheckText:'Datacheck Win',
    
    systemStatusText:'System status',
    
    toolsTitle:'Test+ tools',
    
    settingText:'Setting',
    
    exitText:'Exit',
    
    exitMsg:'Are you sure exit?',
    
    init: function() {
        this.callParent();
    },

    getModules : function(){
        return [
            new MyDesktop.AboutWindow(),
            new MyDesktop.WorkWindow(),
            new MyDesktop.SelfInfoWindow(),
            new MyDesktop.SystemManagementWindow(),
            new MyDesktop.UserManagementWindow(),
            new MyDesktop.GroupManagementWindow(),
            new MyDesktop.ReportWindow()
        ];
    },
    
    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: me.personalText, handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: me.workWinText, iconCls: 'filesystem-shortcut', module: 'work-win' },
                    { name: '个人信息', iconCls: 'selfinfo-shortcut', module: 'selfinfo-win'},
                    { name: me.dataCheckText, iconCls: 'systemmanage-shortcut', module: 'systemmanagement-win'},
                    { name: '用户管理', iconCls: 'usermanage-shortcut', module: 'usermanagement-win'},
                    { name: '组管理', iconCls: 'groupmanage-shortcut', module: 'groupmanagement-win'},
                    { name: '报表统计', iconCls: 'report-shortcut', module: 'report-win'}
                ]
            }),

            wallpaper: 'wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: me.toolsTitle,
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:me.settingText,
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:me.exitText,
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
    	var me = this;
        var ret = me.callParent();
        return Ext.apply(ret, {
            quickStart: [
                { name: me.workWinText, iconCls: 'filesystem-icon-grid', module: 'work-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
    	var me = this;
        Ext.Msg.confirm(me.exitText, me.exitMsg,function(btn){
        	if('yes' == btn){
        		window.location.href = '../../index.html';
        	}
        });
    },

    onSettings: function () {
    	var me = this;
        var dlg = new MyDesktop.Settings({
            desktop: me.desktop
        });
        dlg.show();
    }
});
