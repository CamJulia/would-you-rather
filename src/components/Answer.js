import React, { Component } from 'react'
import '../App.css';
import { connect } from 'react-redux'
import Nav from './Nav'

class Answer extends Component {



  render() {

    const { users, questions, authedUser, newQuestions } = this.props
    const player = users[authedUser]

    // questions asked by authedUser
    console.log('New Questions: ', newQuestions)

    return (
      <div >
        <Nav />
        <div className='answers'>
          <h1>Would you rather...</h1>
          <div className='answer'>
            {newQuestions.map(question => {
              console.log('This is a new question: ', question.optionOne.text)
              return (< div key={question.id} className='flexContainer' >
                <button className='answerBtn'>{question.optionOne.text}</button>
                <p>or</p>
                <button className='answerBtn'>{question.optionTwo.text}</button>
              </div>)
            })}
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps({ questions, authedUser, users }) {

  const newQuestions = []
  const answeredQuestions = Object.keys(users[authedUser].answers)

  console.log('Answered Questions>>>> ', answeredQuestions)

  for (let i in questions) {
    if (answeredQuestions.indexOf(i) > -1) {
      newQuestions.push(questions[i])
    } else {
      console.log('Already answered!')
    }
  }

  return {
    questions,
    authedUser,
    users,
    newQuestions
  }
}

export default connect(mapStateToProps)(Answer)