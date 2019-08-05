import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { setAuthedUser } from '../actions/authedUser';
import Highscore from './Highscore';
import Login from './Login';
import Ask from './Ask';
import Question from './Question';
import NoMatch from './NoMatch';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

class Page extends Component {
  setAuthUser = e => {
    const name = e.currentTarget.getAttribute('name');
    this.props.dispatch(setAuthedUser(name));
  };

  render() {
    return (
      <div>
        <>
          {this.props.loading === true ? null : (
            <div>
              <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute
                  exact
                  path="/"
                  component={Dashboard}
                  {...this.props}
                />
                <PrivateRoute
                  exact
                  path="/leaderboard"
                  component={Highscore}
                  {...this.props}
                />
                <PrivateRoute
                  exact
                  path="/add"
                  component={Ask}
                  {...this.props}
                />
                <PrivateRoute
                  path="/questions/:id"
                  component={Question}
                  {...this.props}
                />
                <Route component={NoMatch} />
              </Switch>
            </div>
          )}
        </>
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
