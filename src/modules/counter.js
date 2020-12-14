import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

const { createAction, handleActions } = require("redux-actions");

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const increaseAsync = createAction(INCREASE_ASYNC, ()=>undefined );
export const decreaseAsync = createAction(DECREASE_ASYNC, ()=>undefined );

function* increaseSaga() {
    yield delay(1000);
    yield put(increase());
}

function* decreaseSaga() {
    yield delay(1000);
    yield put(decrease());
}

export function* counterSaga() {
    yield takeEvery(INCREASE_ASYNC, increaseSaga);
    yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}
/*
const { createAction, handleActions } = require("redux-actions");

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// with redux-actions
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// with redux-thunk
export const increaseAsync = () => dispatch => {
    setTimeout(() => {
        dispatch(increase());
    }, 1000);
};

export const decreaseAsync = () => dispatch => {
    setTimeout(() => {
        dispatch(decrease());
    }, 1000);
};

*/

const initialState = 0;

const counter = handleActions(
    {
        [INCREASE]: state => state + 1,
        [DECREASE]: state => state - 1
    },
    initialState
);

export default counter;
