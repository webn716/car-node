import React from 'react';
import ReactDOM from 'react-dom';

import { Button ,InputItem, WhiteSpace} from 'antd-mobile';
import { district, provinceLite as province } from 'antd-mobile-demo-data';

import { createForm } from 'rc-form';
import CarTabBar from '../CarTabBar';
import MainHeader from '../MainHeader';

var path = require('path');

require('./index.css');
require('../iconfont/iconfont.css');



class App extends React.Component {
  
  constructor() {
    super() ;
    this.state = {
    }
  }
  clickHandler(e) {
    var phone = this.props.form.getFieldValue('phone');
    var pwd = this.props.form.getFieldValue('password');
    
  }
  clkFull(e){
    alert('加满');
  }
  clkExpense(e){
    alert('油耗');
  }
  clkRecord(e){
    alert('加油记录');
  }
  clkSure(e){
    alert('确定');
  }
  clkCancel(e){
    alert('取消');
  }
  render() {
    const { getFieldProps ,getFieldValue} = this.props.form;
    return (
      <div className="wrapper">
          
          <section>
              <MainHeader/>

              <div className="maintain-type-line">
                <span className="maintain-item txt">记录加油</span>
              </div>
              
              <InputItem {...getFieldProps('addOilDistance')} clear type="money" placeholder="0012345" extra="公里">加油里程</InputItem>
              <InputItem {...getFieldProps('addOilDate')} clear type="date">加油时间</InputItem>
              <InputItem {...getFieldProps('oilLeft')} clear type="money" placeholder="45" extra="％">油箱剩余</InputItem>
              
              <div className="car-oil-info">
                  <InputItem {...getFieldProps('oilNo')} clear type="number" placeholder="92" extra="号">油号</InputItem>
                  <InputItem {...getFieldProps('oilPrice')} clear type="money" placeholder="6.21" extra="元／升">油价</InputItem>
              </div>

              <div className="oil-fee setting-line">
                 <InputItem {...getFieldProps('oilFee')} clear type="money" placeholder="540" extra="元">加油金额</InputItem>
                 <span className="txt" onClick={this.clkFull.bind(this)}>加满</span>
              </div>

              <div className="oil-count setting-line">
                 <InputItem {...getFieldProps('oilCount')} clear type="money" placeholder="86.96" extra="升">加油量</InputItem>
                 <span className="txt" onClick={this.clkExpense.bind(this)}>油耗</span>
              </div>

              <WhiteSpace />
              <CarTabBar/>
          </section>

          <section className="btn-area">
              <Button className="btn lt" inline onClick={this.clkCancel.bind(this)} >取消</Button>
              <Button className="btn mid" inline onClick={this.clkRecord.bind(this)} type="primary">加油记录</Button>
              <Button className="btn rt" inline onClick={this.clkSure.bind(this)} >确定</Button>
          </section>
          <CarTabBar/>
      </div>
    );
  }
}
const App1 = createForm()(App);
ReactDOM.render(<App1 />, document.querySelector('#divId'));