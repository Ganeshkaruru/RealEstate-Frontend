import axios from "axios";

const BASE_URL = "http://localhost:8081";

export const registerUser = async (userData) => {

    const response = await axios.post(
        `${BASE_URL}/register`,
        userData
    );

    console.log(response);

    return response.data;
};
export const loginUser = async (loginData) => {

    const response = await axios.post(
        `${BASE_URL}/login`,
        loginData
    );

    return response.data;

};