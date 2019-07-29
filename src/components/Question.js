import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import { saveQuestionAnswer } from '../actions/questions';

class Question extends Component {
  render() {
    const { question, users, authedUser, thisShitIsAnswered } = this.props;

    return (
      <div>
        <Nav />
        {thisShitIsAnswered ? (
          <div>
            <h2>{users[question.author].name} asked:</h2>
            <div>
              <img src={users[question.author].avatarURL} alt="avatar_image" />
            </div>
            <h3>Would you would rather...</h3>
            <h4>{question.optionOne.text}</h4>
            <p>or</p>
            <h4>{question.optionTwo.text}</h4>
          </div>
        ) : (
          <div>
            <h2>{users[question.author].name} asks:</h2>
            <img src={users[question.author].avatarURL} alt="avatar_image" />
            <h3>Would you rather...</h3>
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
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const questionId = props.match.params.id;
  const question = questions[questionId];
  let thisShitIsAnswered = true;

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
    questionId
  );
  return { question, users, authedUser, thisShitIsAnswered };
}

export default connect(mapStateToProps)(Question);
