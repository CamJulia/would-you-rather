import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

import Nav from './Nav';
import Answer from './Answer';
import History from './History';

class Dashboard extends Component {
  state = {
    view: 'answer'
  };
  render() {
    return (
      <div>
        <Nav />
        <div>
          <button
            onClick={() => {
              this.setState({ view: 'answer' });
            }}>
            Answer
          </button>
          <button
            onClick={() => {
              this.setState({ view: 'history' });
            }}>
            History
          </button>
        </div>
        <div>{this.state.view === 'answer' ? <Answer /> : <History />}</div>
      </div>
    );
  }
}

export default Dashboard;
