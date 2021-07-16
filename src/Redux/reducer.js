import { ERROR } from './actions';
import { agent } from './states'

export let reducer = (state = { agent }, action) => {
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