Ext.define('view.UserManagementView', {

	extend : 'Ext.grid.Panel',

	alias : 'widget.usermanagementpanel',

	id : 'usermanagementpanel',

	fileName : 'fileName',

	fileType : 'fileType',

	fileSize : 'fileSize',

	createDate : 'createDate',

	recordDate : 'recordDate',

	deleteBtn : 'Delete',

	actionHeader : 'Action',

	viewBtn : 'View',

	deleteBtnTip : 'Delete File',

	collection : '',

	sm : '',

	store : '',
	requires:[
	         'Ext.ux.form.ItemSelector'
	     ],
	initComponent : function() {
		var me = this;
		me.setCheckModel();
		Ext.applyIf(me, {
			xtype : 'grid',
			border : false,
			selModel : me.sm,
			viewConfig : {
				forceFit : true,
				enableTextSelection : true,
				emptyText : 'no data'
			},
			store : me.store,
			columns : me.createUserHeader(),
			tbar : [ me.createToolBarSearch() ],
			dockedItems : [ {
				xtype : 'pagingtoolbar',
				dock : 'bottom',
				width : 360,
				displayInfo : true,
				store : me.store
			}, me.createToolBarBtn() ]
		});
		me.callParent(arguments);
	},
	setCheckModel : function() {
		var me = this;
		me.collection = new Ext.util.MixedCollection();
		me.sm = Ext.create('Ext.selection.CheckboxModel',
				{
					selType : 'checkboxmodel',// 选择模式为 行选择
					mode : 'SIMPLE',
					checkOnly : true,
					listeners : {
						'select' : function(sm, colIndex, rowIndex) {
							var record = me.sm.getStore().getAt(rowIndex);
							me.collection.add(record.get('userId'), record.data);
						},
						'deselect' : function(sm, colIndex, rowIndex) {
							var record = sm.getStore().getAt(rowIndex);
							me.collection.remove(me.collection.get(record
									.get('userId')));
						}
					}
				});
		me.store = Ext.create('store.UserManagementStore', {
			type : '1',
			storeId : 'usermanagementStore',
			listeners : {
				beforeload : function(store, records, options) {

				},
				load : function(store, records, options) {
					var total = store.getCount();
					if (me.collection.getCount() <= 0) {
						return;
					}
					for (var i = 0; i < total; i++) {
						var rec = store.getAt(i);
						if (me.collection.containsKey(rec.get('userId'))) {
							me.sm.select(i, true, false);
						}
					}
				}
			}
		});
	},
	createUserHeader : function() {
		var me = this;
		var header = [ {
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
			text : '用户名',
			flex : 1,
			sortable : true,
			dataIndex : 'userName'
		}, {
			text : '姓名',
			width : 100,
			sortable : true,
			dataIndex:'realName',
			renderer : function(v,m,r)
			{
				return r.data.userExtention.realName;
			}
				
		}, {
			text : '性别',
			width : 80,
			sortable : true,
			dataIndex : 'sex',
			renderer : function(v,m,r)
			{
				return r.data.userExtention.sex=="1"?"男":"女";
			}
		}, {
			text : '电话',
			width : 150,
			sortable : true,
			dataIndex : 'phone'
		}, {
			text : '邮箱',
			width : 150,
			sortable : true,
			dataIndex : 'email'
		}, {
			text : '所属组',
			width : 70,
			sortable : true,
			dataIndex : 'group'
		}, {
			text : '状态',
			width : 50,
			sortable : true,
			dataIndex : 'status',
			renderer:function(value){
				return value==1?'可用':'不可用'
			}
		}]
		return header;
	},
	createToolBarSearch : function() {
		var me = this;
		var search = {
			xtype : 'toolbar',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '用户名',
				labelWidth : 50,
				id : 'select_username',
				width : 180,
				emptyText : '请填写用户名'
			}, {
				xtype : 'textfield',
				fieldLabel : '手机号',
				labelWidth : 50,
				id : 'select_phone',
				width : 180,
				emptyText : '请填写手机号'
			}, {
				xtype : 'button',
				text : '搜&nbsp;&nbsp;&nbsp;&nbsp;索',
				width : 80,
			} ]
		}
		return search;
	},
	createToolBarBtn : function() {
		var me = this;
		var btn = {
			xtype : 'toolbar',
			items : [ {
				text : '创建用户',
				tooltip : '创建用户',
				action : 'saveUser',
				iconCls : 'add',
				handler : function(btn) {
					me.showCreateUserWin();
				}
			}, {
				text : '删除用户',
				tooltip : '删除用户',
				action : 'deleteUser',
				iconCls : 'remove',
				handler : function(btn) {
					var _me = this;
					if(me.sm.hasSelection() && me.sm.getSelection().length==1){
						Ext.Msg.confirm("信息","确认删除吗？",function(btn){
							if('yes' == btn){
								_me.fireEvent('deleteUserClick', me.sm.getSelection()[0].get('userId'),function() {
									
								});
							}
						});
					}else{
						Ext.Msg.alert("信息","请选择一条记录");
					}
				}
			}, {
				text : '重置密码',
				tooltip : '重置密码',
				action : 'resetPassword',
				iconCls : 'modify',
				handler : function(btn) {
					me.showResetPasswordWin();
				}
			}, {
				text : '锁定用户',
				tooltip : '锁定用户',
				action : 'lockUser',
				iconCls : 'modify',
				handler : function(btn) {
					
				}
			}, {
				text : '解锁用户',
				tooltip : '解锁用户',
				action : 'unlockUser',
				iconCls : 'modify',
				handler : function(btn) {
					
				}
			},{
				text : '更改组',
				tooltip : '更改组',
				action : 'resetGroup',
				iconCls : 'modify',
				handler : function(btn) {
					me.showResetGroupWin();
				}
			} ]
		}
		return btn;
	},
	showCreateUserWin : function() {
		var me = this;
		var win = Ext.getCmp('createUserWin');
		if (win) {
			win.show();
			return;
		}
		var userForm = Ext.create('Ext.form.Panel', {
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
					value : ''
				}, {
					xtype : "textfield",
					name : "realName",
					fieldLabel : "姓名",
					allowBlank : false,
					value : ''
				}, {
					name : "sex",
					fieldLabel : "性别",
					allowBlank : false,
					xtype : 'fieldcontainer',
					defaultType : 'radiofield',
					layout : 'hbox',
					items : [ {
						boxLabel : '男',
						name : 'sex',
						inputValue : '1',
						checked : true
					}, {
						boxLabel : '女',
						name : 'sex',
						inputValue : '0'
					} ]
				}, {
					xtype : "textfield",
					name : "phone",
					fieldLabel : "电话",
					allowBlank : false,
					value : ''
				}, {
					xtype : "textfield",
					name : "email",
					fieldLabel : "邮箱",
					allowBlank : false,
					value : ''
				}, {
					xtype : "textfield",
					name : "password",
					fieldLabel : "密码",
					inputType : 'password',
					allowBlank : false,
					value : ''
				}, {
					xtype : "textfield",
					name : "confirmPassword",
					fieldLabel : "确认密码",
					inputType : 'password',
					allowBlank : false,
					value : ''
				} ]
			} ]
		});
		win = Ext.create("Ext.window.Window", {
			id : "createUserWin",
			title : "创建用户",
			width : 500,
			height : 330,
			renderTo : Ext.get('usermanagement-win'),
			layout : "fit",
			fixed : true,
			items : [ userForm ],
			buttons : [ {
				xtype : "button",
				text : "保存",
				action : 'saveUser',
				handler : function() {
					var me = this;
					var mask = new Ext.LoadMask(me, {
						msg : 'Loading...',
						removeMask : true
					});
					this.fireEvent('saveUserClick', userForm, function() {
					});
				}
			}, '-' ]
		});
		win.show();

	},
	showResetPasswordWin : function() {
		var me = this;
		var win = Ext.getCmp('resetPasswordWin');
		if (win) {
			win.show();
			return;
		}
		var passwordForm = Ext.create('Ext.form.Panel', {
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
					name : "username",
					fieldLabel : "账号",
					allowBlank : false,
					readOnly : true,
					value : 'xxx',
					disabled : true
				}, {
					xtype : "hiddenfield",
					name : "username",
					value : 'xxx'
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
			id : "resetPasswordWin",
			title : "修改密码",
			width : 500,
			height : 300,
			renderTo : Ext.get('usermanagement-win'),
			layout : "fit",
			fixed : true,
			items : [ passwordForm ],
			buttons : [
					{
						xtype : "button",
						text : "保存",
						action : 'savePassword',
						handler : function() {
							this.fireEvent('savePasswordClick', passwordForm,
									function() {
									});
						}
					}, '-' ]
		});
		win.show();
	},
	showResetGroupWin : function() {

		var me = this;
		var win = Ext.getCmp('resetGroupWin');
		if (win) {
			win.show();
			return;
		}
		// 数据
	    var ds = new Ext.data.ArrayStore({
	        data: [
	            ['1', 'User'], ['2', 'System']],
	        fields: ['value','text'],
	        sortInfo: {
	            field: 'value',
	            direction: 'ASC'
	        }
	    });

		var win = Ext.create("Ext.window.Window", {
			id : "resetGroupWin",
			title : "修改用户组",
			width : 500,
			height : 300,
			renderTo : Ext.get('usermanagement-win'),
			layout : "fit",
			fixed : true,
			items : [ {
				xtype : 'form',
				items : [ {
					xtype : "textfield",
					name : "username",
					fieldLabel : "用户账号",
					allowBlank : false,
					readOnly : true,
					value : '3m Co'
				},{
					xtype : 'itemselector',
					name : 'itemselector',
					id : 'itemselector-field',
					anchor : '100%',
					fieldLabel : '请选择组',
					store : ds,
					displayField : 'text',
					valueField : 'value',
					value : [ '1' ],
					allowBlank : false,
					msgTarget : 'side',
					blankText : "该输入项为必输项",
					fromTitle : '待选组',
					toTitle : '已选组'
				} ]
			} ],
			buttons : ['->', {
                text: '清空',
                handler: function(){
                    var field = Ext.getCmp('itemselector-field');
                    if (!field.disabled) {
                        field.clearValue();
                    }
                }
            }, {
                text: '重置',
                handler: function() {
                    Ext.getCmp('itemselector-field').reset();
                }
            }, {
                text: '保存',
                handler: function(){
                    var form = Ext.getCmp('itemselector-field').up('form').getForm();
                    if (form.isValid()){
                        Ext.Msg.alert('Submitted Values',form.getValues(true));
                    }
                }
            }]
		});
		win.show();
	}
});