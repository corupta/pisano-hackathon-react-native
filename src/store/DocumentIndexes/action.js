import { Types } from '../../Utils';

export const getDocumentIndex = (data) => ({
  type: Types.ACTIONS.FETCH_REQUEST,
  fetchType: Types.FETCHES.DOCUMENT_INDEX_GET,
  payload: data
});

export const searchIndex = (data) => ({
  type: Types.ACTIONS.FETCH_REQUEST,
  fetchType: Types.FETCHES.DOCUMENT_INDEX_SEARCH,
  payload: data
});
