import {createStore, combineReducers} from 'redux';
import {createAction, handleActions} from 'redux-actions';

const appInitialState = {
    heartBeat: false,
    arr: [],
    counter: 0
};

const SET_HEART_BEAT = 'SET_HEART_BEAT';
const SET_DATA = 'SET_DATA';
const RESET_DATA = 'RESET_DATA';
export const setHeartBeat = createAction(SET_HEART_BEAT);
export const setDataAction = createAction(SET_DATA);
export const resetDataAction = createAction(RESET_DATA);

const App = handleActions({

        SET_HEART_BEAT: (state, {payload}) => {
            return {
                ...state,
                counter: payload ? ++state.counter : state.counter,
                heartBeat: payload,
            }
        },

        SET_DATA: (state, {payload}) => {
            return {
                ...state,
                counter: ++state.counter,
                arr: [...state.arr, payload]

            }
        },

        RESET_DATA: (state, {payload}) => {
            return {
                ...state,
                counter: 0,
                arr: []

            }
        }
    },
    appInitialState,
);

const rootReducer = combineReducers({
    App
});

const configureStore = () => createStore(rootReducer);
export const store = configureStore();
