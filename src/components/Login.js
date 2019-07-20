import React, { Component } from 'react'
// import Player from './Player'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  setAuthUser = (e) => {
    const name = e.currentTarget.getAttribute('name');
    this.props.dispatch(setAuthedUser(name))
  }

  render() {

    const { usersIds, users } = this.props;
    if (!usersIds.length) return null;


    return (
      <div>
        <h1>Would you rather be...</h1>
        {usersIds.map((player) => {

          return <button className='player' key={users[player].id} name={users[player].id} onClick={this.setAuthUser}>
            <img src={users[player].avatarURL} alt={`Avatar of ${users[player].name}`} />
            <p>{users[player].name}</p>
          </button >
        })}
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  return {
    usersIds: Object.keys(users),
    authedUser,
    users,
    questions
  }
}

export default connect(mapStateToProps)(Login)