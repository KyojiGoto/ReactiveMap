import React, {Component} from 'react';
import Axios from 'axios';
import './Nav.scss'

const baseURL = "https://overjoyed-olivine-camelotia.glitch.me";
var login = "Login";
var logout = false;

class NAV_BAR extends Component {
    componentDidMount() {
        if(window.localStorage.getItem("token")){
            var token = window.localStorage.getItem("token")
            Axios({
                method: 'post',
                url: baseURL + '/api/user/read-cookie',
                withCredentials: true,
                data: {
                    Authorization: token
                  }
            }).then(res => {
              if (res.status === 200) {
                login = "My Account";
                logout = true;
              } else {
                const error = new Error(res.error);
                throw error;
              }
            })
            .catch(err => {
              console.error(err);
              login = "Login";
              logout = false;
            });
        } else {
            login = "Login";
            logout = false;
        }
    }

    logOut() {
        window.localStorage.setItem("token", "");
        window.localStorage.setItem("foodbank", "");
        window.location.href="/";
    }

    render(){
        if (logout) {
            return(
                
                <nav className="navbar navbar-expand-lg navbar-light bg-light" id="topNav">
                    <a className="navbar-brand" href="/">Canadian FoodBank Status</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.canadahelps.org/en/charities/food-banks-canada/" target="_blank">Donate Now</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/auth" tabIndex="-1" >{login}</a>
                            </li>
                            <li className="nav-item shft">
                                <button type="button" class="nav-link logout" onClick={this.logOut}>LogOut</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                
            );
        } else {
            return(
                
                <nav className="navbar navbar-expand-lg navbar-light bg-light" id="topNav">
                    <a className="navbar-brand" href="/">Canadian FoodBank Status</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.canadahelps.org/en/charities/food-banks-canada/" target="_blank">Donate Now</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/auth" tabIndex="-1" >{login}</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                
            );
        }
    }
}

export default NAV_BAR;