import { combineReducers } from 'redux';
import { documentReducer as documents } from './Documents/reducer';
import { documentIndexRouter as documentIndexes } from './DocumentIndexes/reducer';
import { dependencyReducer as dependencies } from './Dependencies/reducer';

export const rootReducer = combineReducers({
  documents,
  documentIndexes,
  dependencies
});

export const selectDocuments = (state) => state.documents;
export const selectDocumentIndexes = (state) => state.documentIndexes;
export const selectDependencies = (state) => state.dependencies;

