import { GET_COLLECTIONS } from "../../types";

const INITIAL_STATE = {
    data: []
};

export const collectionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_COLLECTIONS:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};