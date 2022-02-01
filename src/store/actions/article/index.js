import axios from "axios";
import { GET_ABOUTUS, GET_CHARITY } from "../../types";
const { REACT_APP_API_URL } = process.env;

export const uploadTinyMCEImage = async (formData) => {
    try {
        let response = await axios.post(`${REACT_APP_API_URL}/api/tiny_image_upload`, formData)
        return response.data;
    } catch (error) {
        console.log("Upload image Error:", error);
    }
};

export const getAboutus = () => (dispatch) => {
    axios
        .get(`${REACT_APP_API_URL}/api/aboutus`)
        .then(response => {
            dispatch({
                type: GET_ABOUTUS,
                payload: {
                    data: response.data.data
                }
            })
        })
};

export const saveAboutus = async (data) => {
    try {
        let response = await axios.post(`${REACT_APP_API_URL}/api/aboutus`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCharity = () => (dispatch) => {
    axios
        .get(`${REACT_APP_API_URL}/api/charity`)
        .then(response => {
            dispatch({
                type: GET_CHARITY,
                payload: {
                    data: response.data.data
                }
            })
        })
};

export const saveCharity = async (data) => {
    try {
        let response = await axios.post(`${REACT_APP_API_URL}/api/charity`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};