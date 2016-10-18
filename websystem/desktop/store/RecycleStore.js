Ext.define('store.RecycleStore', {
	extend : 'Ext.data.Store',

	requires : [ 'model.RecycleModel','MyDesktop.ServerModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		var type = cfg.type || 1;
		var server = new MyDesktop.ServerModel();
		me.callParent([ Ext.apply({
			autoLoad : true,
			autoSync : false,
			model : 'model.RecycleModel',
			storeId : cfg.storeId || 'RecycleStore',
			pageSize : 20,
			proxy : {
				type : 'ajax',
				method : 'get',
				url : server.location+'/websystem/desktop/data/RecycleJson.json',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'totalCount'
				}
			}
		}, cfg) ]);
	}
});