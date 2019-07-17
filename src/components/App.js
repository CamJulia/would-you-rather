import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { getQuestions, getUsers } from '../actions/shared'
import Page from './Page';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getQuestions())
    this.props.dispatch(getUsers())
  }

  render() {
    return (
      <div className="App" >
        <Page />
      </div>
    );
  }
}


export default connect()(App);
