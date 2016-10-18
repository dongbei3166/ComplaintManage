Ext.onReady(function() {
	var parseCodes;

	if (Ext.Date) {
		Ext.Date.monthNames = [ "一月", "二月", "三月", "四月", "五月", "六月",
				"七月", "八月", "九月", "十月", "十一月", "十二月" ];

		Ext.Date.dayNames = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五",
				"星期六" ];

		Ext.Date.formatCodes.a = "(this.getHours() < 12 ? '上午' : '下午')";
		Ext.Date.formatCodes.A = "(this.getHours() < 12 ? '上午' : '下午')";

		parseCodes = {
			g : 1,
			c : "if (/(上午)/i.test(results[{0}])) {\n"
					+ "if (!h || h == 12) { h = 0; }\n"
					+ "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
			s : "(上午|下午)",
			calcAtEnd : true
		};

		Ext.Date.parseCodes.a = Ext.Date.parseCodes.A = parseCodes;
	}

	if (Ext.util && Ext.util.Format) {
		Ext.apply(Ext.util.Format, {
			thousandSeparator : ',',
			decimalSeparator : '.',
			currencySign : '\u00a5',
			// Chinese Yuan
			dateFormat : 'y年m月d日'
		});
	}
});

Ext.define("Ext.locale.zh_CN.view.View", {
	override : "Ext.view.View",
	emptyText : ""
});

Ext.define("Ext.locale.zh_CN.grid.plugin.DragDrop", {
	override : "Ext.grid.plugin.DragDrop",
	dragText : "选择了 {0} 行"
});

Ext.define("Ext.locale.zh_CN.tab.Tab", {
	override : "Ext.tab.Tab",
	closeText : "关闭此标签"
});

Ext.define("Ext.locale.zh_CN.form.field.Base", {
	override : "Ext.form.field.Base",
	invalidText : "输入值非法"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.zh_CN.view.AbstractView", {
	override : "Ext.view.AbstractView",
	loadingText : "读取中..."
});

Ext.define("Ext.locale.zh_CN.picker.Date", {
	override : "Ext.picker.Date",
	todayText : "今天",
	minText : "日期必须大于最小允许日期",
	// update
	maxText : "日期必须小于最大允许日期",
	// update
	disabledDaysText : "",
	disabledDatesText : "",
	nextText : '下个月 (Ctrl+Right)',
	prevText : '上个月 (Ctrl+Left)',
	monthYearText : '选择一个月 (Control+Up/Down 来改变年份)',
	// update
	todayTip : "{0} (空格键选择)",
	format : "y年m月d日",
	ariaTitle : '{0}',
	ariaTitleDateFormat : 'Y\u5e74m\u6708d\u65e5',
	longDayFormat : 'Y\u5e74m\u6708d\u65e5',
	monthYearFormat : 'Y\u5e74m\u6708',
	getDayInitial : function(value) {
		// Grab the last character
		return value.substr(value.length - 1);
	}
});

Ext.define("Ext.locale.zh_CN.picker.Month", {
	override : "Ext.picker.Month",
	okText : "确定",
	cancelText : "取消"
});

Ext.define("Ext.locale.zh_CN.toolbar.Paging", {
	override : "Ext.PagingToolbar",
	beforePageText : "第",
	// update
	afterPageText : "页,共 {0} 页",
	// update
	firstText : "第一页",
	prevText : "上一页",
	// update
	nextText : "下一页",
	lastText : "最后页",
	refreshText : "刷新",
	displayMsg : "显示 {0} - {1}条，共 {2} 条",
	// update
	emptyMsg : '没有数据'
});

Ext.define("Ext.locale.zh_CN.form.field.Text", {
	override : "Ext.form.field.Text",
	minLengthText : "该输入项的最小长度是 {0} 个字符",
	maxLengthText : "该输入项的最大长度是 {0} 个字符",
	blankText : "该输入项为必输项",
	regexText : "",
	emptyText : null
});

