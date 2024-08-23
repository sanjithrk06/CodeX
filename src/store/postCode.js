import axiosInstance from './axiosInstance';

export const postCode = async (endpoint, data) => {
    try {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
