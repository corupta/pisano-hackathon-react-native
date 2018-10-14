import { Types } from '../../Utils';

export const getDocument = (data) => ({
  type: Types.ACTIONS.FETCH_REQUEST,
  fetchType: Types.FETCHES.DOCUMENT_GET,
  payload: data
});
