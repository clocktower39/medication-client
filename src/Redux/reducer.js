import { LOGIN_AGENT, LOGOUT_AGENT, UPDATE_AGENT_PROFILE_AGENT, ERROR } from './actions';
import { agent, schedule, agentProfile } from './states'

export let reducer = (state = { agent, schedule, agentProfile }, action) => {
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
        case UPDATE_AGENT_PROFILE_AGENT:
                return {
                    ...state,
                    agentProfile:{ ...state.agentProfile, agent: {...action.agent }, },
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