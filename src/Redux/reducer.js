import { LOGIN_AGENT, LOGOUT_AGENT, ERROR } from './actions';
import { agent, schedule } from './states'

export let reducer = (state = { agent, schedule }, action) => {
    switch (action.type) {
        case LOGIN_AGENT:
            return {
                ...state,
                agent: {
                    ...state.agent,
                    ...action.agent,
                },
            }
        case LOGOUT_AGENT:
            return {
                agent: {
                },
            }
        case ERROR:
            return {
                ...state,
                error: { ...action.error }
            }
        default:
            return { ...state };
    }
}