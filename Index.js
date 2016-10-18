Ext.define('MyDesktop.Login', {
	extend : 'Ext.window.Window',
	id : 'loginWin',
	title : 'System login',
	width : 500,
	height : 310,
	resizable : false,
	draggable : true,
	layout : 'border',
	bodyStyle : 'padding:5px;',
	plain : false,
	closable : false,
	icon : "websystem/shared/icons/lock.png",
	loginText : 'Login',
	resetText : 'Reset',
	usernameLabel : 'Username',
	passwordLabel : 'Password',
	loadMsg : 'Loading...',
	uBlankText : 'username is required.',
	pBlankText : 'password is required.',
	initComponent : function() {
		var me = this;
		me.logo = me.createLogo();
		me.form = me.createForm();

		me.items = [ me.logo, me.form ];
		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			ui : 'footer',
			height : 50,
			layout : {
				pack : 'center'
			},
			items : [ {
				id : 'btnOnLogin',
				text : me.loginText,
				handler : me.onLogin,
				scale : 'medium',
				width : 100,
				height : 35,
				icon : "websystem/shared/icons/fam/gnome-keyring-manager.png",
				scope : me
			}, {
				text : me.resetText,
				handler : me.onReset,
				scale : 'medium',
				width : 100,
				height : 35,
				icon : "websystem/shared/icons/fam/new-view-refresh.png",
				scope : me
			} ]
		} ];
		me.callParent();
		me.show();
		me.addKeyEvent();
	},
	addKeyEvent : function() {
		var me = this;
		var el = Ext.get('loginWin');
		// 键盘回车事件
		var map = new Ext.KeyMap(el, {
			key : Ext.EventObject.ENTER,
			fn : function() {
				me.onLogin();
			}
		});
		// 默认焦点
		var f = Ext.getCmp('txtLoginName');
		f.focus(false, 100);
	},
	createLogo : function() {
		var me = this;
		var logo = new Ext.Panel({
			baseCls : 'x-plain',
			id : 'login-logo',
			region : 'center',
			title:'<span>中软国际科技服务有限公司</span>'
		});
		return logo;
	},
	createForm : function() {
		var me = this;
		var form = new Ext.form.FormPanel({
			id : 'loginform',
			region : 'south',
			border : false,
			bodyStyle : "padding: 20px 100px",
			baseCls : 'x-plain',
			defaults : {
				width : 280,
				labelWidth : 60,
				labelAlign : 'right'
			},
			height : 110,
			items : [ {
				id : 'txtLoginName',
				xtype : 'textfield',
				fieldLabel : me.usernameLabel,
				name : 'userName',
				blankText : me.uBlankText,
				allowBlank : false
			}, {
				id : 'txtPwd',
				xtype : 'textfield',
				inputType : 'password',
				name : 'password',
				blankText : me.pBlankText,
				fieldLabel : me.passwordLabel,
				allowBlank : false
			} ]
		});
		return form;
	},
	onLogin : function() {
		var me = this;
		var mask = new Ext.LoadMask(me, {
			msg : me.loadMsg,
			removeMask : true
		});
		if (me.form.form.isValid()) {
			mask.show();
			me.form.form.submit({
				url : 'websystem/desktop/data/LoginJson.json',
				success : function(form, action) {
					if(Ext.decode(action.response.responseText).success=='true'){
						window.location.href = 'websystem/desktop/desktop.html';
					}
					mask.hide();
				},
				failure : function(form, action) {
					window.location.href = 'websystem/desktop/desktop.html';
					mask.hide();
				}
			});
		}
	},
	onReset : function() {
		var me = this;
		me.form.form.reset();
	}
});