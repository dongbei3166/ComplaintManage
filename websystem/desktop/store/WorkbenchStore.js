Ext.define('store.WorkbenchStore', {
	extend : 'Ext.data.Store',

	requires : [ 'model.WorkbenchModel','MyDesktop.ServerModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		var type = cfg.type || 1;
		var server = new MyDesktop.ServerModel();
		me.callParent([ Ext.apply({
			autoLoad : true,
			autoSync : false,
			model : 'model.WorkbenchModel',
			storeId : cfg.storeId || 'WorkbenchStore',
			pageSize : 20,
			proxy : {
				type : 'ajax',
				method : 'get',
				url : server.location+'/websystem/desktop/data/WorkbenchJson.json',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'totalCount'
				}
			}
		}, cfg) ]);
	}
});