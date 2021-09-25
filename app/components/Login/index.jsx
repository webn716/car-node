import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'
import qs from 'qs'

import { Button , List, InputItem, WhiteSpace,WingBlank,NavBar,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import CarTabBar from '../CarTabBar';
import Header from '../Header'

var alipay = require('./i/alipay.png');
var qq = require('./i/qq.png');
var sina = require('./i/sina.png');
var wechat = require('./i/wechat.png');

require('./index.css');
let dataReq = require('../script/req');

require('../iconfont/iconfont.css');

window.addEventListener('load',function(){
  var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  document.querySelector('#wrapperId').style.height= clientHeight+'px';
  document.querySelector('.loginLogo').style.height= clientHeight/3+'px';
  document.querySelector('.loginLogo').style.lineHeight= clientHeight/3+'px';

});

class BasicInputExample extends React.Component {
  constructor() {
  	super() ;
  	this.state={
      "focused": false,
    }
  }

  clickHandler(e) {
    const that = this
    var phone = String(this.props.form.getFieldValue('phone')).replace(/[ ]/g,"");
    var pwd = String(this.props.form.getFieldValue('password')).replace(/[ ]/g,"");
    if(phone=="undefined" || pwd=="undefined"){
      Toast.info('手机号、密码必填哦～', 1);
      return false;
    }
    var myreg =/^1[3|4|5|7|8][0-9]{9}$/;
    if(!myreg.test(phone.replace(/\s/g,""))) {
      Toast.info('手机号格式不正确', 1);
      return;
    }

    axios({
      method: 'post',
      url: dataReq.globalUrl+"user/login",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
          phone: phone,
          password: pwd,
          rememberMe:1,
      })
    }).then(function (response) {
          if(response.data.err==0){
            console.log(response.data.data.token);
            document.cookie=`token=${response.data.data.token}`;
            window.localStorage.setItem("token",response.data.data.token);
            window.location.href = `/index.html?token=${response.data.data.token}`
          }else{
            Toast.fail(response.data.msg+'!!!', 1);
          }

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  clickJump(e) {
    var currentTarget = e.currentTarget;
    var jumpType = currentTarget.dataset.jumptype;
    var url = '';
    switch(jumpType){
      case "reg":
        url='/register.html';
        break;
      case "pwd":
        url='/forgetPassword.html?id=123';
        break;
    }
    window.location.href= url;
  }  
  clickElse(e) {
    var currentTarget = e.currentTarget;
    var channel = currentTarget.dataset.channel;
    
    switch(channel){
      case "wechat":
        alert('微信登录');
        break;
      case "qq":
        alert('qq登录');
        break;
      case "sina":
        alert('sina登录');
        break;
      case "alipay":
        alert('alipay登录');
        break;
    }
  }

  render() {
    const { getFieldProps ,getFieldValue} = this.props.form;
    return (
      <div className="wrapper" id="wrapperId">
        {/**<Header place = '北京' title = '登录' codeShow = {true}/>****/}
        <div className="loginLogo"><img style = {{'width':'150px','height':'150px'}} src="../../../images/alipay.png" alt=""/></div>
        <List>
          <InputItem
            {...getFieldProps('phone')}
            type="phone" clear
            placeholder="请输入手机号"
          >手机号码</InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password" clear
            placeholder="请输入密码"
          >密码</InputItem>
        </List>
        <WhiteSpace />
        <Button className="btn login-btn " type="primary" onClick={this.clickHandler.bind(this)}>登录</Button>
        <div className="reg-pwd-line clearfix">
          <span className="lf" data-jumptype="reg" onClick={this.clickJump.bind(this)}>注册</span>
          <span className="rt" data-jumptype="pwd" onClick={this.clickJump.bind(this)}>忘记密码？</span>
        </div>

        {/* <div className="else-login">
           <ul className="login-ways">
             <li className="item wechat" data-channel="wechat" onClick={this.clickElse.bind(this)}></li>
             <li className="item qq" data-channel="qq" onClick={this.clickElse.bind(this)}></li>
             <li className="item sina" data-channel="sina" onClick={this.clickElse.bind(this)}></li>
             <li className="item alipay" data-channel="alipay" onClick={this.clickElse.bind(this)}></li>
           </ul>
           <span className="tle">其他方式登录</span>
        </div> */}
        {/* <CarTabBar/> */}
      </div>
      
    );
  }
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);
ReactDOM.render(<BasicInputExampleWrapper />, document.querySelector('#divId'));
