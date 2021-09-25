import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import qs from 'qs' 

import { Button , List, InputItem, WhiteSpace,WingBlank,Picker} from 'antd-mobile';
import { district, provinceLite as province } from 'antd-mobile-demo-data';

import { createForm } from 'rc-form';
import CarTabBar from '../CarTabBar';
import MainHeader from '../MainHeader';
import Header from '../Header'

var path = require('path');

require('./index.css');
require('../iconfont/iconfont.css');

let dataReq = require('../script/req');
class App extends React.Component {
  constructor() {
    super() ;
    this.state = {
      carId:'',
      last_licheng:'',
      last_date:'',
      zhouqi:'',
      name:'',
      typeId:'',
    }
  }
  componentWillMount(){
    console.log(decodeURI(dataReq.getUrlParam('name')))
    this.setState({
      carId:dataReq.getUrlParam('carId'),
      last_licheng:dataReq.getUrlParam('last_licheng'),
      last_date:dataReq.getUrlParam('last_date'),
      zhouqi:dataReq.getUrlParam('zhouqi'),
      name:decodeURI(dataReq.getUrlParam('name')),
      typeId:dataReq.getUrlParam('typeId')
    })
    // console.log(carId,last_licheng,last_date,zhouqi,name)
  }
  clickHandler(e) {
    var phone = this.props.form.getFieldValue('phone');
    var pwd = this.props.form.getFieldValue('password');
    
  }

  // touchstartevt(e){
  //   var currentTarget = e.currentTarget;
  //   currentTarget.style.backgroundColor='#ccc';
  //   console.log('start');
  // }
  // touchendevt(e){
  //   console.log('end');
  //   var currentTarget = e.currentTarget;
  //   currentTarget.style.backgroundColor='transparent';
  // }
  //设定
  clkSetting(e){
    alert('setting');
  }
  clkCancel(e){
    alert('取消');
  }
  clkSure(e){
    const{carId,last_licheng,last_date,zhouqi,name,typeId} = this.state
    console.log(carId,last_licheng,last_date,zhouqi,name,typeId)
    if(!last_licheng || !last_date || !zhouqi){
      alert('您还有信息未填写')
    }else{
      axios({
        method: 'post',
        url: "/api/baoyang/set-baoyang-value",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
          car_id:carId,
          type:typeId,
          licheng:last_licheng,
          baoyang_date:last_date,
          zhouqi:zhouqi,
        })
      }).then(function (response) {
        //加个提示 提交成功
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }
  clkMaintainRecord(e){
    alert('保养记录');
  }


  render() {
    const { getFieldProps ,getFieldValue} = this.props.form;
    const{carId,last_licheng,last_date,zhouqi,name} = this.state
    return (
      <div className="wrapper">
          <Header place = '北京' title = '保养' codeShow = {true}/>
          <section className="main-area">
              <div className="maintain-type-line">
                <span className="maintain-item txt">单项保养：{ name }</span>
              </div>
              <List>
              <InputItem {...getFieldProps('last_licheng')} value ={last_licheng} onChange={(e) => this.setState({ last_licheng: e }) } type="number" clear extra="公里">保养里程</InputItem>
              <InputItem {...getFieldProps('last_date')} value ={last_date} onChange={(e) => this.setState({ last_date: e }) }  clear type="date">保养日期</InputItem>
              <InputItem {...getFieldProps('zhouqi')}  value ={zhouqi} onChange={(e) => this.setState({ zhouqi: e }) } type="number"  clear extra="公里">保养周期</InputItem>
              </List>
              <WhiteSpace />
              <CarTabBar/>
          </section>

          <section className="btn-area">
              <Button className="btn mid" inline type="primary" onClick={this.clkSure.bind(this)}>确定</Button>
          </section>
          <CarTabBar />
      </div>
    );
  }
}
const App1 = createForm()(App);
ReactDOM.render(<App1 />, document.querySelector('#divId'));