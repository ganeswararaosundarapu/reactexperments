import { combineReducers } from 'redux';
import fetchQuestions from './questions/question_reducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  questions: fetchQuestions,
  form: formReducer
});

export default rootReducer;
