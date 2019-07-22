import React, { Component } from 'react'
import '../App.css';
import { connect } from 'react-redux'
import Answer from './Answer'
import History from './History'
import { setAuthedUser } from '../actions/authedUser';
import Highscore from './Highscore';
import Login from './Login';
import Ask from './Ask';
import { Route } from 'react-router-dom'

class Page extends Component {
  setAuthUser = (e) => {
    const name = e.currentTarget.getAttribute('name');
    this.props.dispatch(setAuthedUser(name))
  }

  render() {
    return (
      <div>
        {
          this.props.authedUser ?
            <>
              {this.props.loading === true
                ? null
                : <div>
                  <Route exact path='/' component={Answer}></Route>
                  <Route exact path='/history' component={History}></Route>
                  <Route exact path='/highscore' component={Highscore}></Route>
                  <Route exact path='/ask' component={Ask}></Route>
                  <Route exact path='/login' component={Login}></Route>
                </div>}

            </>
            : <div className='loginScreen'>
              <Route exact path='/' component={Login}></Route>
            </div>
        }

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

export default connect(mapStateToProps)(Page)
