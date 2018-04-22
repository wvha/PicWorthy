import React from 'react';
import axios from 'axios';
import { Navbar, NavItem, MenuItem, Nav, NavDropdown, FormGroup, FormControl, Button } from 'react-bootstrap';
import FaIconPack, {FaStar, FaHome, FaPlus} from 'react-icons/lib/fa';
import { Link } from 'react-router-dom';
import Login from './login.jsx';
import Signup from './signup.jsx';


class NavbarComp extends React.Component {
  logout() {
    axios.get('/api/logout')
      .then(() => window.location.reload());
  }
  
  render() {
    return (
      <Navbar fluid style={{marginBottom: "0px", backgroundColor: "white", borderBottom: "1px solid #cccccc", borderRadius: "0px"}}>
        <Navbar.Header style={{marginLeft: `10px`}}>
          <Navbar.Brand>
            <Link to='/' style={{fontFamily: `billabong`, fontSize: `250%`, color: `#00b0ff`, textShadow: `2px 1px #cccccc`, paddingTop:`20px`}}>Pic Worthy</Link>
          </Navbar.Brand>
          <Navbar.Form pullLeft> 
            </Navbar.Form>
        </Navbar.Header>
        <Name 
            userData={ this.props.userData }
            logout={ this.logout }
            handleShow={ this.props.handleShow }
            showLogin={ this.props.showLogin }
            handleClose={ this.props.handleClose }
            handleShowSignup={ this.props.handleShowSignup }
            showSignup={ this.props.showSignup }
            handleClose={ this.props.handleClose }
            handleShowLogin={ this.props.handleShowLogin }
        />
      </Navbar>
    );
  }
}

const Name = (props) => {
  if (props.userData.firstName) {
    return (
      <Nav 
        pullRight 
        style={ {marginRight: `3px`} }
      >
        <NavItem eventKey={ 1 }>
          <Link to='/locations'>
            <FaHome size={ 20 } />
          </Link>
        </NavItem>
        <NavItem eventKey={ 2 }>
          <Link to ='/likes'>
            <FaStar size={ 20 } />
          </Link>
        </NavItem>
        <NavItem eventKey={ 3 } >
          <Link to='/upload'>
            <FaPlus size={ 20 } />
          </Link>
        </NavItem>
        <NavItem eventKey={ 4 }>
          <Link to='/userpage'>
            { props.userData.firstName }
          </Link>
        </NavItem>
        <NavItem 
          eventKey={ 6 } 
          onClick={ props.logout }
        >
          <Link to='/'>
            Logout
          </Link>
        </NavItem>
      </Nav>
    )
  } else {
    return (
      <Nav 
        pullRight 
        style={ {marginRight: `3px`}  }
      >
        <NavItem 
          eventKey={ 4 } 
          onClick={ (e) => {props.handleShow(e)} } 
          name="showLogin" 
        >
          Login
        </NavItem>
        <Login 
          show={ props.showLogin } 
          hide={ props.handleClose } 
          handleShowSignup={ props.handleShowSignup }
        />
        <Signup 
          show={ props.showSignup } 
          hide={ props.handleClose } 
          handleShowLogin={ props.handleShowLogin }
        />
      </Nav>
    )
  }
};

export default NavbarComp;