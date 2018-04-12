import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavbarComp from './components/navbar.jsx';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
// import 'bootstrap/dist/css/bootstrap.css';

// I am testing the react router here this can be deleted
const fakeHomePageComponent = (props) => <div>this is a fake home page</div>;
const fakeLoginComponent = (props) => <div>fake login component</div>;
const fakeSignupComponent = (props) => <div>fake signup compoonent</div>;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <NavbarComp />
        <Switch>
          <Route exact path='/' component={fakeHomePageComponent} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </div>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
