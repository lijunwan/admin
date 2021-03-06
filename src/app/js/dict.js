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
    bookStatic: {
        '_id': 'ID',
        'bookName': '书名',
        'saleNumber': '销量',
        'scores': '评分',
        'favorite': '收藏量',
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
        bookId: '书籍ID',
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
    },
    orderStatus: {
        'UNPAY': '未支付',
        'UNSEND': '未发货',
        'CLOSED': '已关闭',
        'UNCONFIRM': '未收货',
        'UNEVALUATION': '未评价',
        'SUCCESS': '交易成功',
    },
    orderStatic: {
        '_id': '书籍ID',
        'bookName': '书名',
        'count': '销售量',
        'sumMon': '销售额',
    }
}
module.exports = config;
