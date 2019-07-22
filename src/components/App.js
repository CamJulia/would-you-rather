import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { getQuestions, getUsers } from '../actions/shared'
import Page from './Page';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getQuestions())
    this.props.dispatch(getUsers())
  }

  render() {
    return (
      <Router>
        <div className="App" >
          <Page />
        </div>
      </Router>
    );
  }
}


export default connect()(App);
