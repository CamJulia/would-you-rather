import { addAnswerToUser, addQuestionToUser } from './users';
import { formatQuestion } from '../_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';
export const ADD_QUESTION_TO_QUESTIONS = 'ADD_QUESTION_TO_QUESTIONS';


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}


export function addAnswerToQuestion({ user, question, answer }) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    user,
    question,
    answer
  }
}

export function saveQuestionAnswer({ question, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(addAnswerToQuestion({ user: authedUser, question, answer }));
    dispatch(addAnswerToUser({ user: authedUser, question, answer }));
  }
}

export function addQuestionToQuestions({ question }) {
  return {
    type: ADD_QUESTION_TO_QUESTIONS,
    question
  }
}

export function saveQuestion({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    const question = formatQuestion({ optionOneText, optionTwoText, author: authedUser });
    
    dispatch(addQuestionToQuestions({ question }));
    dispatch(addQuestionToUser({ user: authedUser, qid: question.id }));
  }
}