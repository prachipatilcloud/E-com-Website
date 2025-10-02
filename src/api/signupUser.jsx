import axios from "axios";

const BaseUrl = "https://api.escuelajs.co/api/v1";

export const signupUser = async(userData) => {
    const url = `${BaseUrl}/users/`;

    try {
        const { data } = await axios.post(url, userData);
        return { success: true, data };
        
    } catch (err) {
        return { success: false, error: err.response?.data || err.message };
    }
}