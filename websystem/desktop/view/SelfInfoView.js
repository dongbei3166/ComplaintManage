Ext.define('view.SelfInfoView', {

	extend : 'Ext.grid.Panel',

	alias : 'widget.selfinfopanel',

	id : 'selfinfopanel',

	fileName : '账号',

	fileType : '姓名',

	fileSize : '性别',

	createDate : '电话',

	recordDate : '邮箱',

	deleteBtn : 'Delete',

	actionHeader : 'Action',

	viewBtn : 'View',

	deleteBtnTip : 'Delete File',

	collection : '',

	sm : '',

	store : '',

	initComponent : function() {
		var me = this;
		me.store = Ext.create('store.SelfInfoStore', {
			storeId : 'selfinfoStore'
		});
		Ext.applyIf(me, {
			xtype : 'grid',
			border : false,
			viewConfig : {
				forceFit : true,
				enableTextSelection : true,
				emptyText : 'no data'
			},
			store : me.store,
			columns : [ {
				xtype : 'rownumberer',
				width : 40
			}, {
				text : '',
				hidden : true,
				sortable : false,
				hideable : false,
				sortable : true,
				dataIndex : 'userId'
			}, {
				text : me.fileName,
				flex : 1,
				sortable : true,
				dataIndex : 'userName'
			}, {
				text : me.fileType,
				width : 170,
				sortable : true,
				dataIndex:'realName',
				renderer : function(v,m,r)
				{
					return r.data.userExtention.realName;
				}
					
			}, {
				text : me.fileSize,
				width : 80,
				sortable : true,
				dataIndex : 'sex',
				renderer : function(v,m,r)
				{
					return r.data.userExtention.sex=="1"?"男":"女";
				}
			}, {
				text : me.createDate,
				width : 150,
				sortable : true,
				dataIndex : 'phone'
			}, {
				text : me.recordDate,
				width : 150,
				sortable : true,
				dataIndex : 'email'
			} ],
			tbar : [ {
				text : '修改个人信息',
				action : 'del',
				iconCls : 'modify',
				handler : function(btn) {
					me.showModifySelfInfoWin();
				}
			}, {
				text : '修改密码',
				action : 'del',
				iconCls : 'modify',
				handler : function(btn) {
					me.showModifyPasswordWin();
				}
			} ]
		});
		me.callParent(arguments);
	},
	showModifyPasswordWin : function() {
		var me = this;
		var win = Ext.getCmp('modifyPasswordWin');
		if (win) {
			win.show();
			return;
		}
		var passwordForm = Ext.create('Ext.form.Panel',{
			xtype : "form",
			defaultType : 'textfield',
			defaults : {
				anchor : '100%',
			},
			fieldDefaults : {
				labelWidth : 80,
				labelAlign : "left",
				flex : 1,
				margin : 5
			},
			items : [ {
				xtype : "container",
				layout : "vbox",
				items : [ {
					xtype : "textfield",
					name : "userName",
					fieldLabel : "账号",
					allowBlank : false,
					readOnly : true,
					value : me.store.getAt(0).get('userName'),
					disabled : true
				}, {
					xtype : "hiddenfield",
					name : "userName",
					value : me.store.getAt(0).get('userName')
				}, {
					xtype : "hiddenfield",
					name : "userId",
					value : me.store.getAt(0).get('userId')
				},{
					xtype : "textfield",
					name : "oldPassword",
					fieldLabel : "原密码",
					inputType : 'password',
					allowBlank : false,
					value : ''
				}, {
					xtype : "textfield",
					name : "newPassword",
					fieldLabel : "新密码",
					inputType : 'password',
					allowBlank : false,
					value : ''
				}, {
					xtype : "textfield",
					name : "repeatPassword",
					fieldLabel : "确认密码",
					inputType : 'password',
					allowBlank : false,
					value : ''
				} ]
			} ]
		});
		var win = Ext.create("Ext.window.Window", {
			id : "modifyPasswordWin",
			title : "修改密码",
			width : 500,
			height : 300,
			renderTo : Ext.get('selfinfo-win') || Ext.getBody(),
			layout : "fit",
			fixed : true,
			items : [ passwordForm ],
			buttons : [ {
				xtype : "button",
				text : "保存",
				action:'saveSelfPassword',
				handler : function() {
					this.fireEvent('saveSelfPasswordClick', passwordForm,function() {});
				}
			}, '-' ]
		});
		win.show();
	},
	showModifySelfInfoWin : function() {
		var me = this;
		var win = Ext.getCmp('modifySelfInfoWin');
		if (win) {
			win.show();
			return;
		}
		var selfInfoForm = Ext.create('Ext.form.Panel',{
			xtype : "form",
			defaultType : 'textfield',
			defaults : {
				anchor : '100%',
			},
			fieldDefaults : {
				labelWidth : 80,
				labelAlign : "left",
				flex : 1,
				margin : 5
			},
			items : [ {
				xtype : "container",
				layout : "vbox",
				items : [
						{
							xtype : "textfield",
							name : "userName",
							fieldLabel : "账号",
							allowBlank : false,
							readOnly : true,
							value : me.store.getAt(0).get('userName'),
							disabled : true
						},
						{
							xtype : "hiddenfield",
							name : "username",
							value : me.store.getAt(0).get('userName')
						},{
							xtype : "hiddenfield",
							name : "userId",
							value : me.store.getAt(0).get('userId')
						},
						{
							xtype : "textfield",
							name : "realname",
							fieldLabel : "姓名",
							allowBlank : false,
							value : me.store.getAt(0).get('userExtention').realName
						},
						{
							name : "sex",
							fieldLabel : "性别",
							allowBlank : false,
							xtype : 'fieldcontainer',
							defaultType : 'radiofield',
							layout : 'hbox',
							items : [
									{
										boxLabel : '男',
										name : 'sex',
										inputValue : '1',
										checked : me.store.getAt(0).get(
												'userExtention').sex == '1' ? true
												: false
									},
									{
										boxLabel : '女',
										name : 'sex',
										inputValue : '0',
										checked : me.store.getAt(0).get(
												'userExtention').sex == '0' ? true
												: false
									} ]
						}, {
							xtype : "textfield",
							name : "phone",
							fieldLabel : "电话",
							allowBlank : false,
							value : me.store.getAt(0).get('phone')
						}, {
							xtype : "textfield",
							name : "email",
							fieldLabel : "邮箱",
							allowBlank : false,
							value : me.store.getAt(0).get('email')
						}]
			} ]
		});
		win = Ext.create("Ext.window.Window", {
			id : "modifySelfInfoWin",
			title : "修改个人信息",
			width : 500,
			height : 300,
			renderTo : Ext.get('selfinfo-win') || Ext.getBody(),
			layout : "fit",
			fixed : true,
			items : [ selfInfoForm ],
			buttons : [ {
				xtype : "button",
				text : "保存",
				action:'saveSelfInfo',
				handler : function() {
					var me = this;
					var mask = new Ext.LoadMask(me, {
						msg : 'Loading...',
						removeMask : true
					});
					this.fireEvent('saveSelfInfoClick', selfInfoForm,function() {});
				}
			}, '-' ]
		});
		win.show();
	}
});