Ext.define('view.GroupManagementView', {

	extend : 'Ext.grid.Panel',

	alias : 'widget.groupmanagementpanel',

	id : 'groupmanagementpanel',

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
		me.collection = new Ext.util.MixedCollection();
		me.sm = Ext.create('Ext.selection.CheckboxModel',
				{
					selType : 'checkboxmodel',// 选择模式为 行选择
					mode : 'SIMPLE',
					checkOnly : true,
					listeners : {
						'select' : function(sm, colIndex, rowIndex) {
							var record = me.sm.getStore().getAt(rowIndex);
							me.collection.add(record.get('uuid'), record.data);
						},
						'deselect' : function(sm, colIndex, rowIndex) {
							var record = sm.getStore().getAt(rowIndex);
							me.collection.remove(me.collection.get(record
									.get('uuid')));
						}
					}
				});
		me.store = Ext.create('store.GroupManagementStore', {
			type:'1',
			storeId:'groupmanagementStore',
			listeners : {
				beforeload : function(store, records, options) {

				},
				load : function(store, records, options) {
					var total = store.getCount();
					if (me.collection.getCount() <= 0) {
						return;
					}
					for ( var i = 0; i < total; i++) {
						var rec = store.getAt(i);
						if (me.collection.containsKey(rec.get('uuid'))) {
							me.sm.select(i, true, false);
						}
					}
				}
			}
		});
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
			columns : [ {
				xtype : 'rownumberer',
				width:40
			}, {
				text : '',
				hidden : true,
				sortable : false,
				hideable : false,
				sortable : true,
				dataIndex : 'uuid'
			}, {
				text : '名称',
				flex : 1,
				sortable : true,
				dataIndex : 'groupName'
			}, {
				text : '状态',
				width : 70,
				sortable : true,
				dataIndex : 'status'
			}, {
				text : '说明',
				width : 280,
				sortable : true,
				dataIndex : 'description'
			}],
			tbar : [ me.createToolBarBtn()],
			dockedItems : [ {
				xtype : 'pagingtoolbar',
				dock : 'bottom',
				width : 360,
				displayInfo : true,
				store : me.store
			} ]
		});
		me.callParent(arguments);
	},
	createToolBarBtn : function() {
		var me = this;
		var btn = {
			xtype : 'toolbar',
			items : [ {
				text : '创建组',
				tooltip : '创建组',
				action : 'createGroup',
				iconCls : 'add',
				handler : function(btn) {
					me.showCreateGroupWin();
				}
			}, {
				text : '删除组',
				tooltip : '删除组',
				action : 'deleteGroup',
				iconCls : 'remove',
				handler : function(btn) {
					this.fireEvent('removeclick', me.collection, function() {
					});
				}
			}, {
				text : '编辑组',
				tooltip : '编辑组',
				action : 'modifyGroup',
				iconCls : 'modify',
				handler : function(btn) {
					me.showModifyGroupWin();
				}
			},{
				text : '锁定组',
				tooltip : '锁定组',
				action : 'lockGroup',
				iconCls : 'modify',
				handler : function(btn) {
					me.showResetGroupWin();
				}
			} , {
				text : '解锁组',
				tooltip : '解锁组',
				action : 'unlockGroup',
				iconCls : 'modify',
				handler : function(btn) {
					me.showResetGroupWin();
				}
			} ,{
				text : '查看&编辑用户',
				tooltip : '查看添加用户',
				action : 'modifyGroupUser',
				iconCls : 'modify',
				handler : function(btn) {
					me.showResetGroupUserWin();
				}
			}, {
				text : '查看&编辑权限',
				tooltip : '查看编辑权限',
				action : 'modifyGroupPermission',
				iconCls : 'modify',
				handler : function(btn) {
					this.fireEvent('removeclick', me.collection, function() {
					});
				}
			}]
		}
		return btn;
	},
	showCreateGroupWin:function(){
		var me = this;
		var win = Ext.getCmp('createGroupWin');
		if (win) {
			win.show();
			return;
		}
		var groupForm = Ext.create('Ext.form.Panel', {
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
					name : "groupName",
					fieldLabel : "组名称",
					allowBlank : false,
					value : ''
				}, {
					xtype : "textfield",
					name : "description",
					fieldLabel : "组描述",
					allowBlank : false,
					value : ''
				} ]
			} ]
		});
		win = Ext.create("Ext.window.Window", {
			id : "createGroupWin",
			title : "创建组",
			width : 500,
			height : 330,
			renderTo : Ext.get('groupmanagement-win'),
			layout : "fit",
			fixed : true,
			closeAction : 'destory',
			items : [ groupForm ],
			buttons : [ {
				xtype : "button",
				text : "保存",
				action : 'saveGroup',
				handler : function() {
					var me = this;
					var mask = new Ext.LoadMask(me, {
						msg : 'Loading...',
						removeMask : true
					});
					this.fireEvent('saveGroupClick', groupForm, function() {
					});
				}
			}, '-' ]
		});
		win.show();

	},
	showModifyGroupWin:function(){
		var me = this;
		var win = Ext.getCmp('modifyGroupWin');
		if (win) {
			win.show();
			return;
		}
		var groupForm = Ext.create('Ext.form.Panel', {
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
					xtype : "hiddenfield",
					name : "groupId",
					fieldLabel : "组ID",
					allowBlank : false,
					value : ''
				},  {
					xtype : "textfield",
					name : "groupName",
					fieldLabel : "组名称",
					allowBlank : false,
					value : ''
				}, {
					xtype : "textfield",
					name : "description",
					fieldLabel : "组描述",
					allowBlank : false,
					value : ''
				} ]
			} ]
		});
		win = Ext.create("Ext.window.Window", {
			id : "modifyGroupWin",
			title : "编辑组",
			width : 500,
			height : 330,
			renderTo : Ext.get('groupmanagement-win'),
			closeAction : 'destory',
			layout : "fit",
			fixed : true,
			items : [ groupForm ],
			buttons : [ {
				xtype : "button",
				text : "保存",
				action : 'modifyGroup',
				handler : function() {
					var me = this;
					var mask = new Ext.LoadMask(me, {
						msg : 'Loading...',
						removeMask : true
					});
					this.fireEvent('modifyGroupClick', groupForm, function() {
					});
				}
			}, '-' ]
		});
		win.show();

	},
	showResetGroupUserWin : function() {

		var me = this;
		var win = Ext.getCmp('resetGroupUserWin');
		if (win) {
			win.show();
			return;
		}
		// 数据
	    var ds = new Ext.data.ArrayStore({
	        data: [
	            ['1', 'Tom'], ['2', 'Jerry']],
	        fields: ['value','text'],
	        sortInfo: {
	            field: 'value',
	            direction: 'ASC'
	        }
	    });

		var win = Ext.create("Ext.window.Window", {
			id : "resetGroupUserWin",
			title : "查看编辑用户",
			width : 500,
			height : 300,
			renderTo : Ext.get('groupmanagement-win'),
			closeAction : 'destory',
			layout : "fit",
			fixed : true,
			items : [ {
				xtype : 'form',
				items : [ {
					xtype : "textfield",
					name : "groupName",
					fieldLabel : "组名",
					allowBlank : false,
					readOnly : true,
					value : '3m Co'
				},{
					xtype : 'itemselector',
					name : 'itemselectorGroup',
					id : 'itemselector-field-group',
					anchor : '100%',
					fieldLabel : '请选择用户',
					store : ds,
					displayField : 'text',
					valueField : 'value',
					value : [ '1' ],
					allowBlank : false,
					msgTarget : 'side',
					blankText : "该输入项为必输项",
					fromTitle : '待选用户',
					toTitle : '已选用户'
				} ]
			} ],
			buttons : ['->', {
                text: '清空',
                handler: function(){
                    var field = Ext.getCmp('itemselector-field-group');
                    if (!field.disabled) {
                        field.clearValue();
                    }
                }
            }, {
                text: '重置',
                handler: function() {
                    Ext.getCmp('itemselector-field-group').reset();
                }
            }, {
                text: '保存',
                handler: function(){
                    var form = Ext.getCmp('itemselector-field-group').up('form').getForm();
                    if (form.isValid()){
                        Ext.Msg.alert('Submitted Values',form.getValues(true));
                    }
                }
            }]
		});
		win.show();
	}
});