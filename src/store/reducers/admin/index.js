import { GET_ALL_ADMINS } from "../../types";

const INITIAL_STATE = {
    data: []
};

export const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_ADMINS:
            return {
                ...state,
                ...action.payload
            };
    
        default:
            return state;
    }
};