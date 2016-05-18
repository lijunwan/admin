var db = require('../db');
var  __pick = require('lodash/pick');
var __remove = require('lodash/remove');
var GR = require('../helper');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
function Books (book) {
	this.bookName = book.bookName;
}
module.exports = Books;
Books.addbookCover = function (req, res) {
	var bookId = req.query.bookId;
	var dir = path.join(__dirname, '../../../graduate/server/images/book/') + bookId + '/'
	fs.exists(dir, function(exists) {
		if(exists) {
			console.log('文件已经存在');
				uploadCover(req,res,dir)
		} else {
			fs.mkdir(dir,function(error){
				uploadCover(req,res,dir)
			})
		}

	});

}
function uploadCover(req, res, dir) {
	var form = new formidable.IncomingForm();   //创建上传表单
    form.uploadDir = dir;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
	form.parse(req, function(err, fields, files) {
		console.log(err, '====');
		const type = files.file.name.split('.')[1];
		var newPath = dir +'/'+ 'cover' +'.' +type;
		fs.renameSync(files.file.path, newPath);
		var coverPath =  '/book/'+ req.query.bookId + '/' + 'cover' + '.' +type;
		db['bookInfo'].findById(req.query.bookId, function(error, data){
			data.cover = coverPath;
			data.save();
			res.send({data: data.cover});
		})
	})
}
Books.addBookPicture = function(req, res) {
	var bookId = req.query.bookId;
	var dir = path.join(__dirname, '../../../graduate/server/images/book/') + bookId + '/'
	fs.exists(dir, function(exists) {
		if(exists) {
			console.log('文件已经存在');
				uploadPicture(req,res,dir)
		} else {
			fs.mkdir(dir,function(error){
				uploadPicture(req,res,dir)
			})
		}

	});
}
Books.editBookInfo = function(req, res) {
	var id = req.query['_id'];
	delete req.query._id;
	db['bookInfo'].findOneAndUpdate({_id: id},req.query, function(error, data,value){
		res.send({data: data});
	})
}
function uploadPicture(req, res, dir) {
	console.log(JSON.parse(req.query.delfileList));
	var delfileList = JSON.parse(req.query.delfileList);
	var form = new formidable.IncomingForm();   //创建上传表单
    form.uploadDir = dir;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
	form.multiples = true;
	form.parse(req, function(err, fields, files) {
		var list = [];
		if(files.file instanceof Array) {
			files.file.map(function(file){
				var pathList = file.path.split('/');
				list.push('/book/'+ req.query.bookId + '/'+pathList[pathList.length-1]);
			})
		} else {
			var pathList = files.file.path.split('/');
			list.push('/book/'+ req.query.bookId + '/'+pathList[pathList.length-1]);
		}
		if(delfileList.length>0) {//删除文件
			delfileList.map((filePath)=>{
				var delPath = path.join(__dirname, '../../../graduate/server/images'+filePath);
				fs.unlink(delPath, function(error){
					console.log('删除');
				})
			})
		}
		db['bookInfo'].findById(req.query.bookId, function(error, data){
			console.log(data.picture, '======')
			var picture = data.picture.slice(0);
	 		delfileList.map(function(delUrl){
			 	picture = __remove(picture, function(pic){
					return pic !== delUrl;
				})
			})
			console.log('remove---',picture)
			list.map(function(url){
				picture.push(url);
			})
			data.picture = picture;
			data.save();
			res.send({data: data.picture})
		})
	})
}
Books.addBook = function(req, res) {
	db['bookInfo'].create(req.query, function(error, book) {
		console.log(error)
		res.send({data: book});
	})
}
Books.getBookList = function(req,res) {
	db['bookInfo'].find({}, function(error, data) {
		res.send({data: data});
	})
}
Books.searchBook = function searchBook(req, res) {
	if(req.query.searchType === 'id') {
		db['bookInfo'].findById(req.query.searchKey, function(error, data){
			var list = [];
			list.push(data);
			res.send({data: list});
		})
	}else {
		var reg = new RegExp(req.query.searchKey,'i');
		searchBookMongo(reg, 'bookInfo', function(err, data){
			res.send({data:data});
		})
	}
}
Books.delBook = function(req, res) {
	db['bookInfo'].findByIdAndRemove(req.query.bookId, function(error, data){
		db['bookInfo'].find({}, function(error, data){
			res.send({data: data});
		})
	})
}
Books.getBookInfo = function(req, res) {
	db['bookInfo'].findById(req.query.bookId, function(error, data){
		if(data) {
			res.send({data :data});
		}
	})
}
Books.getBookMenu = function(req, res) {
	db['bookMenu'].find({},function(error, data){
		console.log('---',error);
		if(data){
			res.send({data: data})
		}
	})
}
// Books.searchByType = function(req, res) {
// 	var type = req.query.type;
// 	var reg = new RegExp('^'+type,'i');
// 	db['bookInfo'].find({type: reg},function(err, data){
// 		if(data) {
// 			const typeList = req.query.type.split('');
// 			console.log('---',typeList)
// 			const typeName = [];
// 			db['bookMenuConfig'].findOne({type: typeList[0]}, function(err, menu){
// 				if(menu) {
// 					typeName.push(menu);
// 					if(typeList[1]) {
// 						db['bookMenuConfig'].findOne({type: typeList[0]+typeList[1]}, function(err, menuLevel) {
// 							typeName.push(menuLevel);
// 							if(typeList[2]) {
// 								db['bookMenuConfig'].findOne({type: typeList[0]+typeList[1]+typeList[2]}, function(err, menuLevel2) {
// 									typeName.push(menuLevel2);
// 									res.send({data: data, type: typeName})
// 								})
// 							} else {
// 								res.send({data: data, type: typeName})
// 							}
// 						})
// 					} else {
// 						res.send({data: data, type: typeName})
// 					}
// 				}
// 			})
// 		}
// 	})
// }
// Books.evaluationBook = function(req, res) {
// 	var userId = req.cookies.bookstore.id;
// 	var evaluation = __pick(req.query, ['scores', 'evaText'])
// 	var bookId = req.query.bookId;
// 	var orderId = req.query.orderId;
// 	evaluation.userId = userId;
// 	db['users'].findById(userId, function(error, user){
// 	  evaluation.headImg = user.headImg;
// 		evaluation.userName = user.userName;
// 		evaluation.date = new Date();
// 		db['bookInfo'].findById(bookId, function(error, data){
// 			data.evaluation.push(evaluation);
// 			data.scores = calculatedAverage(data.evaluation, 'scores');
// 			console.log(data.evaluation,'????')
// 			data.save();
// 			db['order'].findById(orderId, function(error, order){
// 				order.orderStatus = 'EVALUATIONED';
// 				order.save();
// 				res.send({data: order});
// 			});
// 		})
// 	})
// }
// Books.sortBySaleNum = function(req, res) {
// 	db['bookInfo'].find({}).sort({saleNumber: -1}).limit(10).exec(function(error,data){
// 		res.send({data:data});
// 	})
// }
// Books.promBook = function(req, res) {
// 	db['promBook'].find({}).limit(10).exec(function(error,data){
// 		var bookIdList = GR.getKeyValueList(data, 'bookId');
// 		db['bookInfo'].findByIdList(req, res, bookIdList, function(data){
// 			res.send({data: data})
// 		})
// 	})
// }
// function calculatedAverage(list, key) {
// 	var sum = 0;
// 	if(list.length <1) {
// 		return sum;
// 	}
// 	list.map(function(item){
// 		sum += parseInt(item[key]);
// 		console.log(item[key], '----')
// 	})
// 	console.log(sum, '----')
// 	return sum/list.length;
// }
//
// function getBookDetailInfor (dataBase,id,callback) {
// 	db[dataBase].findOne({_id:id}).exec(function(err, data){
//   	  callback(err, data);
//     })
// }
// function getBooks (dataBase, callback) {
// 	db[dataBase].find().limit(24).exec(function(err, data){
//   	  callback(err, data);
//     })
// }
// function queryBook(reg,dataBase,callback) {
//   db[dataBase].find().or([{bookName:reg}, {author:reg}]).limit(10).exec(function(err, data){
// 	  callback(err, data);
//   })
// }
function searchBookMongo(reg, dataBase, callback) {
	console.log('//////////===',reg);
	db[dataBase].find().or([{bookName:reg}, {author:reg}]).exec(function(err, data){
  	  callback(err, data);
    })
}
