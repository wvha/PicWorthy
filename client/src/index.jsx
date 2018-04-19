import React from 'react';
import ReactDOM from 'react-dom';
import NavbarComp from './components/navbar.jsx';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Landing from './components/landing.jsx'
import Locations from './components/locations.jsx';
import Upload from './components/upload.jsx';
import Footer from './components/footer.jsx';

// App component renders components based on the URL Route using React Router
const App = (props) => {
  return (
    <div style={{backgroundColor: "#fdfdfd"}}>
      <NavbarComp />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/locations' component={Locations} />
        <Route path='/upload' component = {Upload} />
      </Switch>
      <Footer />
    </div>
  );
};

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));