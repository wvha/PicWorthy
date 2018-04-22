import React, { Component } from 'react';
import axios from 'axios';

export default class UploadForm extends Component {
  checkImgUrl() {
    if(this.props.imageURL) {
      return <p style={{fontWeight:`bold`}}>Image attached.</p>
    } else {
      return <p style={{fontWeight:`bold`}}>Please upload an image.</p>
    }
  }
  
  render() {
    const uploadStatus = this.props.uploadStatus.map((status) => <div>{status}</div>);
    return (
      <div style={{paddingTop: `30px`}}>
        {this.checkImgUrl()}
      <br />
      <div style={{color: 'red', fontWeight: 'bold'}}>{uploadStatus}</div>
      <form onSubmit={this.props.handleSubmit}>
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
          <textarea
            name="description"
            type="text"
            value={this.props.description}
            onChange={this.props.handleInputChange} 
            style={textareaStyle} />
        </label><br /><br />
        <div style={{textAlign:`center`, position: `relative`, top: `75px`}}>
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

const inputStyle = {
  position: `absolute`,
  left: `105px`,
  width: `calc(100% - 105px)`,
  fontWeight: `normal`,
}

const textareaStyle = {
  position: `absolute`,
  left: `105px`,
  width: `calc(100% - 105px)`,
  height: `100px`,
  fontWeight: `normal`,
  resize: `none`,
  contenteditable: `true`,
  borderColor: `#e2e3e5`
}
