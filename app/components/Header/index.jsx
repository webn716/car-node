import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
import axios from 'axios'

import {Card, TextareaItem, List, Button} from 'antd-mobile'

require('./index.css');

class Header extends React.Component {
  constructor(props) {
  	super(props) ;
  	this.state={
          place:'北京'
      }
  }
  componentDidMount(){
        // this.setState({
        //     place:java.getLocation()[3]  
        // })
  }
  useEWM(){
      console.log('使用二维码')
      //java.scan()
  }
  scanResult(result){
    console.log(result)
  }
  render() {
    const {place, title, codeShow} = this.props 
    return ( 
        <div className = 'headerContainer'>
            <div className = 'headerLeft'>
                <div><span className='icon-map-pin' style={{'marginRight': '10px'}}></span>{this.state.place}</div>
                </div>
            <div className = 'headerCenter'>{title}{codeShow}</div>
            <div className = 'headerRight' onClick = {this.useEWM.bind(this)}>
                {
                    codeShow?<img src=".././../../images/code.svg" alt=""/>:null
                }
            </div>
        </div>
    )
  }
}

export default Header;