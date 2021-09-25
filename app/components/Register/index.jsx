import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import qs from 'qs'
import { Button , Checkbox,List, InputItem, WhiteSpace,WingBlank,NavBar,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
const AgreeItem = Checkbox.AgreeItem;
require('./index.css');
var dataReq = require('../script/req');

var validate_code_input='2000';

window.addEventListener('load',function(){
  var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  document.querySelector('#wrapperId').style.height= (clientHeight)+'px';

});
class BasicInputExample extends React.Component {
  constructor() {
  	super() ;
  	this.state={
      "focused": false,
      phone:""
    }
  }

  click4ValidateCode(e) {
    this.state.phone=this.props.form.getFieldValue('phone');
    console.log(this.state.phone)
    if(!this.state.phone||this.state.phone==""){
      Toast.info('手机号不能为空', 1);
      return;
    }
    var myreg =/^1[3|4|5|7|8][0-9]{9}$/;
    if(!myreg.test(this.state.phone.replace(/\s/g,""))) {
      Toast.info('手机号格式不正确', 1);
      return;
    } else {
      var currentTarget = e.currentTarget;
      var cls = currentTarget.className;
      if(cls.indexOf('validating')!=-1) return;
      currentTarget.classList.add('validating');
      //get validate code TODO
      validate_code_input = '2000';
      var count = 30;
      doCount();
      var timer = setInterval(doCount,1000);
      var that = this;
      axios({
        method: 'get',
        url: dataReq.globalUrl + 'user/getcode?phone='+this.state.phone.replace(/\s/g,""),
      }).then(function (res) {
        if(res.data.err==0){
          Toast.success('验证码已发送 !!!', 1);
        }else{
          Toast.fail(res.data.msg+'!!!', 1);
        }

          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function doCount(){
      if(count){
        currentTarget.innerHTML=(count--)+'s';
      }else{
        clearInterval(timer);
        currentTarget.classList.remove('validating');
        currentTarget.innerHTML='获取验证码';
      }   
    }
  }
  clickChxChange(e){
    var currentTarget = e.target;
    var oInputChx = document.querySelector('.am-checkbox-input');
    if(currentTarget.checked && true==currentTarget.checked){
        oInputChx.dataset.isched = 'true';
    }else{
        oInputChx.dataset.isched = 'false';
    }
  }
  clickRegister(e) {
    var phone = this.props.form.getFieldValue('phone').replace(/\s/g,"");
    var valCode = this.props.form.getFieldValue('validateCode');
    var pwd = this.props.form.getFieldValue('password');
    console.log(phone);
    console.log(valCode);
    console.log(pwd);
    if(!phone || !valCode || !pwd){
      Toast.info('手机号、验证码、密码必填哦～', 1);
        return false;
    }
    //验证手机号格式
    var myreg =/^1[3|4|5|7|8][0-9]{9}$/;
    if(!myreg.test(phone.replace(/\s/g,""))) {
      Toast.info('手机号格式不正确', 1);
      return;
    }
    //判断密码格式

    if(!/^[a-zA-Z0-9]{6,32}$/.test(pwd)){
      Toast.info('密码格式不正确', 1);
      return false;
    }

    //是否同意协议
    var isAgree = document.querySelector('.am-checkbox-input').dataset.isched;
    if(!isAgree || isAgree=='false'){
      Toast.info('请勾选同意协议复选框～', 1);
      return false;
    }

    axios({
      method: 'post',
      url: dataReq.globalUrl + "user/signup",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        phone: phone,
        code: valCode,
        password:pwd,
      })
    }).then(function (response) {
      if(response.data.err==0){
        Toast.success('注册成功 !!!', 1);
        window.location.href = '/login.html'
      }else{
        Toast.fail(response.data.msg+'!!!', 1);
      }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {
    const { getFieldProps ,getFieldValue} = this.props.form;
    return (
      <div className="wrapper" id="wrapperId">
        <NavBar  mode="light" onLeftClick={(e) => {e.preventDefault();window.location.href = '/login.html'; }}
        >注册</NavBar>
        <List>
          <div className="validate-line">
              <InputItem
                {...getFieldProps('phone')}
                type="phone" clear
                placeholder="手机号"
              >手机号</InputItem>
              <span className="validate-code" onClick={this.click4ValidateCode.bind(this)}>获取验证码</span>
          </div>
          <InputItem id="validateCode"
            {...getFieldProps('validateCode')}
           clear
            placeholder="请输入验证码"
          >验证码</InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password" clear
            placeholder="6-32位字母数字组合"
          >密码</InputItem>
        </List>
        <WhiteSpace />
        <Button className="btn register-btn" type="primary" onClick={this.clickRegister.bind(this)}>立即注册</Button>
        <div className="agree-area">
          <AgreeItem data-seed="logId" onChange={this.clickChxChange.bind(this)}>
            我已阅读并同意汽车运管理<a onClick={(e) => { e.preventDefault();window.location.href = '/userAgreement.html'; }}>《用户使用协议》</a>
          </AgreeItem>

        </div>
      </div>
      
    );
  }
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);
ReactDOM.render(<BasicInputExampleWrapper />, document.querySelector('#divId'));
