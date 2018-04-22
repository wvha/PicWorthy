import React from 'react';
import Row from './row.jsx';
import axios from 'axios';
import Details from './details.jsx';

class Userpage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      detailProps: undefined,
      lastClickCard: undefined,
    };
    this.showDetails = this.showDetails.bind(this);
  }

  showDetails(e, info) {
    if (this.state.lastClickCard === undefined || this.state.lastClickCard.picDetails._id !== info.picDetails._id) {
        this.setState({
          detailProps: info,
          lastClickCard: info
        })
    } else {
      this.setState({
        detailProps: undefined,
        lastClickCard: undefined
      })
    } 
  }

  renderClickedCard() {
    if (this.state.detailProps !== undefined) {
      return <Details 
              picDetails={this.state.detailProps.picDetails} 
              starFilled={null} 
              />;
    }
  }

  render() {
    return (
      <div style={{minHeight: `calc(100vh - 150px)`}}>
        <h1 style={{fontFamily: `billabong`, textAlign: `center`, color: `#32bfff`}}>Hello {this.props.userData.firstName}</h1>
        <h2 style={{fontFamily: `billabong`, textAlign: `center`, color: `#919295`}}>Your Places</h2>
        <Row rowType={"user"} data={this.props.userData} showDetails={this.showDetails} />
        <br />
        {this.renderClickedCard()}
      </div>
    )
  }
}

export default Userpage;