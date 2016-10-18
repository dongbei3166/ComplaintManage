Ext.define('store.ReportStore', {
	extend : 'Ext.data.Store',

	requires : [ 'model.ReportModel','MyDesktop.ServerModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		var type = cfg.type || 1;
		var server = new MyDesktop.ServerModel();
		me.callParent([ Ext.apply({
			autoLoad : true,
			autoSync : false,
			model : 'model.ReportModel',
			storeId : cfg.storeId || 'ReportStore',
			pageSize : 20,
			proxy : {
				type : 'ajax',
				method : 'get',
				url : server.location+'/websystem/desktop/data/ReportJson.json',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'totalCount'
				}
			}
		}, cfg) ]);
	}
});