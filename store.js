import { createStore, combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import axios from "axios";
const appInitialState = {
    heartBeat: false,
    counter: 0
};

const SET_HEART_BEAT = 'SET_HEART_BEAT';
export const setHeartBeat = createAction(SET_HEART_BEAT);

const App = handleActions({
        [SET_HEART_BEAT]: (state, {payload}) => {
            // console.log('test store', state)
            return {
                ...state,
                counter: ++state.counter,
                heartBeat: payload,
            }

        },
    },
    appInitialState,
);

const rootReducer = combineReducers({
  App,
});

const configureStore = () => createStore(rootReducer);
export const store = configureStore();
