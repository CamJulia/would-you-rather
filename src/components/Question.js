import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import { saveQuestionAnswer } from '../actions/questions';
import { Redirect } from 'react-router-dom';

const percentBarStyle = {
  backgroundColor: 'rosybrown',
  height: '2em'
};

const AnsweredQuestion = props => {
  const {
    question,
    users,
    authedUser,
    votesOptionOne,
    votesOptionTwo,
    percentOne,
    percentTwo
  } = props;

  const renderPercentageBar = percentage => {
    return (
      <div className="percent">
        <div
          style={{
            ...percentBarStyle,
            ...{ width: `${percentage}%` }
          }}
        />
        <p>{percentage}%</p>
      </div>
    );
  };

  return (
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

        {renderPercentageBar(percentOne)}
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

        {renderPercentageBar(percentTwo)}
      </div>
    </div>
  );
};

const UnansweredQuestion = props => {
  const { question } = props;

  return (
    <div className="info-detail">
      <h3>Would you would rather...</h3>
      <button
        className="answerBtn"
        onClick={() => {
          props.dispatch(saveQuestionAnswer({ question, answer: 'optionOne' }));
        }}>
        {question.optionOne.text}
      </button>
      <p>or</p>
      <button
        className="answerBtn"
        onClick={() => {
          props.dispatch(saveQuestionAnswer({ question, answer: 'optionTwo' }));
        }}>
        {question.optionTwo.text}?
      </button>
    </div>
  );
};

const Question = props => {
  const { question, users, thisShitIsAnswered, redirect } = props;

  if (redirect) return <Redirect to="/question/does-not-exist" />;

  return (
    <div>
      <Nav />
      <div className="info-container">
        <div className="info-header">
          <img src={users[question.author].avatarURL} alt="avatar_image" />
          <h2>{users[question.author].name} asked:</h2>
        </div>
        {thisShitIsAnswered ? (
          <AnsweredQuestion {...props} />
        ) : (
          <UnansweredQuestion {...props} />
        )}
      </div>
    </div>
  );
};

function mapStateToProps({ questions, users, authedUser }, props) {
  const questionId = props.computedMatch.params.id;

  const question = questions[questionId];
  if (!question) return { redirect: true };

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
