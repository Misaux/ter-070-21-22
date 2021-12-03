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
          <source src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
                  type="video/mp4"/>
          Your browser does not support the <code>video</code> element.
        </video>

        <figure>
          <figcaption>Listen to the bad taste:</figcaption>
          <audio controls
            src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3">
            Your browser does not support the <code>audio</code> element.
          </audio>
        </figure>
      </div>
    );
  }
}

