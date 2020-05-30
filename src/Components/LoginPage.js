import React from 'react';
import Axios from 'axios';
import './LoginPage.scss';
import NavBar from './Nav';

const baseURL = "https://overjoyed-olivine-camelotia.glitch.me";

class loginPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            warningMessage: ""
        };
    }

    setEmail(email) {
        this.setState({
            email: email
        });
    }

    setPassword(password) {
        this.setState({
            password: password
        });
    }

    handleLoginClick = () => {
        this.setState({
            warningMessage: ""
        });
        var email = this.state.email;
        var password = this.state.password;
        Axios({
            method: 'post',
            url: baseURL + '/api/user/login',
            withCredentials: true,
            data: {
              email: email.toLowerCase(), 
              password: password,
              Authorization: this.state.token
            }
          }).then(res => this.props.authenticate(res));
    }

    render() {
        return (
            <div className="loginPage">
                <div className="nav-style">
                        <NavBar/>
                    </div>
                <div class ="pageWrapper">
                    <div class="info">
                        <h5>Want to create a CFBS account?</h5>
                        <p class="infoPar">To create an account, you must be the owner
                        or manager of a Canadian Foodbank. To create
                        an account, send an email to foodbankstg@gmail.com 
                        so you're foodbank can be verified. </p>
                    </div>
                    <div class="loginform">
                        <label class="login">Log In</label>
                        <div class="messageWrapper">
                            <div class="warning">{this.state.warningMessage}</div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => this.setEmail(e.target.value)}/>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" onChange={e => this.setPassword(e.target.value)}/>
                        </div>
                        
                        <button type="button" class="btn btn-primary" onSelect={this.handleLoginClick} onClick={this.handleLoginClick}>Sign in</button>
                    </div>
                    <div class="bottomScreen">
                        <div class="div1"></div>
                        <div class="div2"></div>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default loginPage;