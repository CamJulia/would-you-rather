import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  setAuthUser = e => {
    const name = e.currentTarget.getAttribute('name');
    this.props.dispatch(setAuthedUser(name));
  };

  render() {
    const { usersIds, users, authedUser } = this.props;

    if (!usersIds.length) return null;
    if (authedUser) {
      if (!this.props.location.state) return <Redirect to="/" />;
      return <Redirect to={`${this.props.location.state.from.pathname}`} />;
    }

    return (
      <div>
        <h1>Would you rather be...</h1>
        <div className="login">
          {usersIds.map(player => {
            return (
              <button
                className="player"
                key={users[player].id}
                name={users[player].id}
                onClick={this.setAuthUser}>
                <img
                  src={users[player].avatarURL}
                  alt={`Avatar of ${users[player].name}`}
                />
                <p>{users[player].name}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  return {
    usersIds: Object.keys(users),
    authedUser,
    users,
    questions
  };
}

export default connect(mapStateToProps)(Login);
