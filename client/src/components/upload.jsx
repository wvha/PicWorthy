import React, { Component } from 'react';
import UploadForm from './uploadform.jsx';
import Worthymap from './worthymap.jsx';
import DropZone from './dropzone.jsx';

class Upload extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <Worthymap isForUploadPage={true} />
      <DropZone />
      <UploadForm />
    </div>)
  }
}

export default Upload;