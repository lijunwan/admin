var db = require('../db');
var GR = require('../helper');
var schedule = require('node-schedule');
var moment = require('moment');
var __remove = require('lodash/remove')
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
			list.push(data);
			res.send({data: list});
		})
	} else {
		db['order'].find({}).sort({'_id': -1}).exec(function(error, data){
			res.send({data: data});
		})
	}
}
function getKeyValueList(list,key) {
	const result = [];
	list.map(function(item){
		result.push(item[key]);
	});
	return result;
}
