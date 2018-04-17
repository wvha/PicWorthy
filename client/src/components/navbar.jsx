import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, NavItem, MenuItem, Nav, NavDropdown, FormGroup, FormControl, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';

class NavbarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    axios.get('/logout')
      .then((result) => console.log('logout sucess in axios of navbar', result))
  }

  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>PicWorthy</Link>
          </Navbar.Brand>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            <Button type="submit"><FontAwesome name="search" /></Button>
            </Navbar.Form>
        </Navbar.Header>


          <Nav pullRight>
            <NavItem eventKey={1}><Link to='/'><FontAwesome name="home" /></Link></NavItem>
            <NavItem eventKey={2} href="#"><FontAwesome name="heart" /></NavItem>
            <NavItem eventKey={3} href="#"><FontAwesome name="plus" /></NavItem>
            <NavItem eventKey={4}><Link to='/login'>Login</Link></NavItem>
            <NavItem eventKey={5}><Link to='/signup'>SignUp</Link></NavItem>
            <NavItem eventKey={6} onClick={this.logout}><Link to='/'>Logout</Link></NavItem>
          </Nav>

      </Navbar>

    );
  }
}

export default NavbarComp;