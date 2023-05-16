import axios from 'axios';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import App from './components/App.js';

function* rootSaga() {
  yield takeEvery('SAGA/FETCH_JOBS', fetchAllJobs);
  yield takeEvery('SAGA/FETCH_NEW_JOBS', fetchNewJobs);
  yield takeEvery('SAGA/POST_NEW_JOBS', postNewJobs);
}

function* fetchAllJobs () {
  console.log('in FetchAllJobs')
  try {
      const jobs = yield axios.get('/db');
      yield put({ type: 'SET_JOBS', payload: jobs.data});
  } catch {
      console.log('Error in fetchAllJobs');
  }    
};

function* fetchNewJobs () {
  console.log('in FetchNewJobs')
  try {
      const newJobs = yield axios.get('/get');
      yield put({ type: 'SET_NEW_JOBS', payload: newJobs.data});
  } catch {
      console.log('Error in fetchNewJobs');
  }    
};

function* postNewJobs (action) {
  console.log('in PostNewJobs - action.payload: ', action.payload)
  try {
      yield axios({
        method: 'POST',
        url: '/db',
        data: action.payload
      })
      yield put({ type: 'SAGA/FETCH_JOBS' });
  } catch {
      console.log('Error in postNewJobs');
  }    
};

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const jobs = (state = [], action) => {
  switch (action.type) {
      case 'SET_JOBS':
          return action.payload;
      default:
          return state;
  }
};

const newJobs = (state = [], action) => {
  switch (action.type) {
      case 'SET_NEW_JOBS':
          return action.payload;
      default:
          return state;
  }
};

const storeInstance = createStore(
  combineReducers({
    jobs,
    newJobs
  }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>
)