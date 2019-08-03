import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import Nav from './Nav';

class Highscore extends Component {
  render() {
    const { authedUser, userScores, users } = this.props;

    return (
      <>
        <Nav />
        <h1>Leaderboard</h1>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Questions answered</th>
                <th>Questions asked</th>
                <th>Score</th>
              </tr>
              {userScores.map((user, idx) => {
                const { name, answers, questions, score, avatar } = user;
                const me = users[authedUser].name;

                if (name === me) {
                  return (
                    <tr className="myScore" key={idx}>
                      <td>
                        <img src={avatar} alt="avatar_image" />
                        {name}
                      </td>
                      <td>{answers}</td>
                      <td>{questions}</td>
                      <td>{score}</td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={idx}>
                      <td>
                        <img src={avatar} alt="avatar_image" />
                        {name}
                      </td>
                      <td>{answers}</td>
                      <td>{questions}</td>
                      <td>{score}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  let userScores = [];

  for (let i in users) {
    userScores.push({
      name: users[i]['name'], // gets users name
      answers: Object.keys(users[i]['answers']).length, // gets number of answers
      questions: users[i]['questions'].length, // gets number of questions
      score:
        Object.keys(users[i]['answers']).length + users[i]['questions'].length, //get score
      avatar: users[i]['avatarURL']
    });
  }

  userScores.sort((userOne, userTwo) => {
    return userTwo.score - userOne.score;
  });

  return {
    authedUser,
    users,
    userScores
  };
}

export default connect(mapStateToProps)(Highscore);
