import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import qs from 'qs'

import { Button , List, InputItem, WhiteSpace,WingBlank,NavBar,Picker,Toast} from 'antd-mobile';

import { createForm } from 'rc-form';
import CarTabBar from '../CarTabBar';
import Header from '../Header'

// import { Upload, Icon } from 'antd';
// import { Icon } from 'antd';
// import { Select } from 'antd';
import Icon from 'antd/lib/Icon'
import Upload from 'antd/lib/Upload'

var path = require('path');
var dataReq = require('../script/req');

require('./index.css');
require('../iconfont/iconfont.css');

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    console.log(file)
    var isJPG=false;
    if(file.type === 'image/jpeg'||file.type === 'image/png'){
        isJPG=true;
    }
    if (!isJPG) {
        Toast.fail('只可以上传jpg、png!');
    }
    const isLt2M = file.size / 1024 < 500;
    if (!isLt2M) {
        Toast.fail('文件小于500k!');
    }
    return isJPG && isLt2M;
}


const cashtypedata = [{
  'label':'现金',
  'key':'1',
  'value':'现金'
},
{'label':'手机支付',
  'key':'2',
  'value':'手机支付'
},];
const district2 = [{
        'label':'大众',
        'key':'1',
        'value':'dazhong'
    },
    {
       'label':'起亚',
        'key':'2',
        'value':'qiya'
    },
    {
       'label':'丰田',
        'key':'3',
        'value':'fengtian'
    },
    {
       'label':'奥迪',
        'key':'4',
        'value':'aodi'
    },
    {
       'label':'宝马',
        'key':'5',
        'value':'baoma'
    },
    {
       'label':'本田',
        'key':'6',
        'value':'bentian'
    },
    {
       'label':'福特',
        'key':'7',
        'value':'fute'
    },
    {
       'label':'现代',
        'key':'8',
        'value':'xiandai'
    },
    {
       'label':'标志',
        'key':'9',
        'value':'biaozhi'
    },
    {
       'label':'奔驰',
        'key':'10',
        'value':'benchi'
    },
    {
       'label':'别克',
        'key':'11',
        'value':'bieke'
    },
    {
       'label':'长安',
        'key':'12',
        'value':'changan'
    },
    {
       'label':'雪弗莱',
        'key':'13',
        'value':'xufulai'
    }];

const mockBusiType = ['维修','保养','钣金喷漆','洗车','汽车装饰','美容','轮胎','补胎']

const mockServiceType = ['维修','保养','钣金喷漆','洗车','汽车装饰','美容','轮胎','补胎']

let currentSelectBusiType = []
let currentSelectServiceType = []
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
      btnControl:false
    }
  }
    handleChange(info){
        console.log(info)
        const that = this
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file.response)

// Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => that.setState({
                imageUrl,
                loading: false,
                businessImg:info.file.response.data
            }));
        }
    }
  componentDidMount(){
    this.getBusiType()
    this.getServiceType()
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
  clickHandler(e) {
    var phone = this.props.form.getFieldValue('phone');
    var pwd = this.props.form.getFieldValue('password');
    
  }
  getBusiType(){
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
      // console.log(response.data.data);
      that.setState({
        busiType: mockBusiType,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getServiceType(){
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
      // console.log(response.data.data);
      that.setState({
        selectServiceType: currentSelectServiceType,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  seletcBusiType(event){
    console.log(event.target.checked)
    console.log(event.target.value)
    if(event.target.checked){
        currentSelectBusiType.push(event.target.value)
        console.log(currentSelectBusiType)
    }else{
      currentSelectBusiType.map((item,index)=>{
        if(event.target.value == item){
          currentSelectBusiType.splice(index,1)
        }
      })
    }
    //商家服务类型参数
    console.log(currentSelectBusiType)
  }
  
  seletcServiceType(event){
    console.log(event.target.checked)
    console.log(event.target.value)
    if(event.target.checked){
      currentSelectServiceType.push(event.target.value)
        console.log(currentSelectServiceType)
    }else{
      currentSelectServiceType.map((item,index)=>{
        if(event.target.value == item){
          currentSelectServiceType.splice(index,1)
        }
      })
    }
    //服务类型参数
    console.log(currentSelectServiceType)
  }
  clkSaveAndNext(e){
    var that = this;
    // 除了checkbox的所有参数
      console.log(that.state.businessImg.url)
    console.log(this.props.form.getFieldsValue())
    console.log(this.props.form.getFieldsValue().endDate == undefined)
    //服务类型参数
    console.log(currentSelectServiceType)
    //商家服务类型参数
    console.log(currentSelectBusiType !== [])   
    if(
      // currentSelectBusiType.length !== 0
      currentSelectBusiType.length == 0 || 
      currentSelectServiceType .length == 0 || 
      this.props.form.getFieldsValue().busiName == undefined ||
      this.props.form.getFieldsValue().busiSortName == undefined || 
      this.props.form.getFieldsValue().serviceBrand == undefined ||
      this.props.form.getFieldsValue().Area == undefined || 
      this.props.form.getFieldsValue().detailAddress == undefined ||  
      this.props.form.getFieldsValue().phone == undefined ||
      this.props.form.getFieldsValue().mobile == undefined || 
      this.props.form.getFieldsValue().beginDate == undefined ||
      this.props.form.getFieldsValue().endDate == undefined||
      that.state.businessImg.url==undefined
    ){
        Toast.info('您还有未填写的项目', 1);
    }else{
      that.setState({
        btnControl:true
      },()=>{
        axios({
          method: 'post',
          url: "/api/business/staff-submit",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify({
            name:that.props.form.getFieldsValue().busiName,	//string	是	商家名称		
            short_name:that.props.form.getFieldsValue().busiSortName,	//string	是	商家简称		
            business_type:JSON.stringify(currentSelectServiceType), //array	是	商家类型		
            brand:that.props.form.getFieldsValue().serviceBrand,	//id	是	品牌id		
            service_type:JSON.stringify(currentSelectBusiType),	//array	是	服务类型		
            area:JSON.stringify(that.props.form.getFieldsValue().Area), //array 地点
            detail:that.props.form.getFieldsValue().detailAddress,	//string	是	详细地址
            contact:that.props.form.getFieldsValue().contact,//string 联系人		
            phone:that.props.form.getFieldsValue().phone,	//string	是	手机号		
            fixed_phone:that.props.form.getFieldsValue().mobile,	//string	是	固定电话
            join_time:that.props.form.getFieldsValue().beginDate,	//string	是	入驻时间		
            end_time:that.props.form.getFieldsValue().endDate,	//string	是	到期时间
            money:that.props.form.getFieldsValue().money,	//string	否 交纳金额		
            pay_type:JSON.stringify(that.props.form.getFieldsValue().payType),	//array	否	付款方式		
            business_code:that.props.form.getFieldsValue().busiCode,	//string	否	业务编码		
            recommend_code:that.props.form.getFieldsValue().recomendCode,	//string	否 推荐码
            img:that.state.businessImg.url//string 商家头像
          })
        }).then(function (response) {
  
          if(response.data.err==0){
              Toast.success('创建成功', 1);
              window.location.reload()
          }else{
              Toast.fail(response.data.msg+'!!!', 1);
              window.location.reload()
          }
          
        })
        .catch(function (error) {
          // window.location.reload()
          console.log(error);
        });
      })
     
      
    }
  
  }

  render() {
    const { getFieldProps ,getFieldValue} = this.props.form;
      const uploadButton = (
          <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
          </div>
      );
      const imageUrl = this.state.imageUrl;
    return (
      <div className="wrapper">
          <Header place = '北京' title = '商家入驻' codeShow = {true}/>
          <div>
              <div className="photoBox" >
                  <span className="lbl mandatory-item" style={{float: "left",marginTop:"40px",color:" #000"}}>商家头像</span>
                  <div className="photo">
                      <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action={dataReq.globalUrl+"tools/upload-business-img"}
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange.bind(this)}>
                          {imageUrl ? <img className="imgBox" src={imageUrl} alt="avatar" /> : uploadButton}
                      </Upload>
                  </div>

              </div>
            <List>
              <InputItem className="mandatory-item" {...getFieldProps('busiName')} clear>商家名称</InputItem>
              <InputItem className="mandatory-item" {...getFieldProps('busiSortName')} clear>商家简称</InputItem>
            </List>
            <section className="self-chbox">
                <span className="lbl mandatory-item">商家类型</span>
                <ul className="chboxes">
                  {
                    this.state.busiType.map((item, index) => {
                      return (<li key = {index} className="item"><input type="checkbox" onChange = {this.seletcBusiType.bind(this) } value = {item} className="cbx"/><span className="txt">{item}</span></li>)
                    })
                  }
                </ul>
            </section>

            <List>
            <InputItem className="mandatory-item" {...getFieldProps('serviceBrand')} clear>服务品牌</InputItem>
          </List>

            <section className="self-chbox">
                <span className="lbl mandatory-item">服务项目</span>
                <ul className="chboxes">
                  {
                    this.state.busiType.map((item, index) => {
                      return (<li key = {index} className="item"><input type="checkbox" onChange = {this.seletcServiceType.bind(this) } value = {item} className="cbx"/><span className="txt">{item}</span></li>)
                    })
                  }
                </ul>
            </section>

              <Picker extra="请选择"
                      data={this.state.seasons}
                      title="选择地区"
                  {...getFieldProps('Area')}
              >
                  <List.Item className="mandatory-item"  arrow="horizontal">选择地区</List.Item>
              </Picker>
            <InputItem  className="mandatory-item" {...getFieldProps('detailAddress')} clear >详细地址</InputItem>
            <List>
              <InputItem {...getFieldProps('contact')} clear>联系人</InputItem>
              <InputItem type="phone" className="mandatory-item" {...getFieldProps('phone')} clear>手机</InputItem>
              <InputItem type="number" className="mandatory-item" {...getFieldProps('mobile')} clear>固定电话</InputItem>
              <InputItem className="mandatory-item" {...getFieldProps('beginDate')} clear type="date">入驻时间</InputItem>
              <InputItem className="mandatory-item" {...getFieldProps('endDate')} clear type="date">截止日期</InputItem>
              <InputItem {...getFieldProps('money')} clear extra="元">缴纳金额</InputItem>
              <Picker data={cashtypedata} cols={1} {...getFieldProps('payType')} className="forss">
                <List.Item arrow="horizontal">付款方式</List.Item>
              </Picker>
              <InputItem {...getFieldProps('busiCode')} clear>业务编码</InputItem>
              <InputItem {...getFieldProps('recomendCode')} clear>推荐编码</InputItem>
            </List>
            <WhiteSpace />
            <CarTabBar/>
          </div>

          <section className="btn-area">
              <Button disabled = {this.state.btnControl} className="btn mid" inline onClick={this.clkSaveAndNext.bind(this)} type="ghost">保存</Button>
          </section>
          <CarTabBar chosen="shopTab"/>
      </div>
    );
  }
}
const App1 = createForm()(App);
ReactDOM.render(<App1 />, document.querySelector('#divId'));

