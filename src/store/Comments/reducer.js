import { combineReducers } from 'redux';
import { Types } from '../../Utils';
import { selectComments } from '../reducer';

const loading = (state = false, action) => {
  const { type, fetchType } = action;
  if (fetchType === Types.FETCHES.COMMENT_ADD) {
    switch (type) {
      case Types.ACTIONS.FETCH_REQUEST:
        return true;
      case Types.ACTIONS.FETCH_SUCCESS:
      case Types.ACTIONS.FETCH_ERROR:
        return false;
    }
  }
  return state;
};

const errorReducer = (state = null, action) => {
  const { type, fetchType, error } = action;
  if (fetchType === Types.FETCHES.COMMENT_ADD) {
    switch (type) {
      case Types.ACTIONS.FETCH_REQUEST:
      case Types.ACTIONS.FETCH_SUCCESS:
        return null;
      case Types.ACTIONS.FETCH_ERROR:
        return error;
    }
  }
  return state;
};

export const commentReducer = combineReducers({
  loading,
  error: errorReducer
});

export const selectCommentLoading = (state) => selectComments(state).loading;
export const selectCommentPostError = (state) => selectComments(state).error;
