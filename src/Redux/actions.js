import jwt from 'jwt-decode';
import serverURL from '../serverURL';

export const LOGIN_AGENT = 'LOGIN_AGENT';
export const LOGOUT_AGENT = 'LOGOUT_AGENT';
export const SIGNUP_AGENT = 'SIGNUP_AGENT';
export const UPDATE_AGENT_PROFILE_AGENT = 'UPDATE_AGENT_PROFILE_AGENT';
export const UPDATE_AGENT_PROFILE_SERVICES = 'UPDATE_AGENT_PROFILE_SERVICES';
export const UPDATE_AGENT_PROFILE_NOTES = 'UPDATE_AGENT_PROFILE_NOTES';
export const ERROR = 'ERROR';

export function signupUser(user) {
    return async (dispatch, getState) => {
        const response = await fetch(`${serverURL}/signup`, {
            method: 'post',
            dataType: 'json',
            body: user,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json();
        if (data.error) {
            return dispatch({
                type: ERROR,
                error: data.error
            });
        }

        return dispatch(loginUser(user));
    }
}

export function loginUser(user) {
    return async (dispatch, getState) => {
        const response = await fetch(`${serverURL}/login`, {
            method: 'post',
            dataType: 'json',
            body: user,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json();
        if (data.error) {
            return dispatch({
                type: ERROR,
                error: data.error
            });
        }
        const accessToken = data.accessToken;
        const decodedAccessToken = jwt(accessToken);

        localStorage.setItem('JWT_AUTH_TOKEN', accessToken);
        return dispatch({
            type: LOGIN_AGENT,
            agent: decodedAccessToken,
        });
    }
}

export function changePassword(currentPassword, newPassword) {
    return async (dispatch, getState) => {
        const bearer = `Bearer ${localStorage.getItem('JWT_AUTH_TOKEN')}`;

        const response = await fetch(`${serverURL}/changePassword`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({ currentPassword, newPassword}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": bearer,
            }
        })
        const data = await response.json();
        if (data.error) {
            return dispatch({
                type: ERROR,
                error: data.error
            });
        }
        const accessToken = data.accessToken;
        const decodedAccessToken = jwt(accessToken);

        localStorage.setItem('JWT_AUTH_TOKEN', accessToken);
        return dispatch({
            type: LOGIN_AGENT,
            agent: decodedAccessToken,
        });
    }
}

export const loginJWT = (token) => {
    return async (dispatch, getState) => {
        const bearer = `Bearer ${localStorage.getItem('JWT_AUTH_TOKEN')}`;

        const response = await fetch(`${serverURL}/checkAuthToken`, {
            headers: {
                "Authorization": bearer,
            }
        })

        const text = await response.text().then(item=>item);
        if(text === "Authorized"){
            const decodedAccessToken = jwt(token);
            return dispatch({
                type: LOGIN_AGENT,
                agent: decodedAccessToken,
            });
        }
        else {
            localStorage.removeItem('JWT_AUTH_TOKEN');
            return dispatch({
                type: LOGOUT_AGENT
            })
        }
    }
}

export function logoutUser() {
    return async (dispatch, getState) => {
        localStorage.removeItem('JWT_AUTH_TOKEN');
        return dispatch({
            type: LOGOUT_AGENT
        })
    }
}

export function getAgentInfo(agentId) {
    return async (dispatch, getState) => {
        const response = await fetch(`${serverURL}/agentInfo`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({_id: agentId}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json();
        if(data.agent)
        return dispatch({
            type: UPDATE_AGENT_PROFILE_AGENT,
            agent: data.agent,
        });
    }
}

export function getAgentNotes(agentId) {
    return async (dispatch, getState) => {
        const response = await fetch(`${serverURL}/agentNotes`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({id: agentId}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json();
        if(data)
        return dispatch({
            type: UPDATE_AGENT_PROFILE_NOTES,
            notes: data,
        });
    }
}
export function getAgentServices(agentId) {
    return async (dispatch, getState) => {
        const data = await fetch(`${serverURL}/agentServices/${agentId}`).then(res => res.json());
        if(data)
        return dispatch({
            type: UPDATE_AGENT_PROFILE_SERVICES,
            services: data,
        });
    }
}