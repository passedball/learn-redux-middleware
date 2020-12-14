import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";
import { finishLoading, startLoading } from "./loading";

export const GET_POST         = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILUE';

export const GET_USERS         = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILUE';

const initialState = {
    loading: {
        GET_POST: false,
        GET_USERS: false,
    },
    post: null,
    users: null
};

export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);

function* getPostSaga(action) {
    yield put(startLoading(GET_POST));
    try {
        const post = yield call(api.getPost, action.payload);
        yield put({
            type: GET_POST_SUCCESS,
            payload: post.data
        });
    } catch (error) {
        yield put({
            type: GET_POST_FAILURE,
            payload: error,
            error: true
        });
    }
    yield put(finishLoading());
}

function* getUsersSaga(action) {
    yield put(startLoading(GET_USERS));
    try {
        const post = yield call(api.getUsers, action.payload);
        yield put({
            type: GET_USERS_SUCCESS,
            payload: post.data
        });
    } catch (error) {
        yield put({
            type: GET_USERS_FAILURE,
            payload: error,
            error: true
        });
    }
    yield put(finishLoading());
}

export function* sampleSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_USERS, getUsersSaga);
}

/*
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
*/

/*
export const getPost = (id) => async dispatch => {
    dispatch({type: GET_POST});
    try {
        const response = await api.getPost(id);
        dispatch({
            type: GET_POST_SUCCESS,
            payload: response
        });
    } catch (error) {
        dispatch({
            type: GET_POST_FAILURE,
            payload: error,
            error: true
        });
        throw error;        
    }
};

export const getUsers = () => async dispatch => {
    dispatch({type: GET_USERS});
    try {
        const response = await api.getUsers();
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response
        });
    } catch (error) {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: error,
            error: true
        });
        throw error;        
    }
};
*/

const sample = handleActions(
    {
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            post: action.payload
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            users: action.payload
        })
    },
    initialState
);


/*
const sample = handleActions(
    {
        [GET_POST]: state => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: true
            }
        }),
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false
            },
            post: action.payload.data
        }),
        [GET_POST_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false
            }
        }),

        [GET_USERS]: state => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: true
            }
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: false
            },
            users: action.payload.data
        }),
        [GET_USERS_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: false
            }
        }),
    },
    initialState
);
*/

export default sample;
