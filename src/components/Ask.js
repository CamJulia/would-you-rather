import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';
import { connect } from 'react-redux';
import Nav from './Nav';
import { saveQuestion } from '../actions/questions';

class Ask extends Component {
  state = {
    error: false,
    optionOne: '',
    optionTwo: '',
    toHome: false
  };

  handleOptionInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (this.state.error && value) {
      this.setState({ error: false });
    }
  };

  submitAnswer = e => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;

    if (optionOne.trim().length < 2 || optionTwo.trim().length < 2) {
      this.setState({ error: true });
      return;
    }

    this.props.dispatch(
      saveQuestion({
        optionOneText: this.state.optionOne.trim(),
        optionTwoText: this.state.optionTwo.trim()
      })
    );

    this.setState({
      optionOne: '',
      optionTwo: '',
      toHome: true
    });
  };

  render() {
    const { toHome } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Nav />
        <div className="ask">
          <h1>Ask a question!</h1>
          <h2>Would you rather...</h2>
          <form>
            <div className="form">
              <input
                type="text"
                name="optionOne"
                placeholder="Option one"
                value={this.state.optionOne}
                onChange={this.handleOptionInput}
              />
              <p>or</p>
              <input
                type="text"
                name="optionTwo"
                placeholder="Option two"
                value={this.state.optionTwo}
                onChange={this.handleOptionInput}
              />
            </div>
            <input
              className="submit"
              type="submit"
              value="Submit"
              onClick={this.submitAnswer}
            />
            {this.state.error && (
              <h3>Error! Each option must be at least 2 characters long.</h3>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Ask);
