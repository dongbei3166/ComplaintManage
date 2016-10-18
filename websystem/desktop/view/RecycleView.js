Ext.define('view.RecycleView', {

	extend : 'Ext.grid.Panel',

	alias : 'widget.recyclepanel',

	id : 'recyclepanel',

	fileName : 'fileName',

	fileType : 'fileType',

	fileSize : 'fileSize',
	
	createDate : 'createDate',

	recordDate : 'recordDate',

	moveDate : 'moveDate',

	deleteBtn : 'Delete',

	actionHeader : 'Action',

	recoverBtn : 'Recover',

	deleteBtnTip : 'Delete File',

	collection : '',

	sm : '',

	store : '',

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
		//与工作台公用一个store
		me.store = Ext.create('store.RecycleStore', {
			type:'2',
			storeId:'recycleStore',
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
				text : me.fileName,
				flex : 1,
				sortable : true,
				dataIndex : 'fileName'
			}, {
				text : me.fileType,
				width : 70,
				sortable : true,
				dataIndex : 'fileType'
			}, {
				text : me.fileSize,
				width : 80,
				sortable : true,
				renderer : function(value) {
					if(value/1024<1024){
						return Ext.util.Format.number((value/1024),'0.00')+' K';
					}else if(value/1024/1024<1024){
						return Ext.util.Format.number((value/1024/1024),'0.00')+' M';
					}else{
						return Ext.util.Format.number((value/1024/1024/1024),'0.00')+' G';
					}
				},
				dataIndex : 'fileSize'
			},{
				text : me.createDate,
				width : 150,
				sortable : true,
				renderer : function(value) {
					return Ext.util.Format.date(value, "Y-m-d H:i:s");
				},
				dataIndex : 'createDate'
			}, {
				text : me.recordDate,
				width : 150,
				sortable : true,
				renderer : function(value) {
					return Ext.util.Format.date(value, "Y-m-d H:i:s");
				},
				dataIndex : 'recordDate'
			}, {
				header : me.actionHeader,
				xtype : 'actioncolumn', // 操作列
				id : 'fileGridActionRecover',
				sortable : false,
				hideable : false,
				sortable : true,
				width : 80,
				items : [ {
					xtype : 'button',
					iconCls : 'recover',
					tooltip : me.recoverBtn,
					action : 'recoverAction',
					handler : function(grid, rowIndex, colIndex, item) {
						var store = grid.getStore();
						this.fireEvent('recoverclick', store, rowIndex, function() {
							me.collection.clear();
							me.store.load();
							me.sm.deselectAll();
						});
					}
				}, '-' ]

			} ],
			tbar : [ {
				text : me.deleteBtn,
				tooltip : me.deleteBtnTip,
				action : 'clear',
				iconCls : 'remove',
				handler : function(btn) {
					this.fireEvent('removeclick', me.collection, function() {
						me.collection.clear();
						me.store.load();
						me.sm.deselectAll();
					});
				}
			},{
				xtype:'label',
				style:'color:red',
				text:'(不可恢复)'
			} ],
			dockedItems : [ {
				xtype : 'pagingtoolbar',
				dock : 'bottom',
				width : 360,
				displayInfo : true,
				store : me.store
			} ]
		});
		me.callParent(arguments);
	}
});