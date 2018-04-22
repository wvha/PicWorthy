import React from 'react';
import PicRow from './picrow.jsx';
import axios from 'axios';
import Details from './details.jsx';

export default class Likes extends React.Component {
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
              starFilled={true} 
              />;
    }
  }

  render() {
    console.log('thispropslikes', this.props);
    return (
      <div style={{minHeight: `calc(100vh - 150px)`}}>
        <div>
        <h1 style={{fontFamily: `billabong`, textAlign: `center`, color: `#32bfff`}}>{this.props.userData.firstName}'s Favorites</h1>
        <br />
        </div>
        <Row rowType="likes" userId={this.props.userData._id} showDetails={this.showDetails} />
        <br/>
        {this.renderClickedCard()}
      </div>
    )
  }
}
