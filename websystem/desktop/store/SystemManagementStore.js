Ext.define('store.SystemManagementStore', {
	extend : 'Ext.data.Store',

	requires : [ 'model.SystemManagementModel','MyDesktop.ServerModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		var type = cfg.type || 1;
		var server = new MyDesktop.ServerModel();
		me.callParent([ Ext.apply({
			autoLoad : true,
			autoSync : false,
			model : 'model.SystemManagementModel',
			storeId : cfg.storeId || 'SystemManagementStore',
			pageSize : 20,
			proxy : {
				type : 'ajax',
				method : 'get',
				url : server.location+'/websystem/desktop/data/SystemManagementJson.json',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'totalCount'
				}
			}
		}, cfg) ]);
	}
});