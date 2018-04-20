import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
/*
 * We use the imgur API to host our photos on imgur and store the links in our database
 * 
 */

var reader = new FileReader();

class Accept extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }

  onDrop(img) {
    const formData = new FormData();
    formData.append('image', img[0]);
    const that = this;

    axios({
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {Authorization: "Client-ID 3f9b22888755abe"},
        data: formData
    })
    .then(function(response) {
      that.props.getLink(response.data.data.link);

    })
    .catch(function(err) {
        console.log(err);
    })
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={(this.onDrop.bind(this))}
            style={{width: `100%`, border:`2px dashed grey`, height: `398px`}}
          >
            <div style={{width: `80%`, margin:`auto`, paddingTop: `50px`, paddingBottom: `50px`, textAlign: `center`}}>
              <p>Try dropping a file here, or click to select files to upload.</p>
              <p>Only *.jpeg and *.png images will be accepted</p>
            </div>
            <div style={{width:`100px`, margin: `auto`}}>
              <img width="100px" height="100px" src="http://www.arcdocendi.com/Forms/images/upload.png" />
            </div>
          </Dropzone>
        </div>
        <aside>
          {/* <h4>Accepted files</h4> */}
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          {/* <h4>Rejected files</h4> */}
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}



export default Accept;