import React, { Component } from 'react';
import axios from 'axios';

class UploadForm extends Component {
  checkImgUrl() {
    if(this.props.imageURL) {
      return <p style={{fontWeight:`bold`}}>Image succesfully uploaded!</p>
    } else {
      return <p style={{fontWeight:`bold`}}>Please upload an image.</p>
    }
  } 

  render() {
    return (
      <div style={{paddingTop: `50px`}}>
        {this.checkImgUrl()}
      <br />
      <form onSubmit={this.props.handleSubmit}>
          {/* {this.checkImgUrl()} */}
        <label>
          Category
          <input
            name="category"
            type="text"
            value={this.props.category}
            onChange={this.props.handleInputChange}
            style={inputStyle} />
        </label><br /><br />
        <label>
          Location
          <input
            name="location"
            type="text"
            value={this.props.location}
            onChange={this.props.handleInputChange}
            style={inputStyle} />
        </label><br /><br />
        <label>
          Description
          <input
            name="description"
            type="text"
            value={this.props.description}
            onChange={this.props.handleInputChange} 
            style={inputStyle} />
        </label><br /><br />
        <div style={{textAlign:`center`}}>
          <input
            name="submit"
            type="submit" 
            style={{borderRadius:`5px`}}
          />
        </div>
      </form>
      </div>
    );
  }
}


const inputStyle ={
  position: `absolute`,
  left: `105px`,
  width: `calc(100% - 105px)`
}
export default UploadForm;