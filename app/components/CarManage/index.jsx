import React from 'react';
import ReactDOM from 'react-dom';

import { Button , List, InputItem, WhiteSpace,WingBlank,Picker, Modal,Toast } from 'antd-mobile';
import { district, provinceLite as province } from 'antd-mobile-demo-data';

import CarTabBar from '../CarTabBar';
import Header from '../Header'
import axios from 'axios'
import qs from 'qs'
const alert = Modal.alert;

require('./index.css');

let dataReq = require('../script/req');

window.addEventListener('load', function () {
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var firstLineHeight = document.querySelector('#firstLineId').offsetHeight;
    document.querySelector('#wrapperId').style.height = clientHeight + 'px';
    document.querySelector('#carListId').style.height = (clientHeight - firstLineHeight - 190) + 'px';

});

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            resultMap:[]
        }
    }

    componentDidMount() {
        this.carList();
    }

    //车辆列表
    carList() {
        var that = this;
        axios({
            method: 'GET',
            url: dataReq.globalUrl + 'car/list',
            params: {
                token: dataReq.token

            }
        }).then(function (res) {
                if (res) {
                    that.setState({
                        resultMap:res.data.data
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addNewCar(e) {
        window.location.href = '/addcar.html';
    }

    editor(id) {
        window.location.href = '/addcar.html';
    }

    delete(id) {
        console.log(id)
        var that=this;
        alert('提示', '确认删除???', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定',
                onPress: () =>
                    new Promise((resolve) => {
                        axios({
                            method: 'post',
                            url: dataReq.globalUrl + 'car/remove',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data: qs.stringify({
                                id:id
                            })
                        }).then(function (res) {
                                setTimeout(resolve, 1000);
                                if (res.data.err==0) {
                                    Toast.success('删除成功 !!!', 1);
                                    that.carList();

                                }else{
                                    Toast.fail(res.data.msg, 1);
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }),
            },
        ])

    }

    render() {
        var o = this;
        var newArry = [];
        if(this.state.resultMap&&this.state.resultMap.length>0){
            for (var i = 0; i < this.state.resultMap.length; i++) {
                var item = this.state.resultMap[i];
                newArry.push(
                    <li className="car-item" key={item.id} id={item.id}>
                        <div className="position clearfix">
                            <div className="fl-left">第{i + 1}辆车</div>
                            <div className="btnBox">
                                <Button className="" type="warning" size="small" inline style={{border:" 1px solid #f86e21"}}
                                        onClick={o.delete.bind(this,item.id)}>删除</Button>
                                {/**<Button className="" type="primary" size="small" inline
                                        onClick={o.editor.bind(this,item.id)}>修改</Button>**/}
                            </div>

                        </div>
                        <div className="content">
                            <img src={item.brand_logo} className="logo"></img>
                            <div className="detail">
                                <div className="title">{item.plate_number}</div>
                                <div><span className="num">{item.brand}</span></div>
                            </div>
                        </div>
                    </li>
                )
            }
        }else{
            newArry.push(<div key="nodata" id='noData'>暂无数据</div>)
        }


        return (
            <div className="wrapperGrey" id="wrapperId">
                <Header place = '北京' title = '车辆管理' codeShow = {true}/>

                <div className="first-line" id="firstLineId">
                    <Button className="add-car" type="ghost" size="small" inline onClick={this.addNewCar.bind(this)}>添加新车</Button>
                </div>

                <ul key="carList" className="car-list" id="carListId">
                    {newArry}
                </ul>
                <CarTabBar/>
            </div>
        );
    }
}
ReactDOM.render(<App/>, document.querySelector('#divId'));