import { Types } from '../../Utils';
import { selectDocuments } from '../reducer';
import { selectDependenciesByDocument } from '../Dependencies/reducer';

export const documentReducer = (state = {}, action) => {
  const { type, fetchType, payload } = action;
  if (type === Types.ACTIONS.FETCH_SUCCESS) {
    switch (fetchType) {
      case Types.FETCHES.DOCUMENT_GET:
        return {
          ...state,
          ...payload.reduce((acc, document) => ({
            ...acc,
            [document._id]: document
          }), {})
        };
      case Types.FETCHES.COMMENT_ADD:
        return {
          ...state,
          [payload._id]: payload
        };
    }
  }
  return state;
};

export const selectDocumentById = (state, documentId, defaultReturn = []) =>
  selectDocuments(state)[documentId] || defaultReturn;
export const selectSubDocumentsByDocument = (state, documentId) =>
  selectDependenciesByDocument(state, documentId)
    .map((subdocumentId) => selectDocumentById(state, subdocumentId));
