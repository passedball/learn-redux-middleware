import { startLoading, finishLoading } from "../modules/loading";

const createRequestThunk = (type, request) => {
    const SUCCESS = type + '_SUCCESS';
    const FAILURE = type + '_FAILURE';
    return params => async dispatch => {
        dispatch({ type });
        try {
            const response = await request(params);
            dispatch({
                type: SUCCESS,
                payload: response.data
            });
            dispatch(finishLoading(type));
        } catch (error) {
            dispatch({
                type: FAILURE,
                payload: error,
                error: true
            });
            dispatch(startLoading(type));
        }
    };
};

export default createRequestThunk;