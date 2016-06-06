var db = require('../db');
var GR = require('../helper');
var schedule = require('node-schedule');
var moment = require('moment');
var __remove = require('lodash/remove');
var __assign = require('lodash/assign')
function Order(order) {

}
module.exports = Order;
Order.getOrderList = function getOrderList(req, res) {
	db['order'].find({}).sort({'_id': -1}).exec(function(error, data){
		res.send({data: data});
	})
}
Order.searchOrder = function(req, res) {
	if(req.query.orderId) {
		db['order'].findById(req.query.orderId, function(error, data) {
			const list = [];
			if(data) {
				list.push(data);
			}
			res.send({data: list});
		})
	} else {
		db['order'].find({}).sort({'_id': -1}).exec(function(error, data){
			res.send({data: data});
		})
	}
}
Order.sendOrde = function(req, res) {
	console.log(req.query.orderId, '-----')
	db['order'].findById(req.query.orderId,function(error, order){
		order.orderStatus = 'UNCONFIRM';
		order.save();
		db['order'].find({}).sort({'_id':-1}).exec(function(error, orderList){
			res.send({data: orderList});
		})
	})
}
Order.getOrderInfo = function(req, res) {
	var data = {};
	db['order'].findById(req.query.orderId, function(error, order) {
		db['users'].findOne({'_id': order.userId}).select('_id userName phone').exec(function(error, userInfo){
			data.orderInfo = order;
			data.userInfo = userInfo;
			console.log(data, userInfo)
			res.send({data: data});
		})
	})
}
Order.getOrderUnsend = function(req, res) {
	db['order'].find({orderStatus: 'UNSEND'}).select('_id').exec(function(error, data){
		const list = [];
		data.map(function(obj) {
			list.push(obj['_id'])
		})
		res.send({data: list});
	})
}
Order.orderStatis = function(req, res) {
	var startTime = req.query.startTime;
	var endTime = req.query.endTime;
	if(startTime == endTime) {
		endTime = moment(endTime).add(1, 'days').format('YYYY-MM-DD');
	}
	var start =  new  Date(startTime.replace(/-/g,   "/"));
	var end = new Date(endTime.replace(/-/g,   "/"));
	console.log(start,end,'?????');
	db['order'].aggregate([
		{$project: {bookId:1, bookName:1, time:1,count:1,sumMon:1}},
		{$match:{time: {$gte: start,$lte: end}}},
		{$group:{_id:'$bookId',count: {$sum:'$count'}, sumMon:{$sum: '$sumMon'},bookName:{$last: '$bookName'}}}
	]).sort({count: -1}).exec(function(error, data){
		res.send({data: data});
	})
}
function getKeyValueList(list,key) {
	const result = [];
	list.map(function(item){
		result.push(item[key]);
	});
	return result;
}
