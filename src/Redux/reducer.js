import { ERROR } from './actions';

export let reducer = (state = { }, action) => {
    switch(action.type){
        case ERROR:
            return {
                ...state,
                error: {...action.error}
            }
        default:
            return {...state};
    }
}