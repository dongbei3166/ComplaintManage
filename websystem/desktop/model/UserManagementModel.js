Ext.define('model.UserManagementModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'userId'
	}, {
		name : 'userName'
	}, {
		name : 'realname'
	},{
		name:'userExtention'
	},{
		name : 'sex'
	},  {
		name : 'phone'
	}, {
		name : 'email'
	}, {
		name : 'group'
	}, {
		name : 'status'
	} ]
});