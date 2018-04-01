import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { impath: '' };
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(ev) {
    const data = new FormData();
    data.append('file', ev.target.files[0]);
    axios.post('/upload', data)
      .then(res => {
        if (res.data.status === 500) {
          console.error(res.data.message); 
        } else {
          this.setState({ impath: res.data.body });
        }
      });
  }

  render() {
    console.log(this.state.impath);
    const ifNoImage = this.state.impath === '';
    const im = ifNoImage ? '' : <img alt="img" src={this.state.impath} />
    return (
      <div className="App">
          <input type="file" onChange={this.handleUpload}/>
          {im}
      </div>
    );
  }
}

export default App;
