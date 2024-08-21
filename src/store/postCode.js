import axiosInstance from './axiosInstance';

export const postCode = async (endpoint, data) => {
    try {
        console.log(endpoint);
        console.log(data);
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error;
    }
};
