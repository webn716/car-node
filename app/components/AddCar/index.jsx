import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import qs from 'qs'

import { Button , List, InputItem, WhiteSpace,WingBlank,Picker,Toast} from 'antd-mobile';
import { district, provinceLite as province } from 'antd-mobile-demo-data';
import Header from '../Header'

import { createForm } from 'rc-form';
import CarTabBar from '../CarTabBar';

var path = require('path');

require('./index.css');
require('../iconfont/iconfont.css');

const cashtypedata = [{
  'label':'现金',
  'key':'1',
  'value':'money'
},
{'label':'手机支付',
  'key':'2',
  'value':'bytel'
},];
const mockType = {
  "err": "0",
  "data": [
  {
    "initial": "A",
    'detail':[{
      "id": "1",
      "name": "奥迪",
      "logo": "alipay.png"
    },{
      "id": "2",
      "name": "阿斯顿·马丁",
      "logo": "alipay.png"
    },{
      "id": "23",
      "name": "阿斯顿·马丁",
      "logo": "alipay.png"
    },{
      "id": "24",
      "name": "阿斯顿·马丁",
      "logo": "alipay.png"
    },{
      "id": "25",
      "name": "阿斯顿·马丁",
      "logo": "alipay.png"
    },{
      "id": "266",
      "name": "阿斯顿·马丁",
      "logo": "alipay.png"
    },{
      "id": "3",
      "name": "阿尔法·罗密欧",
      "logo": "alipay.png"
    },{
      "id": "4",
      "name": "AC Schnitzer",
      "logo": "alipay.png"
    },{
      "id": "5",
      "name": "Artega",
      "logo": "alipay.png"
    },{
      "id": "6",
      "name": "奥克斯",
      "logo": "alipay.png"
    }
    ,{
      "id": "61",
      "name": "奥克斯",
      "logo": "alipay.png"
    }
    ,{
      "id": "62",
      "name": "奥克斯",
      "logo": "alipay.png"
    }
    ,{
      "id": "63",
      "name": "奥克斯",
      "logo": "alipay.png"
    }
    ,{
      "id": "64",
      "name": "奥克斯",
      "logo": "alipay.png"
    }
    ,{
      "id": "65",
      "name": "奥克斯",
      "logo": "alipay.png"
    }
    ,{
      "id": "66",
      "name": "奥克斯",
      "logo": "alipay.png"
    }
    ,{
      "id": "67",
      "name": "奥克斯",
      "logo": "alipay.png"
    }
    ,{
      "id": "68",
      "name": "奥克斯",
      "logo": "alipay.png"
    }
    ,{
      "id": "69",
      "name": "奥克斯",
      "logo": "alipay.png"
    }]
  },{
    "initial": "B",
    'detail':[{
      "id": "7",
      "name": "奔驰",
      "logo": "alipay.png"
    },{
      "id": "8",
      "name": "宝马",
      "logo": "alipay.png"
    }]
  },{
    "initial": "K",
    'detail':[{
      "id": "9",
      "name": "凯迪拉克",
      "logo": "alipay.png"
    }]
  }]
}
const mockDetail = {
  "err": "0",
  "data": [
  {
    "initial": "一汽",
    'detail':[{
      "name": "奥迪1",
      "logo": "alipay.png"
    },{
      "id": "2",
      "name": "奥迪2",
      "logo": "alipay.png"
    },{
      "id": "3",
      "name": "奥迪3",
      "logo": "alipay.png"
    },{
      "id": "4",
      "name": "奥迪4",
      "logo": "alipay.png"
    },{
      "id": "5",
      "name": "奥迪5",
      "logo": "alipay.png"
    },{
      "id": "6",
      "name": "奥迪5",
      "logo": "alipay.png"
    },{
      "id": "51",
      "name": "奥迪5",
      "logo": "alipay.png"
    },{
      "id": "52",
      "name": "奥迪5",
      "logo": "alipay.png"
    },{
      "id": "53",
      "name": "奥迪5",
      "logo": "alipay.png"
    },{
      "id": "54",
      "name": "奥迪5",
      "logo": "alipay.png"
    },{
      "id": "55",
      "name": "奥迪5",
      "logo": "alipay.png"
    }]
  },{
    "initial": "上汽",
    'detail':[{
      "id": "7",
      "name": "奥迪A",
      "logo": "alipay.png"
    },{
      "id": "8",
      "name": "奥迪B",
      "logo": "alipay.png"
    }]
  },{
    "initial": "山寨",
    'detail':[{
      "id": "9",
      "name": "奥迪999",
      "logo": "alipay.png"
    },{
      "id": "91",
      "name": "奥迪999",
      "logo": "alipay.png"
    },{
      "id": "29",
      "name": "奥迪999",
      "logo": "alipay.png"
    },{
      "id": "93",
      "name": "奥迪999",
      "logo": "alipay.png"
    }]
  }]
}

let myTimer;
class App extends React.Component {
  
