import { combineReducers } from 'redux';

import { Types, Searcher } from '../../Utils';
import { selectDocumentIndices } from '../reducer';

const searcher = (state = new Searcher(['name']), action) => {
  const { type, fetchType, payload } = action;
  if (type === Types.ACTIONS.FETCH_SUCCESS) {
    switch (fetchType) {
      case Types.FETCHES.DOCUMENT_INDEX_GET:
        return new Searcher(['name'], payload);
    }
  }
  return state;
};

const results = (state = [], action) => {
  const { type, fetchType, payload } = action;
  if (type === Types.ACTIONS.FETCH_SUCCESS) {
    switch (fetchType) {
      case Types.FETCHES.DOCUMENT_INDEX_SEARCH:
        return payload;
    }
  }
  return state;
};

const loading = (state = false, action) => {
  const { type, fetchType } = action;
  if (fetchType === Types.FETCHES.DOCUMENT_INDEX_SEARCH) {
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

const ready = (state = false, action) => {
  const { type, fetchType } = action;
  if (fetchType === Types.FETCHES.DOCUMENT_INDEX_GET) {
    switch (type) {
      case Types.ACTIONS.FETCH_REQUEST:
        return true;
      case Types.ACTIONS.FETCH_ERROR:
        return false;
      case Types.ACTIONS.FETCH_SUCCESS:
        return true;
    }
  }
  return state;
};

export const documentIndexRouter = combineReducers({
  searcher,
  results,
  loading,
  ready
});

export const selectDocumentSearcher = (state) => selectDocumentIndices(state).searcher;
export const selectDocumentSearchResults = (state) => selectDocumentIndices(state).results;
export const selectDocumentSearcherLoading = (state) => selectDocumentIndices(state).loading;
export const selectDocumentSearcherReady = (state) => selectDocumentIndices(state).ready;
