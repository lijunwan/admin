var express = require('express');
var app = express();
var router = express.Router();
var Account = require('../modules/account.js')
var User = require('../modules/user.js');
var Books = require('../modules/book');
var ShopCart = require('../modules/shopCart');
var Favorite = require('../modules/favorite');
var Order = require('../modules/order');
app.post('/api/account/login',Account.checkLogin);
app.get('/api/log',Account.isLogin);
app.get('/api/book/bookMenu', Books.getBookMenu);
app.get('/api/book/addbook', Books.addBook);
app.post('/api/book/cover',Books.addbookCover);
app.post('/api/book/picture',Books.addBookPicture);
app.get('/api/book/bookList', Books.getBookList);
// app.get('/api/user/phone',User.checkPhone);
// app.post('/api/user/register',User.createUser);
// app.del('/api/user/logout',User.logout);
// app.post('/api/user/authorization/headImages', User.UploadImg);
// app.get('/api/user/authorization/undateUserInfo', User.modifyBaseInfo);
// app.get('/api/user/authorization/getUserInfo', User.getUserInfo);
// app.get('/api/user/authorization/addAddress', User.addAddress);
// app.get('/api/user/authorization/getAddress', User.getAddress);
// app.get('/api/user/authorization/delAddress', User.delAddress);
// app.post('/api/user/authorization/updatePassWord', User.updatePassWord);
// app.get('/api/user/authorization/evaluation', Books.evaluationBook);
// app.get('/api/book/autoComplete', Books.autoComplete);
// app.get('/api/book/bookOnSale', Books.getOnSaleBooks);
// app.get('/api/book/bookNew', Books.getNewBooks);
// app.get('/api/book/bookInfo', Books.getBookInfo);
// app.get('/api/book/searchBook', Books.searchBook);
// app.get('/api/book/searchByType', Books.searchByType);
// app.get('/api/book/sortBySaleNum',Books.sortBySaleNum);
// app.get('/api/book/promBook',Books.promBook);
app.use('/api/*', function(req, res, next){
    console.log(req.cookies.bookstoreAdmin)
    if(req.cookies.bookstoreAdmin) {
        next('route')
        console.log(next);
    }else {
        res.statusCode=401;
        res.send({errorCode:400100,message:"未授权"})
    }
});
// app.get('/api/user/authorization/addShopCarts', ShopCart.addBook);
// app.get('/api/user/authorization/getShopCarts', ShopCart.getShopCartInfo);
// app.get('/api/user/authorization/updateShopCart', ShopCart.updateShopCart);
// app.get('/api/user/authorization/delShopCart', ShopCart.delShopCart);
// app.get('/api/user/authorization/addFavorite', Favorite.addFavorite);
// app.get('/api/user/authorization/getFavorite', Favorite.getFavorite);
// app.get('/api/user/authorization/delFavorite', Favorite.delFavorite);
// app.get('/api/user/authorization/createOrder', Order.createOrder);
// app.get('/api/user/authorization/getOrderInfo', Order.getOrderInfo);
// app.get('/api/user/authorization/getOrderList', Order.getOrderList);
// app.get('/api/user/authorization/payOrder', Order.payOrder);
// app.get('/api/user/authorization/confirmReceipt', Order.confirmReceipt);
// app.get('/api/user/authorization/delOrder', Order.delOrder);
module.exports = app;
