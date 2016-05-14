import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientAC from '../actions/client';
// import * as bookAC from '../actions/book';
// import * as orderAC from '../actions/order';
import Router from 'react-router';
import Header from '../components/common/Header';
import '../../css/normalize.css';
import 'antd/lib/index.css';
import logoImg from '../../images/logo.jpg';
import Search from './common/Search';
var RouteHandler = Router.RouteHandler;

export default class App extends Component{
  componentDidMount() {
    console.log("this.props",this.props)
    this.props.clientBoundAC.getLog();
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

            {/*<Footer />*/}
          </div>
      );
  }

}

function mapStateToProps(state) {
  return {
      client: state.client,
      // bookInfo: state.bookInfo,
      // order: state.order,
  };
}

function mapDispatchToProps(dispatch) {
      return {
        clientBoundAC: bindActionCreators(clientAC, dispatch),
        // bookeBoundAC: bindActionCreators(bookAC, dispatch),
        // orderBoundAC: bindActionCreators(orderAC, dispatch),
      }
}

export default connect(
      mapStateToProps,
      mapDispatchToProps
)(App);
