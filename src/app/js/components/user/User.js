import React, { Component, PropTypes } from 'react';
import SimpleTable from '../common/SimpleTable';
import { Breadcrumb, Icon} from 'antd';
export default class User extends Component{
    componentDidMount() {
    	this.props.clientBoundAC.getUserList();
    }
    render() {
    	const userListData = this.props.client.toJS().userList.data
    	if(!userListData) {
    		return(
    			<div>...</div>
    		)
    	}
    	const config = {
			header:[
				{key: '_id', width: '0.2'},
				{key: 'userName', width: '0.1'},
				{key: 'name', width: '0.1'},
				{key: 'phone', width: '0.1'},
				{key: 'sex', width: '0.1'},
				{key: 'birthday', width: '0.1'},
			],
			body: userListData,
			dict: 'userInfo',
		}
        return(
        	<div>
        		<h1 className='title'><Icon type="user" />用户管理</h1>
          		<p style={{padding: '10px 8px'}}>已有
          		<span style={{fontWeight: 'bold', color: '#007CB6'}}>{userListData.length}</span>人注册为用户</p>
        		<SimpleTable config={config} />
        	</div>
        )
    }
}
