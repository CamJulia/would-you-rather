import { _getQuestions, _getUsers } from '../_DATA'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'

export function getQuestions() {
  return (dispatch) => {
    return _getQuestions()
      .then(questions => {
        dispatch(receiveQuestions(questions))
      }
      )
  }
}

export function getUsers() {
  return (dispatch) => {
    return _getUsers()
      .then(users => {
        dispatch(receiveUsers(users))
      }
      )
  }
}