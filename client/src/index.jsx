import React from 'react';
import ReactDOM from 'react-dom';
import NavbarComp from './components/navbar.jsx';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Landing from './components/landing.jsx'
import Locations from './components/locations.jsx';
import Userpage from './components/userpage.jsx';
import Upload from './components/upload.jsx';
import Footer from './components/footer.jsx';
import Likes from './components/likes.jsx';

// App component renders components based on the URL Route using React Router
class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      userData: {
        firstName: '',
        lastName: '',
        username: '',
        user_id: '',
      },
      showLogin: false,
      showSignup: false,
      activeModal: '',
      mapCenter: {
        lat: 41.9,
        lng: -87.624
      },
      mapZoom: 5,
      detailProps: undefined,
      lastCardClicked: undefined,
      userData: {}
    }

    this.navbarHandleClose = this.navbarHandleClose.bind(this);
    this.navbarHandleShow = this.navbarHandleShow.bind(this);
    this.navbarHandleShowSignup = this.navbarHandleShowSignup.bind(this);
    this.navbarHandleShowLogin = this.navbarHandleShowLogin.bind(this);


  }

  componentDidMount() {
    axios.get('/api/loggedInYet')
      .then((result) => 
        this.setState({userData: result.data}));
  }
  
  navbarHandleClose() {
    this.setState({ 
      showLogin: false,
      showSignup: false
    });
  }

  navbarHandleShow(e) {
    this.setState({ [e.target.name]: true });
  }

  navbarHandleShowSignup() {
    this.setState({ 
      showSignup : true,
      showLogin: false
    });
  }

  navbarHandleShowLogin() {
    this.setState({ 
      showSignup : false,
      showLogin: true
    });
  }

  render() {
    return (
      <div style={{backgroundColor: "#fdfdfd"}}>
        <NavbarComp 
          userData={this.state.userData}
          showLogin={this.state.showLogin}
          showSignup={this.state.showSignup}
          activeModal={this.state.activeModal}
          handleClose={this.navbarHandleClose}
          handleShow={this.navbarHandleShow}
          handleShowSignup={this.navbarHandleShowSignup}
          handleShowLogin={this.navbarHandleShowLogin}
        />
        <Switch>
          <Route 
            exact path='/' 
            component={Landing} 
          />
          <Route 
            path='/locations' 
            component={Locations} 
          />
          <Route 
            path='/userpage' 
            render={(props) => 
              <Userpage 
              userData={this.state.userData} 
              />
            }/>
          <Route 
            path='/upload' 
            render={(props) => 
              <Upload 
                userData={this.state.userData} 
              />
            }/>
          <Route 
            path='/likes' 
            render={(props) => 
              <Likes 
                userData={this.state.userData} 
              />
            }/>
        </Switch>
        <Footer />
      </div>
    );
  }
};

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));