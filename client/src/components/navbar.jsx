import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, NavItem, MenuItem, Nav, NavDropdown, FormGroup, FormControl, Button } from 'react-bootstrap';
import FaIconPack, {FaStar, FaHome, FaPlus} from 'react-icons/lib/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Login from './login.jsx';
import Signup from './signup.jsx';

// import controller from '../server/controller/controller.js';

class NavbarComp extends React.Component {
  logout() {
    axios.get('/api/logout')
      .then(() => window.location.reload());
  }

  renderName() {
    if (this.props.userData.firstName) {
      return (
        <Nav pullRight style={{marginRight: `3px`}}>
          <NavItem eventKey={1}><Link to='/locations'><FaHome size={20} /></Link></NavItem>
          <NavItem eventKey={2}><Link to ='/likes'><FaStar size={20} /></Link></NavItem>
          <NavItem eventKey={3}><Link to ='/upload'><FaPlus size={20} /></Link></NavItem>
          <NavItem eventKey={4}><Link to ='/userpage'>{this.props.userData.firstName}</Link></NavItem>
          <NavItem eventKey={6} onClick={this.logout}><Link to='/'>Logout</Link></NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight style={{marginRight: `3px`}}>
          <NavItem eventKey={4} onClick={(e) => {this.props.handleShow(e)}} name="showLogin" >Login</NavItem>
          <Login show={this.props.showLogin} hide={this.handleClose} handleShowSignup={this.props.handleShowSignup}/>
          <Signup show={this.props.showSignup} hide={this.props.handleClose} handleShowLogin={this.props.handleShowLogin}/>
        </Nav>
      )
    }
  }
  
  render() {
    return (
      <Navbar fluid style={{marginBottom: "0px", backgroundColor: "white", borderBottom: "1px solid #cccccc", borderRadius: "0px"}}>
        <Navbar.Header style={{marginLeft: `10px`}}>
          <Navbar.Brand>
            <Link to='/' style={{fontFamily: `billabong`, fontSize: `250%`, color: `#00b0ff`, textShadow: `2px 1px #cccccc`, paddingTop:`20px`}}>Pic Worthy</Link>
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