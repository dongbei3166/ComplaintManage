Ext.define('store.SelfInfoStore', {
	extend : 'Ext.data.Store',

	requires : [ 'model.SelfInfoModel','MyDesktop.ServerModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		var type = cfg.type || 1;
		var server = new MyDesktop.ServerModel();
		me.callParent([ Ext.apply({
			autoLoad : true,
			autoSync : false,
			model : 'model.SelfInfoModel',
			storeId : cfg.storeId || 'SelfInfoStore',
			pageSize : 20,
			proxy : {
				type : 'ajax',
				method : 'get',
				//url : server.location+'/websystem/desktop/data/SelfInfoJson.json',
				startParam:'offset',
				url:server.location+'/restful/lighttower/api/v1/users/1cceb246-8e87-11e6-a011-448a5bb3e8a2',
				reader : {
					type : 'json',
					root : 'data',
					totalProperty : 'total'
				}
			}
		}, cfg) ]);
	}
});