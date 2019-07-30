import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { Link } from 'react-router-dom';

import Nav from './Nav';

const answeredPollQuestion = (question, users) => {
  const { question: q } = question;
  return (
    <div key={q.id} className="dash-q">
      <div className="dash-q-detail">
        <h3>{users[q.author].name} asks:</h3>
        <img src={users[q.author].avatarURL} alt="avatar_image" />
      </div>
      <div className="dash-q-detail">
        <h3>Would you rather...</h3>
        <p>{q.optionOne.text}...</p>
        <Link to={`/questions/${q.id}`}>
          <button>View Poll</button>
        </Link>
      </div>
    </div>
  );
};

class Dashboard extends Component {
  state = {
    view: 'unanswered'
  };

  render() {
    const { answeredQuestions, unansweredQuestions, users } = this.props;

    return (
      <div>
        <Nav />
        <div className="dashboard">
          <div className="dashboard-btns">
            <button
              onClick={() => {
                this.setState({ view: 'unanswered' });
              }}>
              Unanswered
            </button>
            <button
              onClick={() => {
                this.setState({ view: 'answered' });
              }}>
              Answered
            </button>
          </div>
          <div className="dashboard-qs">
            {this.state.view === 'unanswered' ? (
              <h2>Unanswered Questions</h2>
            ) : (
              <h2>Answered Questions</h2>
            )}

            {this.state.view === 'unanswered' ? (
              unansweredQuestions.length > 0 ? (
                unansweredQuestions.map(question =>
                  answeredPollQuestion(question, users)
                )
              ) : (
                <h3>Sorry, no questions left to answer.</h3>
              )
            ) : answeredQuestions.length > 0 ? (
              answeredQuestions.map(question =>
                answeredPollQuestion(question, users)
              )
            ) : (
              <h3>Sorry, you have no question answered yet.</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, authedUser, users }) => {
  const answeredQuestions = [];
  const unansweredQuestions = [];

  for (let i in users[authedUser].answers) {
    answeredQuestions.unshift({
      question: questions[i], // the actual question object from questions | OBJECT
      answer: users[authedUser].answers[i], // the selected option for this question | STRING
      votesOptionOne: questions[i].optionOne.votes.length, // how many people voted for this option
      votesOptionTwo: questions[i].optionTwo.votes.length // how many people voted for this option
    });
  }

  const leAnsweredQuestions = Object.keys(users[authedUser].answers);

  for (let questionKey in questions) {
    if (leAnsweredQuestions.indexOf(questionKey) === -1) {
      unansweredQuestions.unshift({ question: questions[questionKey] });
    }
  }

  return {
    answeredQuestions,
    unansweredQuestions,
    authedUser,
    users
  };
};

export default connect(mapStateToProps)(Dashboard);
