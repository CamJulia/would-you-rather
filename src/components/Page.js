import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { setAuthedUser } from '../actions/authedUser';
import Highscore from './Highscore';
import Login from './Login';
import Ask from './Ask';
import Question from './Question';
import { Route } from 'react-router-dom';

class Page extends Component {
  setAuthUser = e => {
    const name = e.currentTarget.getAttribute('name');
    this.props.dispatch(setAuthedUser(name));
  };

  render() {
    return (
      <div>
        {this.props.authedUser ? (
          <>
            {this.props.loading === true ? null : (
              <div>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/leaderboard" component={Highscore} />
                <Route exact path="/add" component={Ask} />
                <Route exact path="/login" component={Login} />
                <Route path="/questions/:id" component={Question} />
              </div>
            )}
          </>
        ) : (
          <div className="loginScreen">
            <Route exact path="/" component={Login} />
          </div>
        )}
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

export default connect(mapStateToProps)(Page);
