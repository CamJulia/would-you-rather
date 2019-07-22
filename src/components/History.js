import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import Nav from './Nav'

class History extends Component {
  render() {

    const { askedQuestions, answeredQuestions } = this.props

    return (
      <div>
        <Nav />
        <h1>Your history</h1>
        <div className='flexContainer'>
          <div className='flexItem'>
            <h2>Questions asked by you</h2>
            <h3>Would you rather...</h3>
            {askedQuestions.map(question => {

              return <div key={question.id + 'myQuestion'}>
                <p>...{question.optionOne.text} or {question.optionTwo.text}?</p>
                <hr />
              </div>
            })}
          </div>

          <div className='flexItem'>
            <h2>Questions answered by you</h2>
            <h3>You would rather...</h3>
            {answeredQuestions.map(question => {

              const votesOptionOne = question[2]
              const votesOptionTwo = question[3]
              const percentOne = (100 / (votesOptionOne + votesOptionTwo) * votesOptionOne)
              const percentTwo = (100 / (votesOptionOne + votesOptionTwo) * votesOptionTwo)

              if (question[1] === 'optionOne') {
                return (
                  <div key={question.id + question[0].optionOne.text}>
                    <p>...<b>{question[0].optionOne.text}</b> than {question[0].optionTwo.text}!</p>
                    <p>(Just like <b>{percentOne}%</b> of players.)</p>
                    <hr />
                  </div>)
              } else {
                return (
                  <div key={question.id = question[0].optionTwo.text}>
                    <p>...<b>{question[0].optionTwo.text}</b> than {question[0].optionOne.text}!</p>
                    <p>(Just like <b>{percentTwo}%</b> of players.)</p>
                    <hr />
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
      users[authedUser].answers[i], // the selected option for this question | STRING
      questions[i].optionOne.votes.length, // how many people voted for this option
      questions[i].optionTwo.votes.length, // how many people voted for this option
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