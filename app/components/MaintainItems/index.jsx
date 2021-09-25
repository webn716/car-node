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
// import { Icon } from 'antd';
import Icon from 'antd/lib/Icon'
var path = require('path');

require('./index.css');
require('../iconfont/iconfont.css');
window.addEventListener('load',function(){
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    document.querySelector('#noCar').style.marginTop= (clientHeight-480)/2+'px';
});

class App extends React.Component {
  
  constructor() {
    super() ;
      this.state = {
        carList: [],
        selectCarMessage:{},
        selectedCarId:'',
        selectedCarName:'',
        selectedCarImg:'',
        kilometers:'',
        numberObd:"",
        itemArr :[{
              name:"机油",
              percent:"5%"
            },{
              name:"机油2",
              percent:"60%"
            },{
              name:"机油滤清器",
              percent:"99%"
            },{
              name:"机油3",
              percent:"49%"
            },{
              id:1,
              name:"机油4",
            }]
      }
  }

  componentDidMount(){
      this.getCarList()
  }

  getCarList(){
    var that = this;
    axios({
      method: 'post',
      url: "/api/car/list",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
      })
    }).then(function (response) {
      console.log(response.data.data.length == 0);
      if(response.data.data.length !== 0){
        console.log('2131231232')
        that.setState({
          carList: response.data.data,
          selectedCarId:response.data.data[0].id,
          selectedCarName:response.data.data[0].brand,
          selectedCarImg:response.data.data[0].brand_logo,
          // carList:mockCarList
        });
        that.getMaintainList(response.data.data[0].id)
        // console.log(that.state.carList)
      }
     
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  selectCar (event) {
    if(event.target.value == ''){
      this.setState({
        selectedCarName:'',
        selectedCarImg:''
      })
    }else{
      console.log('进入')
      this.state.carList.map((item)=>{
        if(event.target.value == item.id){
          this.setState({
            selectedCarName:item.brand,
            selectedCarImg:item.brand_logo,
            selectedCarId:item.id,
          },()=>{
            this.getMaintainList(this.state.selectedCarId)
          })
        }
      })
    }
  }

  getKilometers (event) {
    console.log(event.target.value)
    this.setState({
      kilometers:event.target.value,
    })
  }

  getNumberObd (event) {
    console.log(event.target.value)
    this.setState({
      numberObd:event.target.value
    })
  }

  sendChange(){
    const {selectedCarId, kilometers, numberObd} = this.state
    if(selectedCarId == '' || kilometers == "" || numberObd == ""){
      alert('您还有未填写项目')
    }else{
      console.log(selectedCarId,kilometers,numberObd)
      axios({
        method: 'post',
        url: "/api/baoyang/update-licheng",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
          car_id:selectedCarId,
          licheng:kilometers,
          obd:numberObd, 
        })
      }).then(function (response) {
        console.log(response.data.msg);
        alert(response.data.msg)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  getMaintainList(id){
    const that = this
    axios({
      method: 'get',
      url: "/api/baoyang/index",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        car_id:id
      }
    }).then(function (response) {
      console.log(response.data.data.list);
      that.setState({
        itemArr: response.data.data.list
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  clickHandler(e) {
    var phone = this.props.form.getFieldValue('phone');
    var pwd = this.props.form.getFieldValue('password');
  }

  clkMaintainItem(item){
    console.log(item)
    // var currentTarget = e.currentTarget;
    if(item.is_set == 1){
      window.location.href = `/maintaincar.html?last_licheng=${item.last_licheng}&&last_date=${item.last_date}&&zhouqi=${item.zhouqi}&&name=${item.name}&&carId=${this.state.selectedCarId}&&typeId=${item.id}`
    }else{
      window.location.href = `/maintaincar.html?name=${item.name}&&carId=${this.state.selectedCarId}&&typeId=${item.id}`
    }
   
    // alert(currentTarget.firstChild.innerHTML);
  } 
  clkGo2Main(e){
    alert('去保养');
  }
  clkContactBiz(e){
    alert('联系客服');
  }

  render() {
    const { getFieldProps ,getFieldValue} = this.props.form;
    return (
        <div className="wrapper">
            <Header place = '北京' title = '保养' codeShow = {true}/>
            {this.state.carList&&this.state.carList.length==0?
                <div id="noCar">
                    <p className="addCarTip">暂无车辆信息,<br></br>需要添加车辆，才能保养哦~</p>
                    <Button type="primary" className="addCar" onClick={()=>window.location.href = '/addcar.html'}>去添加</Button>
                </div>:
            <section>
                <div className="car-detail">
                    <div style = {{width:'100%', display: 'flex'}}>
                        <div style = {{flex:'1',display:'flex',lineHeight:'80px'}}>
                            <img className = 'carImg' style = {{width:'60px',height:'60px',margin:'10px 16px 0 0', display: 'flex'}} src={this.state.selectedCarImg} alt=""/>
                            <div>{this.state.selectedCarName}</div>
                        </div>
                        <div style = {{flex:'1'}} className="shopListFiter">
                            <Icon type="down" className="icon" />
                            <select name="" id="" style = {{width: '100%'}}   defaultValue = ''  onChange = {this.selectCar.bind(this)} >
                                {/* <option style = {{height: "80px",fontSize:'14px'}} value= '' >请选择</option> */}
                                {
                                this.state.carList.map( (item, index) => {
                                    return (
                                        <option style = {{height: "80px",fontSize:'14px'}} key = {item.id} value= {item.id} >{item.brand}</option>
                                    )
                                }) 
                                }
                                
                            </select>
                        </div>
                    </div>
                    <div  style = {{width:'100%', display: 'flex'}} className="detailBox">
                        <div className="name">公里数：</div>
                        <div className="input">
                            <input type="number" placeholder = '请输入公里数' onChange = {this.getKilometers.bind(this)}/>
                        </div>
                    </div>
                    <div  style = {{width:'100%', display: 'flex'}} className="detailBox">
                        <div className="name">OBD编号：</div>
                        <div className="input"><input type="number" onChange = {this.getNumberObd.bind(this)} placeholder = '请输入OBD编号'/></div>
                    </div>
                    <Button style = {{marginBottom: '15px', marginTop: '40px'}} type="ghost" onClick={this.sendChange.bind(this)}>确认修改</Button>
                </div>
                <div className="maintain-shop-line">
                    <span className="maintain-shop txt">提示:可以点击进度条设定保养周期!</span>
                </div>
                <ul className="maintain-items">
                    {
                        this.state.itemArr.map((item,index)=>{
                            var color='';
                            if(item.red==1){
                                color="red process-container";
                            }else{
                                color="green process-container";
                            }
                            return(
                                <li key={index} className="m-item" onClick={this.clkMaintainItem.bind(this, item)}>
                                  {
                                    item.is_set === 1 ?<span className="lbl-txt">{item.name}(<i className="lbl-num">{item.percent}</i>)</span>:<span className="lbl-txt">{item.name}</span>
                                  }
                                    
                                    <div className={color}>
                                    {
                                      item.is_set === 1 ?
                                        <div className="process-main">
                                          <div className="process-sub" style={{width:item.percent === 0?1:item.percent}}></div>
                                          <em className="num-show">{item.percent}</em>
                                        </div>
                                      :
                                        <div style = {{lineHeight:'100%', textAlign:'center'}} className="process-main">
                                          点击进行设置
                                        </div>
                                    }
                                        
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <WhiteSpace />
                <CarTabBar/>
            </section>
            }
            {/***<section className="btn-area">
                <Button className="btn lt" inline  onClick={this.clkGo2Main.bind(this)} type="ghost">保养</Button>
                <Button className="btn rt" inline  onClick={this.clkContactBiz.bind(this)} type="primary">联系商家</Button>
            </section>**/}
            <CarTabBar chosen = 'maintenanceTab'/>
      </div>
    );
  }
}
const App1 = createForm()(App);
ReactDOM.render(<App1 />, document.querySelector('#divId'));


