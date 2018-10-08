import React, { Component } from 'react';
import web3 from '../web3';
import notary from '../notary.js';
import sha256 from 'sha256';
//import { Form, Input, Message, Button, Container } from 'semantic-ui-react';

class Home extends Component {
  state = {
    message: '',
    hash: '',
    filename: '',
    status: ''
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ status: 'file uploading and caluclating hash......' });
    const accounts = await web3.eth.getAccounts();
    console.log(this.state.filename);
    try {
      await notary.methods
        .addEntry(this.state.hash, this.state.filename, this.state.message)
        .send({
          from: accounts[0]
        });

      this.setState({ status: 'file hash succesfully uploaded!!!' });
    } catch (e) {
      this.setState({
        status:
          'File cannot be uploaded! Click the below link to find the Owner!!'
      });
    }
  };

  onChange = async (event) => {
    this.setState({ filename: event.target.files[0].name });
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
          <label>
            <h3>Description</h3>
          </label>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <br />
          <br />
          <button>Submit</button>
        </form>
        <br />
        <h2>{this.state.status}</h2>

        <h2>
          <a href="http://localhost:3000/find_owner">
            Check the Owner of a file
          </a>
        </h2>
      </div>
    );
  }
}

export default Home;
