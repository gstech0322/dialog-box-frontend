import { GET_ABOUTUS, GET_CHARITY } from "../../types";

const INITIAL_STATE = {
    data: []
};

export const articleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ABOUTUS:
            return {
                ...state,
                ...action.payload
            };

        case GET_CHARITY:
            return {
                ...state,
                ...action.payload
            };
    
        default:
            return state;
    }
};