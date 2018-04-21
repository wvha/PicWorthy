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
      loading: 'initial',
      showLogin: false,
      showSignup: false,
      activeModal: ''
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleShowSignup = this.handleShowSignup.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: 'true' });
    axios.get('/api/loggedInYet').then((result) => {
      this.setState({userData: result.data, loading: 'false'});
    });
  }
  
  handleClose() {
    this.setState({ 
      showLogin: false,
      showSignup: false
    });
  }

  handleShow(e) {
    this.setState({ [e.target.name]: true });
  }

  handleShowSignup() {
    this.setState({ 
      showSignup : true,
      showLogin: false
    });
  }

  handleShowLogin() {
    this.setState({ 
      showSignup : false,
      showLogin: true
    });
  }

  render() {
    if (this.state.loading === 'true') {
      console.log('loading');
    }

    return (
      <div style={{backgroundColor: "#fdfdfd"}}>
        <NavbarComp 
          userData={this.state.userData}
          showLogin={this.state.showLogin}
          showSignup={this.state.showSignup}
          activeModal={this.state.activeModal}
          handleClose={this.handleClose}
          handleShow={this.handleShow}
          handleShowSignup={this.handleShowSignup}
          handleShowLogin={this.handleShowLogin}
        />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/locations' component={Locations} />
          <Route path='/userpage' render={(props) => <Userpage userData={this.state.userData} />} />
          <Route path='/upload' render={(props) => <Upload userData={this.state.userData} />} />
          <Route path='/likes' render={(props) => <Likes userData={this.state.userData} />} />
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