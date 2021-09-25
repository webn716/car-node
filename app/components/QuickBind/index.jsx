import React from 'react';
import ReactDOM from 'react-dom';
// //import { Button } from 'antd-mobile';
// import { InputItem } from 'antd-mobile';

// ReactDOM.render(<InputItem>Start</InputItem>, document.querySelector('#divId'));
import { Button , List, InputItem, WhiteSpace,WingBlank,NavBar } from 'antd-mobile';
import { createForm } from 'rc-form';
import CarTabBar from '../CarTabBar';


class BasicInputExample extends React.Component {
  constructor() {
  	super() ;
  	this.state={"focused": false}
  }
  clickHandler(e) {
    var phone = this.props.form.getFieldValue('phone');
    var pwd = this.props.form.getFieldValue('password');
    
  }

  render() {
    const { getFieldProps ,getFieldValue} = this.props.form;
    return (
      <div>
        <NavBar leftContent="" mode="light" onLeftClick={() => console.log('onLeftClick')}
        >登录</NavBar>
        <List>
          <InputItem
            {...getFieldProps('phone')}
            type="phone" clear
            placeholder="186 1234 1234"
          >手机号码</InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password" clear
            placeholder="****"
          >密码</InputItem>
        </List>
        <WhiteSpace />
        <Button className="btn" type="primary" onClick={this.clickHandler.bind(this)}>登录</Button>
        <CarTabBar/>
      </div>
      
    );
  }
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);
ReactDOM.render(<BasicInputExampleWrapper />, document.querySelector('#divId'));
