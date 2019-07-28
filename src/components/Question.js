import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
  render() {
    const { question } = this.props;

    return (
      <div className="flexItem">
        <h2>{question.id}</h2>
        <h2>{question.author}</h2>
        <h3>You would rather...</h3>
        <h4>{question.optionOne.text}</h4>
        <h4>{question.optionTwo.text}</h4>
      </div>
    );
  }
}

function mapStateToProps({ questions }, props) {
  const questionId = props.match.params.id;
  const question = questions[questionId];

  return { question };
}

export default connect(mapStateToProps)(Question);
