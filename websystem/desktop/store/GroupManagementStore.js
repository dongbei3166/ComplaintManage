Ext.define('store.GroupManagementStore', {
	extend : 'Ext.data.Store',

	requires : [ 'model.GroupManagementModel','MyDesktop.ServerModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		var type = cfg.type || 1;
		var server = new MyDesktop.ServerModel();
		me.callParent([ Ext.apply({
			autoLoad : true,
			autoSync : false,
			model : 'model.GroupManagementModel',
			storeId : cfg.storeId || 'GroupManagementStore',
			pageSize : 20,
			proxy : {
				type : 'ajax',
				method : 'get',
				url : server.location+'/websystem/desktop/data/GroupManagementJson.json',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'totalCount'
				}
			}
		}, cfg) ]);
	}
});