import React, { Component } from 'react';
import web3 from '../web3';
import notary from '../notary.js';
import sha256 from 'sha256';

class Owner extends Component {
  state = {
    hash: '',
    status: '',
    filename: '',
    timestamp: '',
    message: '',
    address: ''
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ status: 'Finding the Owner....' });
    const accounts = await web3.eth.getAccounts();

    try {
      const details = await notary.methods.entrySet(this.state.hash).call();
      console.log(details);
      var d = new Date(details[1] * 1000);
      this.setState({ status: 'Success!!!' });
      this.setState({ filename: details[0] });
      this.setState({ timestamp: d.toGMTString() });
      console.log(d.toGMTString());
      this.setState({ message: details[2] });
      this.setState({ address: details[3] });
    } catch (e) {
      this.setState({ status: 'Owner not found!' });
    }
  };

  onChange = async (event) => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (event) => {
      //console.warn('file data', event.target.result);
      this.setState({ hash: '0x' + sha256(event.target.result) });
      console.log('filehash', this.state.hash);
    };
  };
  render() {
    return (
      <div>
        <h2>Check Owner!</h2>
        <form onSubmit={this.onSubmit}>
          <label>
            <h3>Upload a file</h3>
          </label>
          <input
            type="file"
            name="file"
            onChange={(event) => this.onChange(event)}
          />
          <br />
          <br />
          <button>Submit</button>
          <br />
          <br />
          <h2>{this.state.status}</h2>
          <br />
          <h3>
            Filename: <br />
            {this.state.filename}
          </h3>
          <h3>
            uploaded On: <br />
            {this.state.timestamp}
          </h3>
          <h3>
            Comments: <br />
            {this.state.message}
          </h3>
          <h3>
            Uploaded by: <br />
            {this.state.address}
          </h3>
        </form>
        <br />
        <br />
        <h4>
          <a href="http://localhost:3000/"> Go Back!</a>
        </h4>
      </div>
    );
  }
}

export default Owner;
