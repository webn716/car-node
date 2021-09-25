import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
import axios from 'axios'
import qs from 'qs' 

import { List, Carousel, Button , InputItem, Grid, Card, Flex, ListView, WhiteSpace, WingBlank, NavBar, Picker, Icon, SearchBar} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;


import CarTabBar from '../CarTabBar';
import Header from '../Header'
let globalData = require('../script/req');
require('../iconfont/iconfont.css');


// import { Select } from 'antd';
import Select from 'antd/lib/Select'
const Option = Select.Option;


const path = require('path');

require('./index.css');

let throttle;//函数节流使用

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

      selectTypeList:[],
      selectConditionList:[],

      busiList:[],
      value:""
    }
  }

  componentDidMount() {
    var that = this
    console.log(globalData.getUrlParam('name'))
    console.log(globalData.getUrlParam('keyWord'))
    // 接受app传递的 地点 经纬度 然后进行更新  在回调里面 执行函数
    this.setState({
      longitude: java.getLocation()[0],
      Latitude:java.getLocation()[1],
      keyWord:globalData.getUrlParam('keyWord'),
      value:globalData.getUrlParam('keyWord'),
    },()=>{
      const {longitude, Latitude, type, condition, keyWord ,page} = that.state
      this.getBusinessList(longitude, Latitude, type, condition, keyWord ,page)
    })
    this.getSelectList()
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
  onSubmit(val){
    const that = this
    this.setState({
      keyWord:val,
      businessList:[],
      page:1,
      isLoadingShow:"block",
    },()=>{
      const {longitude, Latitude, type, condition, keyWord ,page} = that.state
      that.getBusinessList(longitude, Latitude, type, condition, keyWord ,page)
    })
  }
  onCancel(){
    this.setState({
      value:""
    })
  }


  render() {
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    return (
      <div className="wrapperGrey">
      <div id = 'container'></div>
          <Header place = '北京' title = '商家列表' codeShow = {true}/>
          <SearchBar placeholder="搜索" value={this.state.value} onChange={(e) => this.setState({ value: e }) }  onSubmit={this.onSubmit.bind(this)} onCancel={this.onCancel.bind(this)} />
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
          <CarTabBar chosen="businessTab"/>
      </div>
    );
  }
}
const ApplWrapper = createForm()(App);
ReactDOM.render(<App />, document.querySelector('#divId'));
