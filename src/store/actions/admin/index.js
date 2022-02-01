import axios from "axios";
import { GET_ALL_ADMINS } from "../../types";
const { REACT_APP_API_URL } = process.env;

export const getAllAdmins = () => (dispatch) => {
    axios
        .get(`${REACT_APP_API_URL}/api/admins`)
        .then(response => {
            dispatch({
                type: GET_ALL_ADMINS,
                payload: {
                    data: response.data.data
                }
            });
        });
};

export const saveAdmin = async (address) => {
    let res = await axios.post(`${REACT_APP_API_URL}/api/admin`, { address: address });
    return res.data;
};

export const delAdmin = async (address) => {
    let res = await axios.delete(`${REACT_APP_API_URL}/api/admin?address=${address}`);
    return res.data;
}