  constructor() {
    super() ;
    this.state = {
      //当出现三级菜单是  外层滚动情况
      isScroll:'auto',
      carDetail:'',
      currentType: '',
      currentCar: '',
      carType:[],
      carList:[],
      isAddListShow:'block',
      isTypeListShow:'none',
      isSelectShow:'none',
      selectCar:'',
      letterArr:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      butControl:false

    }
  }
  componentDidMount(){
    this.getCarType()
  }
  getCarType(){
    var that = this;
    axios({
      method: 'get',
      url: "/api/car/brand",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
      })
    }).then(function (response) {
      console.log(response.data.data);
      that.setState({
        carType: response.data.data,
      });
      console.log(that.state.carType)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getCarList(id){
    var that = this;
    axios({
      method: 'get',
      url: "/api/car/brandchild",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        id:id
      }
    }).then(function (response) {
      console.log(response.data.data);
      that.setState({
        carList:response.data.data,
        isSelectShow:'block',
        isScroll:'hidden',
      });
      console.log(that.state.carList)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  setTypeListShow(){
    this.setState({
      isSelectShow:'none',
      isTypeListShow:'block',
      isAddListShow:'none',
      isScroll:'auto',
    })
  }
  setCurrentType(detail,type,event){
    const that = this
    console.log(detail)
    console.log(type)
    console.log(event)
    console.log(detail.logo)
    console.log(detail.name)
    console.log(123)
    this.setState({
      carDetail:detail
    },() => {
      that.getCarList(detail.id)
      
    })
  }
  setSelectCar(detail,event){
    // event.stopPropagation()
    console.log(detail)
    this.setState({
      isSelectShow:'none',
      isTypeListShow:'none',
      selectCar:detail,
      isAddListShow:'block',
      isScroll:'auto',
    })

    
  }
  hidepop(e){
    console.log(313)
    this.setState({
      isSelectShow:'none',
      isTypeListShow:'block',
      selectCar:'',
      isAddListShow:'none',
      isScroll:'auto',
    })
  }
  clickHandler(e) {
    var phone = this.props.form.getFieldValue('phone');
    var pwd = this.props.form.getFieldValue('password');
    
  }
  clkMaintainRecord(e) {
    const that = this 
    // clearInterval(myTimer)
    // myTimer = setTimeout(()=>{
      //除了品牌的所有参数
      console.log( that.props.form.getFieldsValue())
      //汽车品牌的参数
      console.log(that.state.selectCar)
      if(!that.state.selectCar || !that.props.form.getFieldsValue().carNumber || !that.props.form.getFieldsValue().carColor
        || !that.props.form.getFieldsValue().carDistance || !that.props.form.getFieldsValue().carLastExaminationDate 
        || !that.props.form.getFieldsValue().carYearLimit || !that.props.form.getFieldsValue().carInsuranceStartDate){
        Toast.info('您还有信息未填写', 1);
      }else{
        that.setState({
          butControl:true
        },()=>{
          axios({
            method: 'post',
            url: "/api/car/add",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
              brand: that.state.selectCar.fullname,//品牌
              plate_number: that.props.form.getFieldsValue().carNumber,//车牌
              color: that.props.form.getFieldsValue().carColor,//颜色
              licheng: that.props.form.getFieldsValue().carDistance,//里程
              chejian_date:that.props.form.getFieldsValue().carLastExaminationDate,//上次检车日期
              chejian_cycle:that.props.form.getFieldsValue().carYearLimit,//年限
              chexian_date:that.props.form.getFieldsValue().carInsuranceStartDate,//保险起始日
              engine_number:that.props.form.getFieldsValue().engineNumber,//发动机号
              chassis_number:that.props.form.getFieldsValue().chassisNumber,//车架号
              reg_year:that.props.form.getFieldsValue().carRegisterDate,//登记日期
            })
          }).then(function (response) {
                if(response.data.err==0){
                  Toast.success('添加成功', 1);
                  window.location.reload()
                }else{
                  Toast.fail(response.data.msg+'!!!', 1);
                  window.location.reload()
                }
          })
          .catch(function (error) {
            console.log(error);
          });
        })
       
      }
    // },500)
   
  } 
  clkSure(e) {
    alert('确定');
  } 
  clkCancel(e) {
    alert('取消');
  }

  render() {
    const { getFieldProps ,getFieldValue} = this.props.form;
    return (
      <div className="wrapper" style = {{width:'100%',height:'100%'}}>
          <Header place = '北京' title = '添加新车' codeShow = {true} style = {{position:'fixed',top:'0px',left:'0px'}}/>
          <div style = {{display: this.state.isAddListShow}}>
            <div>
              {/* <Picker data={district2} cols={1} {...getFieldProps('district3')} className="forss">
              
              </Picker> */}
              {/* <List.Item onClick={this.setTypeListShow.bind(this)}  className="mandatory-item" arrow="horizontal" title="品牌">品牌</List.Item> */}
              <div style = {{display:'flex',height: '88px',paddingLeft: '30px',paddingRight: '30px',fontSize:"34px",color:'#000',lineHeight:'88px'}}>
                <div className="mandatory-item" style = {{textAlign:"left",flex:'1'}}>品牌</div>
                <div style = {{textAlign:"right",flex:"1"}} onClick={this.setTypeListShow.bind(this)}>{this.state.selectCar == ''?'>':this.state.selectCar.fullname}</div>
              </div>
              <List>
                <InputItem  className="mandatory-item" {...getFieldProps('carColor')} clear>颜色</InputItem>
                <InputItem className="mandatory-item"  {...getFieldProps('carNumber')} clear>车牌号</InputItem>
                <InputItem className="mandatory-item"  {...getFieldProps('carDistance')} clear type="number" extra="公里">当前里程</InputItem>
                <InputItem className="mandatory-item"  {...getFieldProps('carLastExaminationDate')} clear type="date">上次验车日期</InputItem>
                <InputItem className="mandatory-item"  {...getFieldProps('carYearLimit')} clear type="number" extra="年">年限</InputItem>
                <InputItem className="mandatory-item"  {...getFieldProps('carInsuranceStartDate')} clear type="date">保险起始日期</InputItem>
                <InputItem {...getFieldProps('engineNumber')} clear>发动机号</InputItem>
                <InputItem {...getFieldProps('chassisNumber')} clear>车架号</InputItem>
                <InputItem {...getFieldProps('carRegisterDate')} clear type="date">登记日期</InputItem>
              </List>
              <WhiteSpace />
              <CarTabBar/>
            </div>
            <section className="btn-area">
                {/* <Button className="btn lt" inline onClick={this.clkCancel.bind(this)} >取消</Button> */}
                <Button  disabled = {this.state.butControl} className="btn mid" inline onClick={this.clkMaintainRecord.bind(this)} type="ghost">确认添加</Button>
                {/* <Button className="btn rt" inline onClick={this.clkSure.bind(this)} >确定</Button> */}
            </section>
          </div>
          {/* <div style = {{display:this.state.isTypeListShow, position:'absolute', zIndex:'1',left:'0',top:'0'}}> */}
          <div style = {{display:this.state.isTypeListShow, position:'relative',padding:'20px 0 0px 0',boxSizing:'border-box',height:'calc(100% - 90px)', overflow:this.state.isScroll}}>
            {
              this.state.carType.map((item,index)=>{
                return(
                  <div key = {index}>
                    <div style={{"borderBottom":"1px solid #ccc","lineHeight":"60px","padding":"0 30px"}}><a style={{"color":"#aaa"}} name={item.initial}>{item.initial}</a></div>
                    {/* <a href={`#${item.initial}`}>12312312</a> */}
                    <ul key = {item.initial} style = {{width: '100%', listStyle: 'none', padding: '0'}}>
                      {
                        item.detail.map((carDetail, index) => {
                          return(
                            <li key = {carDetail.id} onClick = {this.setCurrentType.bind(this, carDetail, item.initial)} style = {{display: 'flex', height: '100px', borderBottom: '1px solid #ccc', lineHeight: '100px', paddingRight: '40px',paddingLeft: '40px', boxSizing: 'border-box'}}>
                              <div><img src={carDetail.logo} alt=""/></div>
                              <div>{carDetail.name}</div>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  
                )
              })
            }
            <div style = {{ position:'fixed', top:'0', right:'0',marginTop:"100px",  zIndex:'2','textAlign':'center'}}>
              {
                this.state.letterArr.map((item,index)=> {
                  return (
                      <div key={index} style={{'width':'60px',height:"40px"}}>
                        <a href={"#"+item} style={{ 'color': '#333','lineHeight': '20px','display':'inline-block'}}>{item}</a><br />
                      </div>
                  )
                })
              }
            </div>
            <div style = {{ display :this.state.isSelectShow, position:'fixed', top:'90px', right:'0',width:'100%',zIndex:'3',height:'100%',padding:'0px 0',boxSizing:'border-box'}}>
              <div style={{"width":"85%",height:'100%',float:"right",'height':'100%',overflow:'auto',paddingBottom:'200px',boxSizing:'border-box',background:'#fff','boxShadow':'rgba(146, 146, 146, 0.4) -16px -2px 30px'}}>
                <div style={{"paddingLeft":"40px","lineHeight":'100px'}}><img style={{"width":"60px","display":"inline-block","marginRight":"10px"}} src={this.state.carDetail.logo} alt=""/>{this.state.carDetail.name}</div>
                {
                  this.state.carList.map((item,index)=>{
                    return(
                      <div key = {index}>
                        <div style={{"background": "#eee","paddingLeft":"20px","lineHeight":"100px"}}>{item.initial}</div>
                        <ul style={{'padding':'0','margin':'0'}}>
                          {
                            item.detail.map((detail,index)=>{
                              return(
                                <li style={{'listStyleType':'none','lineHeight':'100px','borderBottom':'1px solid #ccc','paddingLeft':'40px'}} onClick = {this.setSelectCar.bind(this,detail)} key = {index}>{detail.name}</li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  })
                }
              </div>
              <div style={{background:"rgba(0,0,0,0)",width:'100%',zIndex:'3','height':'100%'}}  onClick = {this.hidepop.bind(this)}></div>
            </div>
          </div>
          <CarTabBar/>
      </div>
     
    );
  }
}
const App1 = createForm()(App);
ReactDOM.render(<App1 />, document.querySelector('#divId'));