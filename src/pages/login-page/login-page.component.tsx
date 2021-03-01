import './login-page.style.scss';
import { Component } from 'react';
import CustomButton from "../../component/custom-button/custom-button.component";
import ErrorMessage from "../../component/error-message/error-message.component";
import FormInput from "../../component/form-input/form-input.component";
import {connect} from 'react-redux';
import {login } from '../../redux/user/user-actions';
import {UserActionTypes, User} from '../../redux/user/types/user-types';
import {authenticate} from '../../utils/auth/auth.service';
import {AuthenticationCredentials} from '../../utils/auth/auth.type';
interface MyProps {
    login: Function
}

interface MyState {
    message ?:string
}

class LoginPage extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props)

        this.state = {
            message: ''
        }
    }
    handleChange = (event: React.FormEvent<HTMLElement> )=>{
        let target:any = event.currentTarget;
        const {name, value} = target;
        this.setState({[name]: value});
    }

    handleSubmit = async (event: React.FormEvent<HTMLElement> )=>{
        event.preventDefault();

        let target:any = event.currentTarget;
        let user: AuthenticationCredentials = {
            username: target.userName,
            password: target.password, 
            countryCode: 'sg'
            
        };
        authenticate(user).then(response=> console.log('hello'+JSON.stringify(response)))
        ;
    }

    render = () => (
      <div className='login-page'>
        <h1>Login Page</h1>
        <form onSubmit={this.handleSubmit} method='post'>
            <FormInput name='userName' handleChange={this.handleChange} label='User Name (1bankid)' required/>
            <FormInput type='password' name='password' handleChange={this.handleChange} label='Password' required/>
            <CustomButton type='submit' inverted={false}>Login</CustomButton>
        </form>
        <ErrorMessage>{this.state.message}</ErrorMessage>
      </div>
    )
}

//this is like injecting a hardcoded action type.
const mapDispatchToProps = (dispatch:any) => ({
    login: (user: User) => dispatch(login(user))
  });
  
  //this is to put the setCurrentUser function into this object properties.
export default connect(null, mapDispatchToProps)(LoginPage);
