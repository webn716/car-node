import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
import axios from 'axios'
axios.defaults.withCredentials=true;//让ajax携带cookie
import qs from 'qs' 

import { Carousel, WhiteSpace, WingBlank,Grid,ListView, Card, Flex, NavBar, Button, List, InputItem,Toast,SearchBar} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

// import { Icon } from 'antd';
// import { Select } from 'antd';
import Icon from 'antd/lib/Icon'
import Select from 'antd/lib/Select'
let globalData = require('../script/req');
require('../iconfont/iconfont.css');



const Option = Select.Option;

// import List from '../List';
import CarTabBar from '../CarTabBar';
import SearchBarHeader from '../SearchBarHeader';
import Header from '../Header'

const path = require('path');

require('./index.css');

// multible box begin 
const arrMultibleName=['保养','加油管理','我要修车','汽车美容','分享','积分商城','车险','违章查询','知识窗','买卖二手车'];
const arrMultibleIcon=[ './../../../images/alipay.png',
                        'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
                        'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                        'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
                        'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
                        'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                        'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
                        'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
                        'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                        'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
                      ];
const data = Array.from(new Array(10)).map((_val, i) => ({
  icon: arrMultibleIcon[i],
  text: arrMultibleName[i],
}));


let throttle;//函数节流使用

// 本地数据
const  mockBusinessList = [
  {
    "id": "1",
    "brand": "商家1",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "3km"
  },
  {
    "id": "2",
    "brand": "商家2",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "2.3km"
  },
  {
    "id": "3",
    "brand": "商家3",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "3km"
  },
  {
    "id": "4",
    "brand": "商家4",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "5km"
  },
  {
    "id": "5",
    "brand": "商家5",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "3km"
  },
  {
    "id": "6",
    "brand": "商家6",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "3.8km"
  },
  {
    "id": "7",
    "brand": "商家7",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "1km"
  },
  {
    "id": "8",
    "brand": "商家8",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "5km"
  },
  {
    "id": "9",
    "brand": "商家9",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "4km"
  },
  {
    "id": "10",
    "brand": "商家10",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "2km"
  },
]
const mockCarList = [
  {
    "id": "1",
    "brand": "大众宝来1",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "京F S95D11"
  },
  {
    "id": "2",
    "brand": "大众宝来2",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "京F S95D12"
  },
  {
    "id": "3",
    "brand": "大众宝来3",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "京F S95D13"
  },
  {
    "id": "4",
    "brand": "大众宝来4",
    "brand_logo": "http://api.car.yipiantian.cn/upload/brand/dazhong.png",
    "plate_number": "京F S95D14"
  },
]
const mockSelectType = [
  '类型1','类型2','类型3','类型4','类型5'
]
const mockSelectRange = [
  '10km','20km','30km','40km','50km'
]
var x=document.getElementById("demo");
class App extends React.Component {
  
  constructor() {
    super() ;
    this.state = {
      data1: [],
      data2: [],
      initialHeight: 200,
      disabled: false,
      businessList:[],

      longitude:116.433094,
      Latitude:39.912363,
      type: '',
      condition:'',
      keyWord:'',
      page:1,
      isLoadingShow:"block",

      carList: [],
      selectCarMessage:{},
      selectedCarId:'',
      selectedCarName:'',
      selectedCarImg:'',
      kilometers:'',
      numberObd:"",
      selectTypeList:[],
      selectConditionList:[],
    }
  }

