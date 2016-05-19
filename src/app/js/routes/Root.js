import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import App from '../components/App';
import Index from '../components/index/Index';
import Book from '../components/book/Book';
import User from '../components/user/User';
import Login from '../components/login/Login';
import BookForm from '../components/bookForm/BookForm';
import Order from '../components/order/Order';
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var IndexRoute  = Router.IndexRoute;
var routes = (
    <Route name="main"  path="/" component={App}>
      <IndexRoute component={Login} />
      <Route name="book" path='/book/:bookId' component={Book}/>
      <Route name="index" path='/index' component={Index}/>
      <Route name="login" path='/login' component={Login} />
      <Route name="bookForm" path='/bookForm' component={BookForm}/>
      <Route name="user" path='/user' component={User}/>
      <Route name="order" path='/order' component={Order}/>
      <Redirect from="/" to="index" />
      {/*<NotFoundRoute handler={RouteNotFound} />*/}
    </Route>
);

module.exports = routes;
