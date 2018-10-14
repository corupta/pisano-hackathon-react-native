import { Types } from '../Utils';
const { FETCHES } = Types;

const URL = 'https://exibyte-paperwork.herokuapp.com/api';

const myFetch = (path, method, body = {}, headers = {}, url = URL) =>
  fetch(`${url}${path}`, {
    method, headers: {
      // applicationcontext: 'analytics',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  });

const toArgs = (path, method, body, headers = {}) => {
  switch (method) {
    case 'GET':
      return { path: `${path}`, method, headers };
    default:
      return { path, method, body, headers };
  }
};

const getDocumentIndex = () =>
  toArgs('/nodes/', 'GET');

const getDocumentById = ({ id }) =>
  toArgs(`/nodes/${id}`, 'GET');

const postCommentByDocumentId = ({ id, comment }) =>
  toArgs(`/nodes/${id}`, 'POST', { hints: comment });

const getDocumentSearchResults = ({ param }) =>
  toArgs(`/???/${param}`, 'GET');

const getFunc = (fetchType) => {
  switch (fetchType) {
    case FETCHES.DOCUMENT_INDEX_GET:
      return getDocumentIndex;
    case FETCHES.DOCUMENT_GET:
      return getDocumentById;
    case FETCHES.COMMENT_ADD:
      return postCommentByDocumentId;
    case FETCHES.DOCUMENT_INDEX_SEARCH:
      return getDocumentSearchResults;
    default:
      throw new Error(`Fetch Type, ${fetchType} is not correct.`);
  }
};

const handleFetch = (fetchType, payload) => {
  const { path, method, body, headers } = getFunc(fetchType)(payload);
  console.debug('path:', path, 'method:', method, 'body:', body, 'headers:', headers);
  return myFetch(path, method, body, headers);
};

const handleError = ({ status, statusText }) => {
  if (!status.toString().startsWith('2')) {
    throw new Error(`${status} - ${statusText}`);
  }
};

export const fetchData = async(fetchType, data, browserToken, userToken) => {
  const rawResponse = await handleFetch(fetchType, data, browserToken, userToken);
  console.debug('rawResponse', rawResponse);
  const response = rawResponse.json ? await rawResponse.json() : rawResponse;
  handleError(response);
  console.debug('response', response);
  return response;
};
