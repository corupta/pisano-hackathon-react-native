import { combineReducers } from 'redux';
import { documentReducer as documents } from './Documents/reducer';
import { documentIndexRouter as documentIndices } from './DocumentIndices/reducer';
import { dependencyReducer as dependencies } from './Dependencies/reducer';
import { commentReducer as comments } from './Comments/reducer';

export const rootReducer = combineReducers({
  documents,
  documentIndices,
  dependencies,
  comments
});

export const selectDocuments = (state) => state.documents;
export const selectDocumentIndices = (state) => state.documentIndices;
export const selectDependencies = (state) => state.dependencies;
export const selectComments = (state) => state.comments;
