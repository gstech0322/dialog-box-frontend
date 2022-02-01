import axios from "axios";
import { SAVE_NEW_NFT, GET_NFTS } from "../../types";
const { REACT_APP_API_URL } = process.env;

export const uploadImage = async (formData) => {
    try {
        let response = await axios.post(`${REACT_APP_API_URL}/api/file_upload`, formData)
        return response.data.file;
    } catch (error) {
        console.log("Upload image Error:", error);
    }
};

export const removeImage = async (url) => {
    try {
        let response = await axios.post(`${REACT_APP_API_URL}/api/file_remove`, { url: url });
        return response.data.success;
    } catch (error) {
        return false;
    }
};

export const saveNFT = (data) => (dispatch) => {
    axios.post(`${REACT_APP_API_URL}/api/nft`, data)
        .then(response => {
            if (response.data.success) {
                dispatch({
                    type: SAVE_NEW_NFT,
                    payload: {
                        success: true
                    }
                })
            }
        })
};

export const updateNFT = async (data) => {
    let response = await axios.put(`${REACT_APP_API_URL}/api/nft`, data);
    return response.data;
};

export const getNFTs = (collectionId) => (dispatch) => {
    let requestUrl = `${REACT_APP_API_URL}/api/nfts`;
    if (collectionId) {
        requestUrl += `?collectionId=${collectionId}`;
    }
    axios.get(requestUrl)
        .then(response => {
            dispatch({
                type: GET_NFTS,
                payload: {
                    data: response.data
                }
            })
        })
};