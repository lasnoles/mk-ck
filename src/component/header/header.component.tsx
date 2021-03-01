import React  from "react";
import './header.style.scss';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import brokerLayout from "../../layout/broker.layout";
import dcsRegistrationLayout from "../../layout/dcs-registration.layout";
import epsRegistrationLayout from "../../layout/eps-registration.layout";
import outstandingContractLayout from "../../layout/outstanding-contract.layout";
import { setCurrentUser } from '../../redux/user/user-actions';

import {resetLayout} from '../../redux/search-page/search-action';
import HomeIcon from '@material-ui/icons/Home';
import {Layout} from '../../redux/search-page/types/search-types';
import ErrorMessage from "../error-message/error-message.component";


interface MyProps {
  resetLayout: Function,
  setCurrentUser: Function
}

interface MyState {
  message: string
}

class Header extends React.Component<MyProps, MyState>{

  constructor(props: MyProps){
    super(props);

    this.state = {
        message: ''
    }
}
  async handleClick(layout: Layout){
    this.setState (
      {message: ''}
    );

    await fetch(layout.loadingUrl).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(response=>response.json())
      .catch(e=>this.setState({message: e}))
      .then(data => layout.resultData=data)
      .then(()=>this.props.resetLayout(layout));
    
  }
  
  render = ()=> (
    <div className='header'>
      <a href='/entity'>
        <HomeIcon/>
      </a>

      <div className='options'>
        <a className='option' onClick={()=>this.handleClick(brokerLayout)}>
          Broker
        </a>
        <a className='option' onClick={()=>this.handleClick(dcsRegistrationLayout)}>
         DCS Registration
       </a>
       <a className='option' onClick={()=>this.handleClick(epsRegistrationLayout)}>
         EPS Registration
       </a>
       <a className='option' onClick={()=>this.handleClick(outstandingContractLayout)}>
         Outstanding Contracts
       </a>
       <a className='option' onClick={()=>this.handleClick(outstandingContractLayout)}>
         Outstanding Contracts
       </a>
       <Link to="/" onClick={()=>this.props.setCurrentUser(null)} >SIGN OUT</Link>
       <ErrorMessage>{this.state.message}</ErrorMessage>
      </div>

    </div>
  )
}

const mapDispatchToProps = (dispatch:any) => ({
  resetLayout: (layout:Layout) => dispatch(resetLayout(layout)),
  setCurrentUser: (user:any) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(Header);