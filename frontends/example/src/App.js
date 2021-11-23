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
    this.setState({message:message });
  }
  render(){
    return (
      <div className="App">
        <p>{this.state.message}</p>
      </div>
    );
  }
}

