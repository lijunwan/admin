var settings = require ('./Settings');
//import mongodb from 'mongodb';
var  mongoose = require('mongoose');
var connection = mongoose.connection;
//var Db = mongodb.Db;
//var Connection = mongodb.Connection;
var Schema = mongoose.Schema;
var db = mongoose.createConnection('localhost',"bookstore");
db.on('error',console.error.bind(console,'connection error'));
var dataModel = {};
db.once('open', function (callback) {
	   var accountSchema = new Schema({
	   		userName: String,
	   		password: String,
	   })
	var userSchema = new Schema({
		phone:String,//电话
		password:String,//密码
		userName:String,//用户名
		shopCart:[],//购物车 数组保存id
		payOrder:[],//账单
		favorite:[],//收藏夹
		sex:String,//性别 1 男 2 女 0 其他
		birthday:String,//生日
		headImg:String,//头像 保存图片的地址
		name: String,//真实姓名
		ShippingAddress:[],//收货地址s
	});
	var bookInfoSchema = new Schema({
		bookName:String,//书名
		author:String,//作者
		pubHouse:String,//出版社
		pubDate:String,//出版时间
		comment:[],//评论 存放评论的id
		price: String,//定价
		discount: String,//折扣
		aprice: String,//售价
		cover:String,//封面 保存 照片位置
		picture:[],//书籍的图片
		editions:String,//版次
		pages:Number,
		words:Number,
		type:String,//分类
		authorIntro:String,//作者简介
		stocks:Number,//库存
		saleNumber:0,//销售量，
		prestocks: Number,//进货量,
		introduce:String,//简介，
		scores:0,//评分
		flag: String,//书籍的状态
		favorite: [],
		evaluation:[],//评介
		typeText: String,
	});
	var orderSchema = new Schema({
		time: Date,//订单成交时间
	  	aprice: Number,
		cover: String,
		bookName: String,
		sumMon: Number, //实际金额
		userId: String, //用户id
	  	address: String,//收货地址
	  	orderStatus: String,//unpaied paided/unsend send/unrecive recive
		bookId: String,
		count: Number,
		payTime: Date,//支付时间
	});
	// var saleRecordsSchema = new Schema({
	// 	bookId: String,
	// 	userId: String,
	// 	count: Number,
	// 	orderId: String,
	// 	salePrice: Number,
	// 	sumMon: Number,
	// });
	// var promBookSchema = new Schema({
	// 	bookId: String,
	// })
	var bookMenuSchema = new Schema({
		value: String,
		label: String,
		children: [],
	});
	var bookMenuConfigSchema = new Schema({
		value: String,
		label: String,
	})
	// userSchema.statics.findUserById = findItemById({errorCode:404405,message:"未找到相关的用户"});
	//bookInfoSchema.statics.findBookById = findItemById({errorCode:404406,message:"未找到相关的书籍"});
	// bookInfoSchema.statics.findByIdList = findItemsByList({errorCode:404602,message:"未找到相关的书籍信息"})
	// shopCartSchema.statics.findByIdList = findItemsByList({errorCode:404601,message:"未找到该用户购物车的信息"})
	// bookInfoSchema.statics.findItemsByList = findItemsByList({errorCode:404406,message:"未找到相关的书籍"})
	// favoriteSchema.statics.findFavoriteById = findItemById({errorCode:404407,message:"未找到相关的收藏夹"});
	// favoriteSchema.statics.createFavorite = createItem({errorCode:405401,message:"操作收藏夹失败"});
	// favoriteSchema.statics.hasRecords = dbHasRecords();
	// favoriteSchema.statics.findItems = findItems({errorCode:404600,message:'未找到相关收藏'});
	// orderSchema.statics.createItem = createItem({errorCode:404700,message:'创建订单失败'})
	// orderSchema.statics.findItems = findItems({errorCode:404700,message:'查找订单失败'})
	// orderSchema.statics.findItemById = findItemById({errorCode:404701,message:'查找订单失败'})
	// orderSchema.statics.findItemsByList = findItemsByList({errorCode: 404101, message:'订单查找失败'})
	// saleRecordsSchema.statics.createItem = createItem({errorCode:404702,message:'支付失败'})
	// function useUpdate (errorObj) {
	// 	this.findOne(userId,)
	// }
	function createItem(errorObj) {
		return function(req, res, obj,callback) {
			this.create(obj, function(error, data){
				if(error) return console.error(error);
				if(data) {
					callback(data);
				} else {
					res.statusCode="405";
					res.send({errorCode:errorObj.errorCode,message: errorObj.message});
				}
			});
		}
	}
	function findItems(errorObj) {
		return function(req, res, obj, callback) {
			this.find(obj, function(error, data){
				if(error) return console.error(error);
				if(data) {
					callback(data);
				} else {
					res.statusCode="404";
					res.send({errorCode:errorObj.errorCode,message: errorObj.message})
				}
			});
		}
	}
	function findItemById(errorObj) {
		return function(req, res, id, callback) {
			this.findOne({'_id': id}, function(error, data){
				if(error) return console.error(error);
				if(data) {
					callback(data);
				} else {
					// console.log(res,'????')
					res.statusCode="404";
					res.send({errorCode:errorObj.errorCode,message: errorObj.message})
				}
			});
		}
	}
	function dbHasRecords() {//判断数据库里是否存在这条记录
		return function(req, res, obj, callback) {
			this.findOne(obj, function(error, data){
				if(error) return console.error(error);
				if(data) {
					callback(true);
				} else {
					callback(false);
				}
			});
		}
	}
	function findItemsByList() {
		return function(req, res, list, callback) {
			this.where('_id').in(list).exec(function(error,data){
				if(error) return console.error(error);
				if(data) {
					callback(data);
				} else {
					// console.log(res,'????')
					res.statusCode="404";
					res.send({errorCode:errorObj.errorCode,message: errorObj.message})
				}
			})
		}
	}
	dataModel['account'] = db.model('account', accountSchema, 'account');
	dataModel["users"] = db.model('users',userSchema,'users');
	// dataModel["baseInfo"] = db.model('baseInfo',baseInfoSchema,'baseInfo');
	// dataModel["logs"] = db.model('logs',logSchema);
	dataModel["bookInfo"] = db.model('bookInfo',bookInfoSchema,'bookInfo');
	// dataModel['bookClass'] = db.model('bookClass', bookClassSchema, 'bookClass');
	// dataModel['bookOnSale'] = db.model('bookOnSale', bookOnSaleSchema, 'bookOnSale');
	// dataModel['bookNew'] = db.model('bookNew', bookNewSchema, 'bookNew');
	// dataModel['shopCart'] = db.model('shopCart', shopCartSchema, 'shopCart');
	// dataModel['favorite'] = db.model('favorite', favoriteSchema, 'favorite');
	dataModel['order'] = db.model('order', orderSchema, 'order');
	// dataModel['saleRecords'] = db.model('saleRecords', saleRecordsSchema, 'saleRecords');
	dataModel['bookMenu'] = db.model('bookMen', bookMenuSchema, 'bookMen');
	// dataModel['bookMenuConfig'] = db.model('bookMenuConfig', bookMenuConfigSchema, 'bookMenuConfig');
	// dataModel['promBook'] = db.model('promBook', promBookSchema, 'promBook');
	var obj = {
		bookName:"javascript权威指南",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12",
		comment:[],
		price: 69.00,
		discount: 8.92,
		aprice: 61.55,
		cover:"/book/cover.jpg",
		picture:['/book/cover.jpg','/book/testImage2.jpg', '/book/testImage3.jpg', '/book/testImage4.jpg', '/book/testImage5.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:1000,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
	}
	var objOnSale = {
		bookName:"javascript权威指南",
		author:"朴灵",
		price: 61.00,
		discount:"8.92",
		cover:"book/cover.jpg",
		detail: '5709b6499180abb00defee0a'
	}
	var bookMenu = {
		value:'A',
		label:'教育',
		children:[
			{
				value:'AA',
				label:'教材',
				children:[
					{
						value:'AAA',
						label:'研究生/本科'
					},
					{
						value:'AAB',
						label:'高职高专教材'
					},
					{
						value: 'AAC',
						label: '中职教材'
					},
					{
						value: 'AAD',
						label: '成人教育教材'
					},
					{
						value: 'AAE',
						label: '职业技术培训'
					},
					{
						value: 'AAF',
						label: '公共课'
					},
					{
						value: 'AAG',
						label: '经济管理类'
					},
					{
						value: 'AAH',
						label: '工学类'
					},
					{
						value: 'AAI',
						label: '文法类'
					},
					{
						value: 'AAJ',
						label: '医学类'
					},
					{
						value: 'AAK',
						label: '理学类'
					},
					{
						value: 'AAI',
						label: '农学'
					},

				]
			},
			{
				value:'AB',
				label:'外语',
				children:[
					{
						value:'ABA',
						label:'英语专项训练'
					},
					{
						value:'ABB',
						label:'英语读物'
					},
					{
						value:'ABC',
						label:'英语考试'
					},
					{
						value:'ABD',
						label:'小语种'
					},
					{
						value:'ABE',
						label:'日语'
					},
					{
						value:'ABF',
						label:'法语'
					},
					{
						value:'ABF',
						label:'韩语'
					},
				]
			},
			{
				value: 'AC',
				label: '考试',
				children:[
					{
						value: 'ACA',
						label: '学历考试',
					},
					{
						value: 'ACB',
						label: '公务员',
					},
					{
						value: 'ACC',
						label: '财税外贸保险',
					},
					{
						value: 'ACD',
						label: '计算机',
					},
					{
						value: 'ACE',
						label: '建筑工程',
					},
					{
						value: 'ACF',
						label: '医药卫生',
					},
					{
						value: 'ACG',
						label: '艺术/体育',
					},
					{
						value: 'ACH',
						label: '考研',
					},
					{
						value: 'ACI',
						label: 'MBA/MPA/MPAc',
					},
					{
						value: 'ACJ',
						label: '会计',
					},
					{
						value: 'ACK',
						label: '建造师',
					},
					{
						value: 'ACL',
						label: '医师资格',
					},
					{
						value: 'ACM',
						label: '人力资源管理',
					},
				]
			},
			{
				value: 'AD',
				label: '中小学教辅',
				children: [
					{
						value: 'ADA' ,
						label: '小学' ,
					},
					{
						value: 'ADB' ,
						label: '初中' ,
					},
					{
						value: 'ADC' ,
						label: '高中' ,
					},
					{
						value: 'ADD' ,
						label: '中小学阅读' ,
					},
					{
						value: 'ADE' ,
						label: '英语专项' ,
					},
					{
						value: 'ADF' ,
						label: '语文作文' ,
					},
					{
						value: 'ADG' ,
						label: '工具书' ,
					},
					{
						value: 'ADH' ,
						label: '写字/字帖' ,
					},
					{
						value: 'ADI' ,
						label: '学习方法' ,
					},
					{
						value: 'ADJ' ,
						label: '教育理论' ,
					},
				]
			}
		]
	}
	var promBookIdList = [{bookId: '571b6464dada3e7b0cbb7d72'},
						   {bookId: '571b64b1f2d21e910cec66a3'},
						   {bookId: '571b645d13a810680c5dc882'},
						   {bookId: '571b5e6e802d73070c08e9f7'},
						   {bookId: '571b594c61808b120b1efdab'},
						   {bookId: '571b593e1bcd7cc40ad7e00f'},
						   {bookId: '571b590f443ac38a0ad1799f'},
						   {bookId: '571cb729fe1e47b530f24305'},
						   {bookId: '571b8c73bef9aa9b419a1c6f'},
						   {bookId: '571b8c4ed2fd2e8741943588'},
						   {bookId: '571b8c4d0ae1847d41b495cd'},]
	var account = {
		userName: 'wanlijun',
		password: '123456',
	}
	// dataModel['account'].create(account,function(err,data){
	// 	if(err) return console.error(err);
	// })
	// dataModel['bookMenu'].create(bookMenu, function(err,data){
	// 	console.log(data);
	// })
	// dataModel['promBook'].create(promBookIdList,function(err, data){
	// 	console.log(data)
	// })
	//  dataModel['bookInfo'].create(obj,function(err,data){
	// 	if(err) return console.error(err);
	// })
	var bookMenuConfigObj = [
		{
			type: 'A',
			name: '教育',
		},
		{
			type: 'AA',
			name: '教材',
		},
		{
			type: 'AAA',
			name: '研究生/本科生',
		}
	]
	// dataModel['bookMenuConfig'].create(bookMenuConfigObj,function(err,data){
	// 		if(err) return console.error(err);
	// 		console.log(data,'--');
	// 	})
	// dataModel['bookOnSale'].create(objOnSale,function(err,data){
	// 	if(err) return console.error(err);
	// 	console.log(data);
	// })
	// dataModel['bookNew'].create(objOnSale,function(err,data){
	// 	if(err) return console.error(err);
	// 	console.log(data);
	// })
// 	var obj = {
// 	flag:'J',
// 	name:'教育',
// 	children:[
// 		{
// 			flag:'J',
// 			name:'教材',
// 			children:[
// 				{
// 					flag:'JG',
// 			   		name:'高职高专教材'
// 				},
// 				{
// 		 			flag: 'JZ',
// 					name: '中职教材'
// 				}
// 			]
// 		},
// 		{
// 			flag:'W',
// 			name:'外语',
// 			children:[
// 				{
// 					flag:'WK',
// 					name:'口语'
// 				}
// 			]
// 		}
// 	]
// }
// 	dataModel['bookClass'].create(obj,function(err,data){
// 		if(err) return console.error(err);
// 		console.log(data);
// 	})
})
module.exports = dataModel;
