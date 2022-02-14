import './App.css';
import RestService from './RestService.js';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};
  }

  async componentDidMount() {
    let message = await RestService.get()
    this.setState({message: message});
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.message}</p>

        <video controls width="250">
          <source src="http://localhost:3003/sample-mp4-file.mp4"
                  type="video/mp4"/>
          Your browser does not support the <code>video</code> element.
        </video>

        <figure>
          <figcaption>Listen to the good taste:</figcaption>
          <audio controls
            src="http://localhost:3004/audio/sample-mp3-file.mp3">
            Your browser does not support the <code>audio</code> element.
          </audio>
        </figure>
      </div>
    );
  }
}

