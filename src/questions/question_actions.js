import axios from 'axios';

const ROOT_URL = "http://localhost:9000";
export const FEATCH_QUESTIONS = 'FEATCH_QUESTIONS';
export const FEATCH_QUESTION = 'FEATCH_QUESTION';
export const INVALIDATE_REQUEST = 'INVALIDATE_REQUEST';
export const REQUEST_FEATCHING = 'REQUEST_FEATCHING';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION'



// Called when the api call initiated
export const requestFeatching = () => {
  return {
    type: REQUEST_FEATCHING,
    payload: {}
  }
}

// Called when the api call getting any error
export const invalidateRequest = () => {
  return {
    type: INVALIDATE_REQUEST,
    payload: {}
  }
}

// fetch all posts
export const fetchQuestions = () => dispatch => {
  dispatch(requestFeatching());
  return axios.get(`${ROOT_URL}/questions`).
    then(response => {
      console.log(`${FEATCH_QUESTIONS} Response`, response);
      dispatch(({
        type: FEATCH_QUESTIONS,
        payload: response.data
      }))
    }).
    catch(err => onError(err, FEATCH_QUESTIONS));
}

//fetch the specific post
export const fetchQuestion = (id) => dispatch => {
  dispatch(requestFeatching());
  return axios.get(`${ROOT_URL}/questions/${id}`).
    then(response => {
      dispatch(({
        type: FEATCH_QUESTION,
        payload: response.data
      }))
    }).
    catch(err => onError(err, FEATCH_QUESTION));
}

export const createQuestion = (inputData) => dispatch => {
  dispatch(requestFeatching());
  return axios.post(`${ROOT_URL}/questions`, inputData).
    then(response => {
      dispatch(({
        type: CREATE_QUESTION,
        payload: response.data
      }))
    }).
    catch(err => onError(err, CREATE_QUESTION));
}

export const updateQuestion = (id, inputData) => dispatch => {
  dispatch(requestFeatching());
  return axios.put(`${ROOT_URL}/questions/${id}`, inputData).
    then(response => {
      dispatch(({
        type: UPDATE_QUESTION,
        payload: response.data
      }))
    }).
    catch(err => onError(err, UPDATE_QUESTION));
}

export const deleteQuestion = id => dispatch => {
  dispatch(requestFeatching());
  return axios.delete(`${ROOT_URL}/questions/${id}`).
    then((res) =>
      dispatch({
        type: DELETE_QUESTION,
        payload: id
      })
    ).
    catch(err => onError(err, DELETE_QUESTION))
}

export const fetchQuestionIfNeeded = (id) => (dispatch, getState) => {
  console.log("Inside fetchQuestionIfNeeded action creator", getState(), id);
  const list  =  getState().questions.lists[id];

  if(!list){
    console.log("Call Initiated from fetchQuestionIfNeeded action creator");
    return dispatch(fetchQuestion(id))
  }
}

const onError = (err, actionRequest) => {
  console.error(`Getting error while calliing ${actionRequest} with`, err);
}
