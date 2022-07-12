import {createStore, combineReducers} from 'redux';
import {createAction, handleActions} from 'redux-actions';

const appInitialState = {
    heartBeat: false,
    arr: [],
    counter: 0,
    attempt: 0,
    received: 0,
    failed: 0,
    loaded: false

};

// const SET_HEART_BEAT = 'SET_HEART_BEAT';
// const SET_DATA = 'SET_DATA';
const RESET_DATA = 'RESET_DATA';
const INCREASE_ATTEMPT = 'INCREASE_ATTEMPT';
const INCREASE_RECEIVED = 'INCREASE_RECEIVED';
const INCREASE_FAILED = 'INCREASE_FAILED';
const SET_LOADED = 'SET_LOADED';

// export const setHeartBeat = createAction(SET_HEART_BEAT);
// export const setDataAction = createAction(SET_DATA);
export const resetDataAction = createAction(RESET_DATA);
export const increaseAttempt = createAction(INCREASE_ATTEMPT);
export const increaseReceived = createAction(INCREASE_RECEIVED);
export const increaseFailed = createAction(INCREASE_FAILED);
export const setLoaded = createAction(SET_LOADED);


const App = handleActions({

    // SET_HEART_BEAT: (state, { payload }) => {
    //   return {
    //     ...state,
    //     counter: payload ? ++state.counter : state.counter,
    //     heartBeat: payload,
    //   };
    // },

    // SET_DATA: (state, { payload }) => {
    //   return {
    //     ...state,
    //     counter: ++state.counter,
    //     arr: [...state.arr, payload],
    //
    //   };
    // },

    RESET_DATA: (state) => ({ ...state, attempt: 0, received: 0, failed: 0 }),
    INCREASE_ATTEMPT: (state) => ({ ...state, attempt: ++state.attempt }),
    INCREASE_RECEIVED: (state) => ({ ...state, received: ++state.received }),
    INCREASE_FAILED: (state) => ({ ...state, failed: ++state.failed }),
    SET_LOADED: (state, {payload}) => ({...state, loaded: payload})
  },
  appInitialState,
);

const rootReducer = combineReducers({
    App
});

const configureStore = () => createStore(rootReducer);
export const store = configureStore();
