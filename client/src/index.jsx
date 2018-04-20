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
        _id: '',
      },
      loading: 'initial'
    }
  }

  componentDidMount() {
    this.setState({ loading: 'true' });
    axios.get('/api/loggedInYet').then((result) => {
      this.setState({userData: result.data, loading: 'false'});
    });
  }

  render() {
    if (this.state.loading === 'true') {
      console.log('loading');
    }

    return (
      <div style={{backgroundColor: "#fdfdfd"}}>
        <NavbarComp userData={this.state.userData} />
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