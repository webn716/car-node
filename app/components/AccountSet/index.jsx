import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';


import CarTabBar from '../CarTabBar';
import Header from '../Header'

require('./index.css');

class AccountSet extends React.Component {
  constructor() {
  	super() ;
  	this.state={}
  }

  render() {
   
    return (
       <div>
           这是账号演示设置页
       </div>
    )
  }
}

const AccountSetWrapper = createForm()(AccountSet);
ReactDOM.render(<AccountSetWrapper />, document.querySelector('#divId'));
