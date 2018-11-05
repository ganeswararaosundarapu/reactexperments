import { FEATCH_QUESTIONS, INVALIDATE_REQUEST, REQUEST_FEATCHING, FEATCH_QUESTION, DELETE_QUESTION } from './question_actions';
import _ from 'lodash';

export default (state = {
    isFetching: false,
    didInvalidate: false,
    lists: {}
  }, action) => {
  console.log(`${action.type} action called with payload`, action);
  console.log(`${action.type} state values `, state);
  switch (action.type) {
    case INVALIDATE_REQUEST:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_FEATCHING:
    return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case FEATCH_QUESTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lists: _.mapKeys(action.payload, '_id')
      })
    case FEATCH_QUESTION:
      const mergeLists = Object.assign({}, state.lists, _.mapKeys(action.payload, '_id'))
      return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          lists: mergeLists
        })
    case DELETE_QUESTION:
      state.lists = _.omit(state.lists, action.payload)
      return Object.assign({}, state, {
         isFetching: false,
         didInvalidate: false
        })

    default:
      return state
  }
}
