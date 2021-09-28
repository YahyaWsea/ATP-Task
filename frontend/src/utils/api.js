import axiosInstance from './axios-instance';

export const api = {
  getBoard(params) {
    return axiosInstance.get('/board', { params });
  },
};
