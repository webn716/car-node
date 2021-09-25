import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
require('./index.css');

import Header from '../Header'
import CarTabBar from '../CarTabBar'

class Maintenance extends React.Component {
  constructor() {
  	super() ;
  	this.state={}
  }

  render() {
    
    return (
        <div>
            <Header place = '北京' title = '保养' codeShow = {true}/>
            <div>这是保养</div>
            <CarTabBar chosen="maintenanceTab"/>
        </div>
    )
  }
}

const MaintenanceWrapper = createForm()(Maintenance);
ReactDOM.render(<MaintenanceWrapper />, document.querySelector('#divId'));
