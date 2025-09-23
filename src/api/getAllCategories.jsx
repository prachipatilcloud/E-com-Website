import axios from "axios";

const BaseUrl = "https://api.escuelajs.co/api/v1"

export const getAllCategories = async() => {
    const url = `${BaseUrl}/categories`;

    try {
        const { data } = await axios.get(url);
        return data;
        
    } catch (err) {
        return err;
    }
}