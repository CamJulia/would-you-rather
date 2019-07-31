import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import { saveQuestionAnswer } from '../actions/questions';

const percentBarStyle = {
  backgroundColor: 'rosybrown',
  height: '2em'
};

class Question extends Component {
  render() {
    const {
      question,
      users,
      authedUser,
      thisShitIsAnswered,
      votesOptionOne,
      votesOptionTwo,
      percentOne,
      percentTwo
    } = this.props;

    return (
      <div>
        <Nav />
        <div className="info-container">
          <div className="info-header">
            <img src={users[question.author].avatarURL} alt="avatar_image" />
            <h2>{users[question.author].name} asked:</h2>
          </div>
          {thisShitIsAnswered ? (
            <div className="info-detail">
              <h3>Would you would rather...</h3>
              <div key={question.id + question['optionOne'].text}>
                <h4>...{question['optionOne'].text}</h4>
                <p>Votes: {votesOptionOne}</p>
                {question['optionOne'].votes.indexOf(authedUser) > -1 ? (
                  <img
                    className="my-vote"
                    src={users[authedUser].avatarURL}
                    alt="avatar_image"
                  />
                ) : null}

                <div className="percent">
                  <div
                    style={{
                      ...percentBarStyle,
                      ...{ width: `${percentOne}%` }
                    }}
                  />
                  <p>{percentOne}%</p>
                </div>
                <p>or</p>
                <h4>{question['optionTwo'].text}?</h4>
                <p>Votes: {votesOptionTwo}</p>
                {question['optionTwo'].votes.indexOf(authedUser) > -1 ? (
                  <img
                    className="my-vote"
                    src={users[authedUser].avatarURL}
                    alt="avatar_image"
                  />
                ) : null}

                <div className="percent">
                  <div
                    style={{
                      ...percentBarStyle,
                      ...{ width: `${percentTwo}%` }
                    }}
                  />
                  <p>{percentTwo}%</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="info-detail">
              <h3>Would you would rather...</h3>
              <button
                className="answerBtn"
                onClick={() => {
                  this.props.dispatch(
                    saveQuestionAnswer({ question, answer: 'optionOne' })
                  );
                }}>
                {question.optionOne.text}
              </button>
              <p>or</p>
              <button
                className="answerBtn"
                onClick={() => {
                  this.props.dispatch(
                    saveQuestionAnswer({ question, answer: 'optionTwo' })
                  );
                }}>
                {question.optionTwo.text}?
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const questionId = props.match.params.id;
  const question = questions[questionId];
  let thisShitIsAnswered = true;
  const votesOptionOne = question['optionOne']['votes'].length;
  const votesOptionTwo = question['optionTwo']['votes'].length;
  const percentOne = (
    (100 / (votesOptionOne + votesOptionTwo)) *
    votesOptionOne
  ).toFixed(2);
  const percentTwo = (
    (100 / (votesOptionOne + votesOptionTwo)) *
    votesOptionTwo
  ).toFixed(2);

  const qsAnsweredByAuthedUser = Object.keys(users[authedUser].answers);

  if (qsAnsweredByAuthedUser.indexOf(questionId) > -1) {
    thisShitIsAnswered = true;
  } else {
    thisShitIsAnswered = false;
  }

  console.log(
    'This shit is bananas: ',
    thisShitIsAnswered,
    qsAnsweredByAuthedUser,
    questionId,
    votesOptionOne,
    votesOptionTwo,
    percentOne,
    percentTwo
  );
  return {
    question,
    users,
    authedUser,
    thisShitIsAnswered,
    votesOptionOne,
    votesOptionTwo,
    percentOne,
    percentTwo
  };
}

export default connect(mapStateToProps)(Question);
