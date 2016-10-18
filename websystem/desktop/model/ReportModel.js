Ext.define('model.ReportModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id'
	},{
		name : 'uuid'
	}, {
		name : 'fileName'
	}, {
		name : 'fileType'
	},{
		name : 'fileSize'
	},  {
		name : 'createDate',type: 'date'
	}, {
		name : 'recordDate',type: 'date'
	}, {
		name : 'moveDate',type: 'date'
	} ]
});