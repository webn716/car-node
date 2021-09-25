import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import qs from 'qs'

import { Button , List, InputItem, WhiteSpace,WingBlank,NavBar,Picker,Toast} from 'antd-mobile';

import { createForm } from 'rc-form';
import CarTabBar from '../CarTabBar';
import Header from '../Header'
// import { Upload, Icon } from 'antd';
import Upload from 'antd/lib/Upload'
import Icon from 'antd/lib/Icon'
var path = require('path');

require('./index.css');
require('../iconfont/iconfont.css');

let dataReq = require('../script/req');
let businessId = ''
class App extends React.Component {
  constructor() {
    super() ;
    this.state = {
      busiType:[],
      selectBusiType:[],
      selectServiceType:[],
      loading: false,
      businessImg:"",
      seasons:[],
    }
  }

  componentDidMount(){
    console.log(dataReq.getUrlParam('id'))
    businessId = 10
    this.getProvice();
  }

  //获取省市县数据
  getProvice(){
    var that =this;
    console.log(1)
    axios({
      method: 'get',
      url: "/provice.json",
    }).then(function (response) {
      if(response){
        that.setState({
          seasons:response.data.options
        })
      }

    })
  }
  
  clkSaveAndNext(e){
    var that = this;
    // 除了checkbox的所有参数
    console.log(this.props.form.getFieldsValue())
    //服务类型参数
    //商家服务类型参数
    if(
      this.props.form.getFieldsValue().Area == undefined &&
      this.props.form.getFieldsValue().phone == undefined &&
      this.props.form.getFieldsValue().mobile == undefined && 
      this.props.form.getFieldsValue().detailAddress == undefined &&
      this.props.form.getFieldsValue().contact == undefined
    ){
        Toast.fail('您未做任何更改 !!!', 1);
    }else{
      axios({
        method: 'post',
        url: dataReq.globalUrl+"business/business-edit",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
          // id:businessId,
          // detail:that.props.form.getFieldsValue().detailAddress,	//string	是	详细地址
          // person:that.props.form.getFieldsValue().contact,//string 联系人		
          // phone:that.props.form.getFieldsValue().phone,	//string	是	手机号		
          // mobile:that.props.form.getFieldsValue().mobile,	//string	是	固定电话

          area:JSON.stringify(that.props.form.getFieldsValue().Area), //array 地点
          detail:that.props.form.getFieldsValue().detailAddress,	//string	是	详细地址
          contact:that.props.form.getFieldsValue().contact,//string 联系人		
          phone:that.props.form.getFieldsValue().phone,	//string	是	手机号		
          fixed_phone:that.props.form.getFieldsValue().mobile,	//string	是	固定电话
        })
      }).then(function (response) {
        if(response){
            Toast.success(response.data.msg, 1);
           window.location.reload()
        }
        
      })
      .catch(function (error) {
        // window.location.reload()
        console.log(error);
        window.location.reload()
      });
      
    }
  
  }

  render() {
    const { getFieldProps ,getFieldValue} = this.props.form;
    return (
      <div className="wrapper">
          <Header place = '北京' title = '商家修改资料' codeShow = {true}/>
          <div>
            <Picker extra="请选择"
                    data={this.state.seasons}
                    title="选择地区"
                {...getFieldProps('this.state.seasons', {
                  // initialValue: ['河北省', '唐山市', '路南区'],
                })}
                    onOk={e => console.log('ok', e)}
            >
              <List.Item   arrow="horizontal">选择地区</List.Item>
            </Picker>
            <InputItem {...getFieldProps('detailAddress')} clear >详细地址</InputItem>
            <List>
              <InputItem {...getFieldProps('contact')} clear>联系人</InputItem>
              <InputItem {...getFieldProps('phone')} clear>手机</InputItem>
              <InputItem  {...getFieldProps('mobile')} clear>固定电话</InputItem>
            </List>
            <WhiteSpace />
            <CarTabBar/>
          </div>
          <section className="btn-area">
              <Button className="btn mid" inline onClick={this.clkSaveAndNext.bind(this)} type="ghost">确认修改</Button>
          </section>
          <CarTabBar chosen="shopTab"/>
      </div>
    );
  }
}
const App1 = createForm()(App);
ReactDOM.render(<App1 />, document.querySelector('#divId'));

