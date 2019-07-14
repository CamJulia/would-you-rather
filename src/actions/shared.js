import { _getQuestions, _getUsers } from '../../_DATA'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
// import { setAuthedUser } from './authedUser'

// const AUTHED_ID = 'johndoe'

export function getQuestions() {
  return (dispatch) => {
    return _getQuestions()
      .then(({ questions }) => {
        dispatch(receiveQuestions(questions))
      }
      )
  }
}

export function getUsers() {
  return (dispatch) => {
    return _getUsers()
      .then(({ users }) => {
        dispatch(receiveUsers(users))
      }
      )
  }
}