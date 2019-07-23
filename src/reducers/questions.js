import { RECEIVE_QUESTIONS, ADD_ANSWER_TO_QUESTION, ADD_QUESTION_TO_QUESTIONS } from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS: {
      return {
        ...state,
        ...action.questions
      }
    }

    case ADD_ANSWER_TO_QUESTION: {
      const { user, answer, question } = action;
      const votes = question[answer].votes.concat([user]);

      return {
        ...state,
        [question.id]: {
          ...question,
          [answer]: {
            ...question[answer],
            votes
          }
        }
      };
    }

    case ADD_QUESTION_TO_QUESTIONS: {
      const { question } = action;

      return {
        ...state,
        [question.id]: question
      };
    }

    default:
      return state
  }
}

