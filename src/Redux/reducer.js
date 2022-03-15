import { LOGIN_AGENT, LOGOUT_AGENT, UPDATE_AGENT_PROFILE_AGENT, UPDATE_AGENT_PROFILE_SERVICES, UPDATE_AGENT_PROFILE_NOTES, ERROR } from './actions';
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
                ...state,
                agent: {
                },
            }
        case UPDATE_AGENT_PROFILE_AGENT:
                return {
                    ...state,
                    agentProfile:{ ...state.agentProfile, agent: {...action.agent }, },
                }
        case UPDATE_AGENT_PROFILE_SERVICES:
                return {
                    ...state,
                    agentProfile:{ ...state.agentProfile, services: {...action.services }, },
                }
        case UPDATE_AGENT_PROFILE_NOTES:
                return {
                    ...state,
                    agentProfile:{ ...state.agentProfile, notes: [...action.notes ], },
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