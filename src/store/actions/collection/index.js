import axios from 'axios';
import { GET_COLLECTIONS } from "../../types";
const { REACT_APP_API_URL } = process.env;

export const getCollections = () => (dispatch) => {
    axios
        .get(`${REACT_APP_API_URL}/api/collections`)
        .then(response => {
            dispatch({
                type: GET_COLLECTIONS,
                payload: {
                    data: response.data
                }
            })
        })
};

export const uploadCollectionImage = async (formData) => {
    let response = await axios.post(`${REACT_APP_API_URL}/api/collection_image_upload`, formData)
    return response.data.file;
};

export const saveCollection = async (data) => {
    let response = await axios.post(`${REACT_APP_API_URL}/api/collection`, data);
    return response.data;
};

export const updateCollection = async (data) => {
    let response = await axios.put(`${REACT_APP_API_URL}/api/collection`, data);
    return response.data;
};

export const deleteCollection = async (id) => {
    let response = await axios.delete(`${REACT_APP_API_URL}/api/collection?id=${id}`);
    return response.data;
};