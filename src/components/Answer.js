import React, { Component } from 'react'
import '../App.css';
import { connect } from 'react-redux'
import Nav from './Nav'
import { saveQuestionAnswer } from '../actions/questions';

class Answer extends Component {

  render() {

    const { newQuestions } = this.props

    return (
      <div >
        <Nav />
        <div className='answers'>
          <h1>Would you rather...</h1>
          <div className='answer'>
            {newQuestions.length === 0 ?
              <div><h2>No questions left to answer.</h2>
                <h3>How about you ask a question yourself?</h3></div>
              : newQuestions.map(question => {
                return (< div key={question.id} className='flexContainer' >
                  <button className='answerBtn' onClick={() => {
                    this.props.dispatch(saveQuestionAnswer({ question, answer: 'optionOne' }))
                  }
                  }>{question.optionOne.text}</button>
                  <p>or</p>
                  <button className='answerBtn' onClick={() => {
                    this.props.dispatch(saveQuestionAnswer({ question, answer: 'optionTwo' }))
                  }}>{question.optionTwo.text}</button>
                </div>)
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser, users }) {

  const newQuestions = []
  const answeredQuestions = Object.keys(users[authedUser].answers)

  for (let i in questions) {
    if (answeredQuestions.indexOf(i) === -1) newQuestions.push(questions[i]);
  }

  return {
    questions,
    authedUser,
    users,
    newQuestions
  }
}

export default connect(mapStateToProps)(Answer)