Ext.define("Ext.locale.zh_CN.form.field.Number", {
	override : "Ext.form.field.Number",
	minText : "该输入项的最小值是 {0}",
	maxText : "该输入项的最大值是 {0}",
	nanText : "{0} 不是有效数值"
});

Ext.define("Ext.locale.zh_CN.form.field.Date", {
	override : "Ext.form.field.Date",
	disabledDaysText : "禁用",
	disabledDatesText : "禁用",
	minText : "该输入项的日期必须在 {0} 之后",
	maxText : "该输入项的日期必须在 {0} 之前",
	invalidText : "{0} 是无效的日期 - 必须符合格式： {1}",
	format : "y年m月d日"
});

Ext.define("Ext.locale.zh_CN.form.field.ComboBox", {
	override : "Ext.form.field.ComboBox",
	valueNotFoundText : undefined
}, function() {
	Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
		loadingText : "加载中..."
	});
});

Ext.define("Ext.locale.zh_CN.form.field.VTypes", {
	override : "Ext.form.field.VTypes",
	emailText : '该输入项必须是电子邮件地址，格式如： "user@example.com"',
	urlText : '该输入项必须是URL地址，格式如： "http:/' + '/www.example.com"',
	alphaText : '该输入项只能包含半角字母和_',
	alphanumText : '该输入项只能包含半角字母,数字和_'
});

