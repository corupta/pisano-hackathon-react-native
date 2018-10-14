import { combineReducers } from 'redux';

import { Types, Searcher } from '../../Utils';
import { selectDocumentIndexes } from '../reducer';

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

export const documentIndexRouter = combineReducers({
  searcher,
  results
});

export const selectDocumentSearcher = (state) => selectDocumentIndexes(state).searcher;
export const selectDocumentSearchResults = (state) => selectDocumentIndexes(state).results;
