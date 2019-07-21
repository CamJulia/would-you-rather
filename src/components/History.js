import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import Nav from './Nav'

class History extends Component {
  render() {

    const { users, questions, authedUser, askedQuestions, answeredQuestions } = this.props

    return (
      <div>
        <Nav />
        <h1>Your history</h1>
        <div className='flexContainer'>
          <div className='flexItem'>
            <h2>Questions asked by you</h2>
            <h3>Would you rather...</h3>
            {askedQuestions.map(question => {
              return <div>
                <p>...{question.optionOne.text} or {question.optionTwo.text}?</p>
              </div>
            })}
          </div>

          <div className='flexItem'>
            <h2>Questions answered by you</h2>
            <h3>You would rather...</h3>
            {answeredQuestions.map(question => {
              if (question[1] === 'optionOne') {
                return (
                  <div key={question.id}>
                    <p>...<b>{question[0].optionOne.text}</b> than {question[0].optionTwo.text}!</p>
                  </div>)
              } else {
                return (
                  <div key={question.id}>
                    <p>...<b>{question[0].optionTwo.text}</b> than {question[0].optionOne.text}!</p>
                  </div>)
              }
            })}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser, users }) {

  const askedQuestions = [];
  const answeredQuestions = [];

  users[authedUser].questions.forEach((question) => {
    askedQuestions.push(questions[question])
  })

  for (let i in users[authedUser].answers) {
    answeredQuestions.push([
      questions[i], // the actual question object from questions | OBJECT
      users[authedUser].answers[i] // the selected option for this question | STRING
    ]);
  }

  return {
    questions,
    authedUser,
    users,
    askedQuestions,
    answeredQuestions
  }
}

export default connect(mapStateToProps)(History)