// add HTMLEditor's tips by andy_ghg
Ext.define("Ext.locale.zh_CN.form.field.HtmlEditor", {
	override : "Ext.form.field.HtmlEditor",
	createLinkText : '添加超级链接:'
}, function() {
	Ext.apply(Ext.form.field.HtmlEditor.prototype, {
		buttonTips : {
			bold : {
				title : '粗体 (Ctrl+B)',
				text : '将选中的文字设置为粗体',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			italic : {
				title : '斜体 (Ctrl+I)',
				text : '将选中的文字设置为斜体',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			underline : {
				title : '下划线 (Ctrl+U)',
				text : '给所选文字加下划线',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			increasefontsize : {
				title : '增大字体',
				text : '增大字号',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			decreasefontsize : {
				title : '缩小字体',
				text : '减小字号',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			backcolor : {
				title : '以不同颜色突出显示文本',
				text : '使文字看上去像是用荧光笔做了标记一样',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			forecolor : {
				title : '字体颜色',
				text : '更改字体颜色',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			justifyleft : {
				title : '左对齐',
				text : '将文字左对齐',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			justifycenter : {
				title : '居中',
				text : '将文字居中对齐',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			justifyright : {
				title : '右对齐',
				text : '将文字右对齐',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			insertunorderedlist : {
				title : '项目符号',
				text : '开始创建项目符号列表',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			insertorderedlist : {
				title : '编号',
				text : '开始创建编号列表',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			createlink : {
				title : '转成超级链接',
				text : '将所选文本转换成超级链接',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			},
			sourceedit : {
				title : '代码视图',
				text : '以代码的形式展现文本',
				cls : Ext.baseCSSPrefix + 'html-editor-tip'
			}
		}
	});
});

Ext.define("Ext.locale.zh_CN.grid.header.Container", {
	override : "Ext.grid.header.Container",
	sortAscText : "正序",
	// update
	sortDescText : "倒序",
	// update
	lockText : "锁定列",
	// update
	unlockText : "解除锁定",
	// update
	columnsText : "列"
});

Ext.define("Ext.locale.zh_CN.grid.PropertyColumnModel", {
	override : "Ext.grid.PropertyColumnModel",
	nameText : "名称",
	valueText : "值",
	dateFormat : "y年m月d日"
});

Ext.define("Ext.locale.zh_CN.window.MessageBox", {
	override : "Ext.window.MessageBox",
	buttonText : {
		ok : "确定",
		cancel : "取消",
		yes : "是",
		no : "否"
	}
});
Ext.define("Ext.locale.zh_CN.TaskBar", {
	override : 'Ext.ux.desktop.TaskBar',
	startBtnText : '开始'
});

Ext.define("Ext.locale.zh_CN.App", {
	override : 'MyDesktop.App',
	personalText : '个性化',
	workWinText : '工作台',
	recycleText : '回收站',
	backupText:'数据备份',
	dataCheckText:'系统管理',
	systemStatusText : '系统状态',
	toolsTitle : '众测平台工具',
	settingText : '设置',
	exitText : '退出',
	exitMsg : '确定要退出吗?'
});

Ext.define("Ext.locale.zh_CN.AboutWindow", {
	override : 'MyDesktop.AboutWindow',
	title : '关于工具'
});
Ext.define("Ext.locale.zh_CN.SystemManagementWindow", {
	override : 'MyDesktop.SystemManagementWindow',
	launcherText : '系统管理'
});
Ext.define("Ext.locale.zh_CN.SystemStatus", {
	override : 'MyDesktop.SystemStatus',
	title : '系统状态'
});

Ext.define("Ext.locale.zh_CN.Settings", {
	override : 'MyDesktop.Settings',
	title : '设置',
	okBtn : '确定',
	cancleBtn : '取消',
	prevTitle : '预览',
	ckBoxLabel : '拉伸',
	deskTitle : '桌面背景'
});

Ext.define("Ext.locale.zh_CN.Login", {
	override : 'MyDesktop.Login',
	title : '系统登录',
	loginText : '登 录',
	resetText : '重 置',
	usernameLabel : '用户名',
	passwordLabel : '密&nbsp;&nbsp;&nbsp;码',
	loadMsg : '登录验证中...',
	uBlankText : '用户名不能为空',
	pBlankText : '密码不能为空'
});
Ext.define("Ext.locale.zh_CN.WorkWindow", {
	override : 'MyDesktop.WorkWindow',
	launcherText : '工作台'
});
Ext.define("Ext.locale.zh_CN.BackupWindow", {
	override : 'MyDesktop.BackupWindow',
	launcherText : '数据备份'
});
Ext.define("Ext.locale.zh_CN.WorkbenchView", {
	override : 'view.WorkbenchView',
	fileName : '文件名',
	fileType : '类型',
	fileSize : '大小',
	createDate : '创建时间',
	recordDate : '扫描时间',
	deleteBtn : '删除',
	viewBtn : '查看',
	actionHeader : '操作',
	deleteBtnTip : '删除文件，可在回收站进行还原或彻底删除'
});
Ext.define("Ext.locale.zh_CN.RecycleView", {
	override : 'view.RecycleView',
	fileName : '文件名',
	fileType : '类型',
	fileSize : '大小',
	createDate : '创建时间',
	recordDate : '扫描时间',
	moveDate : '删除时间',
	deleteBtn : '删除',
	recoverBtn : '恢复',
	actionHeader : '操作',
	deleteBtnTip : '文件清空，不可恢复'
});
Ext.define("Ext.locale.zh_CN.WorkbenchController", {
	override : 'controller.WorkbenchController',
	alertTitle : '信息',
	serverError : '服务器出现错误，请稍后再试！',
	selectFile : '请选择要删除的文件。',
	deleteSuccess : '删除成功。',
	deleteFailure : '删除失败。',
	confirmDelete : '确认删除这{0}条记录吗?'
});
Ext.define("Ext.locale.zh_CN.RecycleController", {
	override : 'controller.RecycleController',
	alertTitle : '信息',
	serverError : '服务器出现错误，请稍后再试！',
	selectFile : '请选择要删除的文件。',
	deleteSuccess : '删除成功。',
	deleteFailure : '删除失败。',
	recoverSuccess:'恢复成功。',
	recoverFailure:'恢复失败。',
	confirmDelete : '确认删除这{0}条记录吗?',
	confirmRecover : '确认恢复数据吗?'
});
Ext.define("Ext.locale.zh_CN.RecycleWindow", {
	override : 'MyDesktop.RecycleWindow',
	launcherText : '回收站'
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.zh_CN.Component", {
	override : "Ext.Component"
});
