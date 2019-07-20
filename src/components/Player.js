import React, { Component } from 'react'
import '../App.css';
import { connect } from 'react-redux'

class Player extends Component {

  render() {
    let player = {}

    this.props.player ?
      player = this.props.player
      : player = { name: 'no name', avatarURL: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2FUsers%2Fcircled_user_female1600.png&f=1' }


    return (

      <div className='player'>
        <img src={player.avatarURL} alt={`Avatar of ${player.name}`} />
        <p>{player.name}</p>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  const player = users[authedUser]
  return {
    player
  }
}

export default connect(mapStateToProps)(Player)