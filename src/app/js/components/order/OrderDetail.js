import React, { Component, PropTypes } from 'react';
import {Row,Col,Breadcrumb} from 'antd';
import '../../../css/order.css';
import config from '../../dict';
export default class  OrderDetail extends Component{
    componentDidMount() {
        this.props.orderBoundAC.getOrderInfo({orderId: this.props.location.query.orderId});
    }
    showBookInfo(bookId) {
        this.props.history.pushState(null, '/book/'+bookId);
    }
    render() {
        const orderInfo = this.props.order.toJS().orderInfo.data;
        if(orderInfo) {
          const statusConfig = {
            'UNPAY': 0,
            'UNSEND': 1
          }
          const payStatusConfig = {
                'UNPAY': '未支付',
                'UNSEND': '买家已支付等待卖家发货'
            }
          return(
            <div className="OrderDetail">
                <div style={{margin: '20px 0'}}>
                    <Breadcrumb>
                      <Breadcrumb.Item>账单管理</Breadcrumb.Item>
                      <Breadcrumb.Item>订单详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
              <h2>用户信息</h2>
              <Row>
                <Col span="2">用户ID:</Col>
                <Col span="20">{orderInfo.userInfo['_id']}</Col>
              </Row>
              <Row>
                <Col span="2">用户名:</Col>
                <Col span="20">{orderInfo.userInfo.userName}</Col>
              </Row>
              <Row>
                <Col span="2">联系电话:</Col>
                <Col span="20">{orderInfo.userInfo.phone}</Col>
              </Row>
              <h2>订单信息</h2>
              <Row>
                <Col span="2">收货地址:</Col>
                <Col span="20">{orderInfo.orderInfo.address}</Col>
              </Row>
              <Row>
                <Col span="2">订单编号:</Col>
                <Col span="20">{orderInfo.orderInfo['_id']}</Col>
              </Row>
              <Row>
                <Col span="2">创建时间:</Col>
                <Col span="20">{orderInfo.orderInfo.time.split('T')[0]}</Col>
              </Row>
              <h2>商品信息</h2>
              <table  className="OrderDetail-bookInfo">
                <thead>
                  <tr>
                    <th>商品</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src={orderInfo.orderInfo.cover} alt=""/>
                      <a onClick={this.showBookInfo.bind(this, orderInfo.orderInfo.bookId)}>{orderInfo.orderInfo.bookName}</a>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      {orderInfo.orderInfo.aprice}
                    </td>
                    <td style={{textAlign: 'center'}}>
                      {orderInfo.orderInfo.count}
                    </td>
                    <td style={{textAlign: 'center'}}>
                      {config.orderStatus[orderInfo.orderInfo.orderStatus]}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="OrderDetail-sumMon">实付款：￥{(orderInfo.orderInfo.sumMon).toFixed(2)}<span></span></div>
            </div>
          )
        }
        return(
          <div>...</div>
        )
    }
}
