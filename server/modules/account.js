var db = require('../db');
function Account (user) {
	this.userName = user.userName;
	this.password = user.password;
}
module.exports = Account;
Account.checkLogin = function checkLogin(req,res){
	var obj = {};
	obj.userName = req.body.userName;
	obj.password = req.body.password;
	db['account'].findOne(obj,function(error, user){
		console.log(user)
		if(user) {
			res.cookie("bookstoreAdmin",obj.userName,{maxAge:6000000})
			res.statusCode=200;
			res.send({userName: user.userName})
		} else {
			res.statusCode=404;
			res.send({errorCode:400403,message:"错误的密码或用户名"})
		}
	})
}