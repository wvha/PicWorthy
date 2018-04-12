import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavbarComp from './components/navbar.jsx';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
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
          <Route path='/login' component={fakeLoginComponent} />
          <Route path='/signup' component={fakeSignupComponent} />
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
