import axios from 'axios';
import { GET_AUTH } from "../../types";
const { REACT_APP_API_URL } = process.env;

export const getAuth = (address) => (dispatch) => {
    axios
        .get(`${REACT_APP_API_URL}/api/auth?address=${address}`)
        .then(response => {
            dispatch({
                type: GET_AUTH,
                payload: {
                    data: response.data
                }
            });
        })
}