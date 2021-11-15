import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import InfoInput from './components/InfoInput';
import Login from './components/api-authorization/Login';
import Download from './components/Download';
import CreateAccount from './components/api-authorization/CreateAccount';
import './custom.css'
import axios from 'axios';

interface Props {
}

interface State {
  authenticated: boolean;
}

export let idList: {[key: string]: string} = {};
function setId(): void {
  var cookies = document.cookie; //全てのcookieを取り出して
  var cookiesArray = cookies.split(';'); // ;で分割し配列に
  for(var c of cookiesArray){ //一つ一つ取り出して
    var cArray = c.split('='); //さらに=で分割して配列に
    idList[cArray[0]] = cArray[1];
  }
}

export default class App extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      authenticated: false,
    }
    this.isLogin();
    setId();
  }

  async isLogin() {
    await axios.get('api/auth/islogin')
    .then((result) => {
      if (result.data) { this.setAuthenticated(); }
    })
    .catch((error) => {
      console.log(error.response);
    })
  }
  setAuthenticated() {
    this.setState({
      authenticated: !this.state.authenticated
    });
  }

  render() {
    return (
        <Layout
          authenticated = { this.state.authenticated }
          setAuthenticated = { () => this.setAuthenticated() }
        >
          <Route exact path='/' component={Home} />
          
          {this.state.authenticated ? 
            <Route path='/register' component={InfoInput} /> : 
            <Redirect to="/" />
          }
          {this.state.authenticated ? 
            <Route path='/download' component={Download} /> : 
            <Redirect to="/" />
          }
          <Route path='/login'>
            {this.state.authenticated ? 
                <Redirect to="/" /> :
                <Login authenticated = { this.state.authenticated } setAuthenticated = { () => this.setAuthenticated() }/>
            }
          </Route>
          <Route path='/create-account'>
            {this.state.authenticated ? 
                <Redirect to="/" /> :
                <CreateAccount authenticated = { this.state.authenticated } setAuthenticated = { () => this.setAuthenticated() }/>
            }
          </Route>
        </Layout>
    );
  }
}
