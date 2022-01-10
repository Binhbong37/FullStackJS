import axios from 'axios';

export const handleLoginApi = (emailUser, passwordUser) => {
    return axios.post('http://localhost:3000/api/login', {
        email: emailUser,
        password: passwordUser,
    });
    // do Bên Server cái truyền cũng là email, password nên nó đã trùng key
    // { email: email, password: password} => Không phải đặt ngẫu nhiên
};

export const getAllUsers = (inputId) => {
    return axios.get(`http://localhost:3000/api/get-all-users?id=${inputId}`);
};

export const createNewUserFromService = (data) => {
    console.log('check data form file services: ', data);
    return axios.post(`http://localhost:3000/api/create-new-user`, data);
};

export const deleteUserService = (userId) => {
    return axios.delete(`http://localhost:3000/api/delete-user`, {
        data: { id: userId },
    });
};

export const userEditService = (inputData) => {
    return axios.put(`http://localhost:3000/api/edit-user`, inputData);
};
