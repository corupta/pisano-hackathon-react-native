import { Types } from '../../Utils';

export const add = (data) => ({
  type: Types.ACTIONS.FETCH_REQUEST,
  fetchType: Types.FETCHES.COMMENT_ADD,
  payload: data
});
