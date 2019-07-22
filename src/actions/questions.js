import { addAnswerToUser, addQuestionToUser } from './users';
import { generateUID } from '../_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';
export const ADD_QUESTION_TO_QUESTION = 'ADD_QUESTION_TO_QUESTION';


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

export function addQuestionToQuestion({ user, qid, optionOne, optionTwo }) {
  return {
    type: ADD_QUESTION_TO_QUESTION,
    user,
    qid,
    optionOne,
    optionTwo
  }
}

export function saveQuestion({ optionOne, optionTwo }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const qid = generateUID();
    console.log('This is saveQuestion: ', optionOne, optionTwo, authedUser, qid)
    dispatch(addQuestionToQuestion({ user: authedUser, qid, optionOne, optionTwo }));
    dispatch(addQuestionToUser({ user: authedUser, qid, }));
  }
}