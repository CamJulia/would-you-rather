import React, { Component } from 'react'
import '../App.css';
import Player from './Player'


class Nav extends Component {
  render() {
    return (
      <div className='nav'>
        <div className='navbar'>
          <Player />
        </div>
        <div className='navbar-items'>
          <p>answer</p>
          <p>ask</p>
          <p>my history</p>
          <p>highscore</p>
          <p>logout</p>
        </div>
      </div>
    )
  }
}

export default Nav