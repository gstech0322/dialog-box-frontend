import { SAVE_NEW_NFT, GET_NFTS } from "../../types";

const INITIAL_STATE = {
    success: false,
    data: []
};

export const nftReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_NEW_NFT:
            return {
                ...state,
                ...action.payload
            };

        case GET_NFTS:
            return {
                ...state,
                ...action.payload
            }
    
        default:
            return state;
    }
};