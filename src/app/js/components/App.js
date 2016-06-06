import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientAC from '../actions/client';
import * as bookAC from '../actions/book';
import * as orderAC from '../actions/order';
import Router from 'react-router';
import Header from '../components/common/Header';
import '../../css/normalize.css';
import 'antd/lib/index.css';
import logoImg from '../../images/logo.jpg';
import Search from './common/Search';
import __difference from 'lodash/difference';
import {message} from 'antd';
var RouteHandler = Router.RouteHandler;
let myAudio;
export default class App extends Component{
  componentDidMount() {
    console.log("this.props",this.props.order.toJS())
    var that = this;
    myAudio = document.getElementById('myAudio');
    setInterval(that.getUnsendOrder.bind(that), 60000);
    this.props.clientBoundAC.getLog();
  }
  componentWillReceiveProps(nextProps) {
    let orderList = nextProps.order.toJS().unsendOrder.data;
    if(orderList) {
        if(localStorage.getItem('unsendOrder')){
            let localList = JSON.parse(localStorage.getItem('unsendOrder'));
            let newList = __difference(orderList, localList);
            if(newList.length > 0){
                message.success('您有新的订单');
                if(myAudio) {
                    myAudio.play();
                }
            }
            localStorage.setItem('unsendOrder', JSON.stringify(orderList));
        } else {
            message.success('您有新的订单');
            if(myAudio) {
                myAudio.play();
            }
            localStorage.setItem('unsendOrder', JSON.stringify(orderList));
        }
    }
  }
  getUnsendOrder() {
    console.log(this.props,'///')
    this.props.orderBoundAC.getOrderUnsend();
  }
  render() {
      return (
          <div>
            {
                this.props.location.pathname=="login" || this.props.location.pathname =="/" ? "" :
                <div>
                    <Header {...this.props}/>
                </div>
            }
            {
              this.props.location.pathname =="shopCart" || this.props.routes[1]&&this.props.routes[1].name=="favorite" ?
              <div>
                  {React.cloneElement(this.props.children, this.props)}
              </div>
              :
              <div style={{width:'1200px',margin: 'auto'}}>
                  {React.cloneElement(this.props.children, this.props)}
              </div>
            }
            <audio id="myAudio">
              <source src="message.mp3"/>
              Your browser does not support the audio tag.
            </audio>
            {/*<Footer />*/}
          </div>
      );
  }

}

function mapStateToProps(state) {
  return {
      client: state.client,
      book: state.book,
      order: state.order,
  };
}

function mapDispatchToProps(dispatch) {
      return {
        clientBoundAC: bindActionCreators(clientAC, dispatch),
        bookBoundAC: bindActionCreators(bookAC, dispatch),
        orderBoundAC: bindActionCreators(orderAC, dispatch),
      }
}

export default connect(
      mapStateToProps,
      mapDispatchToProps
)(App);
