import React, { Component } from 'react'
import '../App.css';
import { connect } from 'react-redux'
import Nav from './Nav'
import WouldYou from './WouldYou'
import Answer from './Answer'
import Stats from './Stats'
import History from './History'
import { setAuthedUser } from '../actions/authedUser';

class Page extends Component {
  setAuthUser = (e) => {
    const name = e.currentTarget.getAttribute('name');
    this.props.dispatch(setAuthedUser(name))
  }

  renderUsers() {
    const { usersIds, users } = this.props;

    if (!usersIds.length) return null;

    return (
      usersIds.map((player) => {
        console.log('Player please: ', player)
        return <button className='player' key={users[player].id} name={users[player].id} onClick={this.setAuthUser}>
          {/* <div className='player'> */}
          <img src={users[player].avatarURL} alt={`Avatar of ${users[player].name}`} />
          <p>{users[player].name}</p>
          {/* </div> */}
        </button >
      })
    );
  }

  render() {
    return (
      <div>
        {
          this.props.authedUser ?
            <>
              < Nav />
              <WouldYou />
              <History />
              {/* <Answer />
              <Stats /> */}
            </>
            : <div className='loginScreen'>
              <WouldYou />
              {this.renderUsers()}
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
