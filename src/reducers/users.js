import { RECEIVE_USERS, ADD_ANSWER_TO_USER, ADD_QUESTION_TO_USER } from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS: {
      return {
        ...state,
        ...action.users
      }
    }

    case ADD_ANSWER_TO_USER: {
      const { user, answer, question } = action;
      const qid = question.id;

      return {
        ...state,
        [user]: {
          ...state[user],
          answers: {
            ...state[user].answers,
            [qid]: answer
          }
        }
      };
    }

    case ADD_QUESTION_TO_USER: {
      const { user, qid } = action;

      return {
        ...state,
        [user]: {
          ...state[user],
          questions: state[user].questions.concat([qid])
        }
      };
    }

    default:
      return state
  }
}