  componentDidMount() {
    var that = this
    console.log(globalData.getUrlParam('name'))
    
    // 接受app传递的 地点 经纬度 然后进行更新  在回调里面 执行函数
    this.setState({
      longitude:116.433094,
      Latitude:39.912363,
    })
    document.cookie=`longitude=${this.state.longitude}`;
    document.cookie=`Latitude=${this.state.Latitude}`;
    const {longitude, Latitude, type, condition, keyWord ,page} = that.state
    this.getBusinessList(longitude, Latitude, type, condition, keyWord ,page)
    this.getAllAdd()
    this.getMineAdd()
    this.getCarList()
    this.getSelectList()
    // this.getSelectRange()


    // simulate img loading  for slider
    // var that = this;
    // setTimeout(function() {
    //   that.setState({
    //     data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'AiyWuByWklrrUDlFignR'],
    //   });
    // }, 100);
  }
  //参数 页码 每页多少条 经度 维度
  getBusinessList(longitude = '', Latitude = '', type = '', condition = '', keyWord = '', page = ''){
    console.log(longitude)
    console.log(Latitude)
    console.log(type)
    console.log(condition)
    console.log(page)
    var that = this;
    axios({
      method: 'get',
      url: "/api/business/list",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        longitude:longitude,
        latitude:Latitude,
        type:type,
        condition:condition,
        keyWord:keyWord,
        page:page,
      }
     
    }).then(function (response) {
          if(that.state.page >= response.data.data.count_page){
            that.setState({
              isLoadingShow:"none",
              businessList: that.state.businessList.concat(response.data.data.list),

            })
          }else{
            if(response.data.data.list&&response.data.data.list.length>0){
              that.setState({
                businessList: that.state.businessList.concat(response.data.data.list),
              });
            }
          }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getAllAdd(){
    var that = this;
    axios({
      method: 'post',
      url: "/api/site/ads",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
      })
    }).then(function (response) {
      console.log('=================')
      console.log(response)
      that.setState({
        data1: response.data.data.business_list,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getMineAdd(){
    var that = this;
    axios({
      method: 'post',
      url: "/api/site/ads",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
      })
    }).then(function (response) {
      that.setState({
        data2: response.data.data.ad_list,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
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
      console.log(response.data.data);
      that.setState({
        carList: response.data.data,
        selectedCarId:response.data.data[0].id,
        selectedCarName:response.data.data[0].brand,
        selectedCarImg:response.data.data[0].brand_logo,
        // carList:mockCarList
      });
      // console.log(that.state.carList)
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
      this.state.carList.map((item)=>{
        if(event.target.value == item.id){
          this.setState({
            selectedCarName:item.brand,
            selectedCarImg:item.brand_logo,
            selectedCarId:item.id,
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
      Toast.info('您还有未填写项目', 1);
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
            if(response.data.err==0){
              Toast.success('保存成功 !!!', 1);
            }else{
              Toast.fail(response.data.msg+'!!!', 1);
            }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  getSelectList(){
    var that = this;
    axios({
      method: 'post',
      url: "/api/business/filter-data",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
      })
    }).then(function (response) {
      that.setState({
        selectTypeList:response.data.data.type,
        selectConditionList:response.data.data.condition,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onSubmit(val){
    window.location.href = '/businessList.html?keyWord='+val;
  }
  selectType(event){
    const that = this
    // this.refs.conditionFilter.value = ''
    this.setState({
      type : that.refs.typeFilter.value,
      businessList:[],
      // condition:'',
      page:1,
      isLoadingShow:"block",
    },()=>{
      const {longitude, Latitude, type, condition, keyWord ,page} = that.state
      that.getBusinessList(longitude, Latitude, type, condition, keyWord ,page)
    })
    
  }
  
  selectRange(event){
    const that = this
    // this.refs.typeFilter.value = ''
    this.setState({
      condition : that.refs.conditionFilter.value,
      businessList:[],
      // type:'',
      page:1,
      isLoadingShow:"block",
    },()=>{
      const {longitude, Latitude, type, condition, keyWord ,page} = that.state
      that.getBusinessList(longitude, Latitude, type, condition, keyWord ,page)
    })
    
  }
  
  loadingMore(){
    const that = this
    clearTimeout(throttle)
    throttle = setTimeout(()=>{
      that.setState({
        page:that.state.page + 1
      },()=>{
        const {longitude, Latitude, type, condition, keyWord ,page} = that.state
        that.getBusinessList(longitude, Latitude, type, condition, keyWord ,page)
      })
    },500)
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  clkDisplayItems(obj,index){
    alert(obj.text);
  }



  render() {
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    // const { getFieldProps } = this.props.form;
    // const { type } = this.state;
    return (
      <div className="wrapperGrey">
      <div id = 'container'></div>
          <Header place = '北京' title = '首页' codeShow = {true}/>
        <SearchBar placeholder="搜索" onChange={(e) => this.setState({ value: e }) }  onSubmit={this.onSubmit.bind(this)} />
         {
           this.state.data1.length == 0?
           null
           :
           <WingBlank>
           <Carousel
             className="my-carousel1" autoplay={true} infinite selectedIndex={0}
             // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
             // afterChange={index => console.log('slide to', index)}
           >
             {this.state.data1.map(item => (
               <a  href={item.link} key={item.cid} style={hProp}>
                 <img
                   src={item.path}
                   onLoad={() => {
                     // fire window resize event to change height
                     window.dispatchEvent(new Event('resize'));
                     this.setState({
                       initialHeight: null,
                     });
                   }}
                 />
               </a>
             ))}
           </Carousel>
         </WingBlank>
         }
         

          {/* <section className="blackboard flex-container">
              <div className="lf-part sub-flex-ave">
                  <div className="circle">
                      <span className="up-txt">星期五</span>
                      <span className="down-txt">0限5</span>
                  </div>
                  <span className="district">北京市</span>
              </div>
              <div className="middle-part sub-flex-ave">
                  <span className="up-line">京P 55555</span>
                  <div className="down-line">
                     <span className="label">当前<br/>行程</span>
                     <span className="distance">0012345</span>
                     <span className="btn-update">更新<br/>里程</span>
                  </div>
                  
              </div>
              <div className="rt-part sub-flex-ave">
                  <div className="circle">
                      <span className="up-color"></span>
                      <span className="down-color"></span>
                      <span className="health-value">85</span>
                  </div>
                  <span className="health">健康度</span>
              </div>
          </section> */}
          <div>
             <Grid data={data} columnNum={5} hasLine={false} onClick={this.clkDisplayItems.bind(this)}/>
          </div>
          {
            this.state.data2.length == 0?
            null
            :
            <WingBlank>
           
            <Carousel
              className="my-carousel2" autoplay={true} infinite selectedIndex={0} dots = {false}
              // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              // afterChange={index => console.log('slide to', index)}
            >
              {this.state.data2.map(item => (
                <div>
                  <div style = {{color:'inherit',marginLeft:'20px'}}>{item.name}提醒您</div>
                  <a href={item.link} key={item.cid} style={{height:150}}>
                    <img
                      src={item.path}
                      onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({
                          initialHeight: null,
                        });
                      }}
                    />
                  </a>
                </div>
              ))}
            </Carousel>
          </WingBlank>
          }
         

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
          {/* <section className="activity-area">优惠专区</section> */}
          {/* <List/> */}
          
          <div style = {{display: 'flex'}}>
              <div style = {{flex:'1'}} className="shopListFiter">
                  <Icon type="down" className="icon" />
                  <select ref='typeFilter' name="" id="" defaultValue = '' onChange = {this.selectType.bind(this)}>
                      <option style = {{height: "80px",fontSize:'14px'}}  value=''>全部</option>
                     {
                        this.state.selectTypeList.map((item, index) => {
                          return(
                            <option style = {{height: "80px",fontSize:'14px'}} key = {index} value={item.value}>{item.name}</option>
                          )
                        })
                     }
                  </select>
              </div>
              <div style = {{flex:'1'}} className="shopListFiter">
                  <Icon type="down"  className="icon" />
                  <select ref='conditionFilter' name="" id="" style = {{flex:'1'}} defaultValue="" onChange = {this.selectRange.bind(this)}>
                      <option style = {{height: "80px",fontSize:'14px'}} value=''>全部</option>
                    {
                      this.state.selectConditionList.map((item, index) => {
                        return(
                          <option style = {{height: "80px",fontSize:'14px'}} key = {index} value={item.value}>{item.name}</option>
                        )
                      })
                    }
                  </select>

              </div>
          </div>

          <div>
            <List className="my-list">
              {
                this.state.businessList && this.state.businessList.length==0 ?
                  <div key="nodata" id='noDataGrey'>暂无数据</div>
                  :
                  <div>
                    {
                      this.state.businessList.map((item, index) => {
                        return(
                          <Item key = {index} onClick = {()=>{window.location.href = `/businessDetail.html?id=${item.id}`}} extra={`${item.distance}km`} align="top" thumb={item.img} multipleLine>
                            {item.name}
                            <Brief>{item.detail}</Brief>
                          </Item>
                        )
                      })
                    }
                     <div style = {{'textAlign': 'center','padding':'16px 0',display:this.state.isLoadingShow}} onClick = {this.loadingMore.bind(this)}>点击加载更多...</div>
                  </div>
              }
            </List>
           
          </div>
          <CarTabBar chosen="indexTab"/>
      </div>
    );
  }
}
const ApplWrapper = createForm()(App);
ReactDOM.render(<App />, document.querySelector('#divId'));
