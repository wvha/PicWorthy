import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, NavItem, MenuItem, Nav, NavDropdown, FormGroup, FormControl, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';



class NavbarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">PicWorthy</a>
          </Navbar.Brand>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            <Button type="submit"><FontAwesome name="search" /></Button>
            </Navbar.Form>
        </Navbar.Header>


          <Nav pullRight>
            <NavItem eventKey={1} href="#"><FontAwesome name="home" /></NavItem>
            <NavItem eventKey={2} href="#"><FontAwesome name="heart" /></NavItem>
            <NavItem eventKey={3} href="#"><FontAwesome name="plus" /></NavItem>
            <NavItem eventKey={4} href="#">Login</NavItem>
          </Nav>

      </Navbar>

    );
  }
}

export default NavbarComp;