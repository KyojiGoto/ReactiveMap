import React, { Component } from 'react';
import Axios from 'axios';
import LoginPage from './LoginPage';

const baseURL = "https://overjoyed-olivine-camelotia.glitch.me";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: true
      };
    }

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
                this.setState({ loading: false, redirect: true});
              } else {
                const error = new Error(res.error);
                throw error;
              }
            })
            .catch(err => {
              console.error(err);
              this.setState({ loading: false, redirect: false });
            });
        } else {
            this.setState({ loading: false, redirect: false });
        }
    }

    authenticate = (res) => {
        console.log(res);
        window.localStorage.setItem("token", res.data.Authorization);
        window.localStorage.setItem("foodbank", res.data.foodbank.properties.name);
        console.log(window.localStorage);
        if (!res.data.userFound) {
            this.setState({
                warningMessage: "Email not found"
            });
        } else if (res.data.userFound && !res.data.userAuth) {
            this.setState({
                warningMessage: "Wrong password"
            });
        } else if (res.data.userFound && res.data.userAuth) {
            this.setState({
                redirect: true
            })
        }
    }
    

    render() {
      const { loading, redirect } = this.state;

      const spinnerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        height: "100vh",
        width: "100vw"
      };

      if (loading) {
        return <div style={spinnerStyle}>
                  <div class="spinner-border justify-content-center" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>;
      }
      if (!redirect) {
        return <LoginPage 
            authenticate={this.authenticate}
        />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}