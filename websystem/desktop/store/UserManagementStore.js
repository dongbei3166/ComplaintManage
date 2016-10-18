Ext.define('store.UserManagementStore', {
	extend : 'Ext.data.Store',

	requires : [ 'model.UserManagementModel','MyDesktop.ServerModel'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		var type = cfg.type || 1;
		var server = new MyDesktop.ServerModel();
		me.callParent([ Ext.apply({
			autoLoad : true,
			autoSync : false,
			cors:true,
			model : 'model.UserManagementModel',
			storeId : cfg.storeId || 'UserManagementStore',
			pageSize : 20,
			proxy : {
				type : 'ajax',
				method : 'get',
				startParam:'offset',
				//url : server.location+'/websystem/desktop/data/UserManagementJson.json',
				url:server.location+'/restful/lighttower/api/v1/users',
				reader : {
					type : 'json',
					root : 'datas',
					totalProperty : 'total'
				}
			}
		}, cfg) ]);
	}
});