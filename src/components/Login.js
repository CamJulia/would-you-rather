import React, { Component } from 'react'
import Player from './Player'

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Would you rather be...</h1>
        <button>
          <Player />
        </button>
      </div>
    )
  }
}

export default Login