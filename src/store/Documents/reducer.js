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
          ...payload.reduce(document.reduce((acc, document) => ({
            ...acc,
            [document._id]: document
          }), {}))
        };
      case Types.FETCHES.COMMENT_ADD:
        return {
          ...state,
          [payload.documentId]: {
            ...state[payload.documentId],
            hints: [...state[payload.documentId].hints, payload.hint]
          }
        };
    }
  }
  return state;
};

export const selectDocumentById = (state, documentId) => selectDocuments(state)[documentId] || [];
export const selectSubDocumentsByDocument = (state, documentId) =>
  selectDependenciesByDocument(documentId)
    .map((subdocumentId) => selectDocumentById(state, subdocumentId));
