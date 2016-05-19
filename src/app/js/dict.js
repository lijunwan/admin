var config = {
    bookInfo: {
		'_id': 'ID',
		'bookName': '书名',
		'author': '作者',
		'price': '定价(元)',
		'discount': '折扣',
		'aprice': '售价(元)',
		'stocks': '库存',
		'flag': '书籍宣传区',
        'operation': '操作',
	},
    bookArea: {
        'none': '无',
        'new': '新书上架',
        'onsale': '最新优惠',
        'extend': '推广商品',
    },
    userInfo: {
        '_id': '用户ID',
        userName:'用户名',//用户名
        name: '真实姓名',//真实姓名
        phone:'电话',//电话
		sex:'性别',//性别 1 男 2 女 0 其他
		birthday:'生日',//生日
    },
    orderInfo: {
        '_id':'订单ID',
        time: '创建时间',//订单成交时间
        cover: '封面',
        bookName: '书名',
        aprice: '售价',
        count: '交易数量',
        sumMon: '总金额', //实际金额
        userId: '用户ID', //用户id
        address: '收货地址',//收货地址
        orderStatus: '状态',//unpaied paided/unsend send/unrecive recive
        operation: '操作',
    }
}
module.exports = config;
