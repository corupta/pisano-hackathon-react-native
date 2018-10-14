import { Types } from '../../Utils';
import { selectDependencies } from '../reducer';

export const dependencyReducer = (state = {}, action) => {
  const { type, fetchType, payload, request } = action;
  if (type === Types.ACTIONS.FETCH_SUCCESS) {
    switch (fetchType) {
      case Types.FETCHES.DOCUMENT_GET:
        return {
          ...state,
          [request.id]: payload.map(({ _id }) => _id).slice(1)
          // first result is the document itself, thus, slice it away
        };
    }
  }
  return state;
};

export const selectDependenciesByDocument = (state, documentId) => selectDependencies(state)[documentId] || [];
