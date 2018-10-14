import { call, put, all, take, fork, cancel, select, delay } from 'redux-saga/effects';
import { Types } from '../Utils';
import { fetchData } from './fetch';
import { selectDocumentSearcher } from './DocumentIndexes/reducer';

const { ACTIONS } = Types;

const fakingSearch = true;
// change above line to false and it will start to use server for autocomplete search
// (also provide correct endpoint in fetch.js)
const searchFakeDelayDuration = 200;

function *fetchSearchResults(action) {
  // fake auto-complete searcher easily pluggable to backend (there's no autocomplete search in backend)
  const request = action.payload || {};
  const searcher = yield select(selectDocumentSearcher);
  try {
    const data = yield call(searcher.search, action.payload);
    // add fake delay
    yield call(delay, searchFakeDelayDuration);
    yield put({ type: ACTIONS.FETCH_SUCCESS, fetchType: action.fetchType, payload: data, request });
  } catch (error) {
    yield put({ type: ACTIONS.FETCH_ERROR, fetchType: action.fetchType, error: 'Weird error on search?', request });
  }
}

function *fetchRequest(action) {
  const request = action.payload || {};
  try {
    const data = yield call(fetchData, action.fetchType, action.payload);
    yield put({ type: ACTIONS.FETCH_SUCCESS, fetchType: action.fetchType, payload: data, request });
  } catch (error) {
    yield put({ type: ACTIONS.FETCH_ERROR, fetchType: action.fetchType, error: error.message, request });
  }
}


function *watchFetches() {
  const tasks = {};
  while (true) {
    const action = yield take(ACTIONS.FETCH_REQUEST);
    if (tasks[action.fetchType]) {
      yield cancel(tasks[action.fetchType]);
    }
    if (action.fetchType === Types.FETCHES.DOCUMENT_INDEX_SEARCH && fakingSearch) {
      tasks[action.fetchType] = yield fork(fetchSearchResults, action);
    } else {
      tasks[action.fetchType] = yield fork(fetchRequest, action);
    }
  }
  // yield takeEvery(ACTIONS.FETCH_REQUEST, fetchRequest);
}

export default function *rootSaga() {
  try {
    yield all([watchFetches()]);
  } catch (error) {
    console.log('error at root saga', error.toString());
  }
}
