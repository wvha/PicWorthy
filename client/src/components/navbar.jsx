import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, NavItem, MenuItem, Nav, NavDropdown, FormGroup, FormControl, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import controller from '../server/controller/controller.js';

class NavbarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }

  logout() {
    axios.get('/logout')
      .then((result) => console.log('logout success in axios of navbar', result))
  }

  componentDidMount() {
    axios.get('/loggedInYet').then((result) => {
      console.log('comp did mount: ', result.data);
      this.setState({
        userData: result.data
      });
    });
  }

  renderName() {
    if (this.state.userData.firstName) {
      console.log(this.state.userData.firstName);
      return (
        <Nav pullRight>
          <NavItem eventKey={1}><Link to='/'><FontAwesome name="home" /></Link></NavItem>
          <NavItem eventKey={2} href="#"><FontAwesome name="heart" /></NavItem>
          <NavItem eventKey={3} href="#"><FontAwesome name="plus" /></NavItem>
          <NavItem eventKey={4}>{this.state.userData.firstName}</NavItem>
          <NavItem eventKey={6} onClick={this.logout}><Link to='/'>Logout</Link></NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight>
          <NavItem eventKey={1}><Link to='/'><FontAwesome name="home" /></Link></NavItem>
          <NavItem eventKey={2} href="#"><FontAwesome name="heart" /></NavItem>
          <NavItem eventKey={3} href="#"><FontAwesome name="plus" /></NavItem>
          <NavItem eventKey={4}><Link to='/login'>Login</Link></NavItem>
          <NavItem eventKey={5}><Link to='/signup'>SignUp</Link></NavItem>
        </Nav>
      )
    }
  }
  
  render() {
    return (
      <Navbar fluid style={{marginBottom: "0px", backgroundColor: "white", borderBottom: "1px solid #cccccc", borderRadius: "0px"}}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/' style={{fontFamily: `billabong`, fontSize: `250%`, color: `#1e65df`, textShadow: `2px 1px #cccccc`}}>Pic Worthy</Link>
          </Navbar.Brand>
          <Navbar.Form pullLeft>
            {/* <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            <Button type="submit"><FontAwesome name="search" /></Button> */}
            </Navbar.Form>
        </Navbar.Header>

        {this.renderName()}

      </Navbar>

    );
  }
}

export default NavbarComp;