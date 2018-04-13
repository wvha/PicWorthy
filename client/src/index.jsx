import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavbarComp from './components/navbar.jsx';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
<<<<<<< HEAD
import Accept from './components/imjur.jsx';
=======
import Landing from './components/landing.jsx'
>>>>>>> 846bc7ae6ed4dae635c7387825f5dc57dbce9158
// import 'bootstrap/dist/css/bootstrap.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import base64 from 'base-64';
import imgurUploader from 'imgur-uploader';

// I am testing the react router here this can be deleted
const fakeHomePageComponent = (props) => <div>this is a fake home page</div>;
const fakeLoginComponent = (props) => <div>fake login component</div>;
const fakeSignupComponent = (props) => <div>fake signup compoonent</div>;

class App extends Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }


  onDrop(img) {
    const imgurRequest = (base64img) => {
      imgurUploader(img[0]);
      // axios({
      //   method: 'post',
      //   url: 'https://api.imgur.com/3/image',
      //   headers: {Authorization: "Client-ID 3f9b22888755abe"},
      //   data: {
      //       image: base64img
      //   }

      // })
      // .then(function(response) {
      //     console.log(response);
      // })
      // .catch(function(err) {
      //     console.log(err);
      // })
    }
    var reader = new FileReader();
    reader.readAsArrayBuffer(img[0]);
    reader.onload = function () {
      console.log(reader.result);
      imgurRequest(reader.result);
    };
    reader.onerror = function (error) {
       console.log('Error: ', error);
     };

  }

  render() {
    return (
<<<<<<< HEAD
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={(this.onDrop.bind(this))}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
            <p>Only *.jpeg and *.png images will be accepted</p>
          </Dropzone>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          <h4>Rejected files</h4>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
        <button type="submit">upload</button>
      </section>
=======
      <div>
        <NavbarComp />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </div>
>>>>>>> 846bc7ae6ed4dae635c7387825f5dc57dbce9158
    );
  }
}

ReactDOM.render((

    <App />

), document.getElementById('app'));
