import axios from './axiosInstance';

export const generateUrl = async (originalUrl) => {
  const response = await axios.post('api/v1/generate-url', { originalUrl });
  return response.data;
};

export const getAllFlikUrls = async () => {
    const response = await axios.get('api/v1/get-all-flikurl');
    return response.data;
};

export const deleteUrl = async (id) => {
    const response = await axios.delete(`api/v1/delete-url/${id}`);
    return response.data;
  };