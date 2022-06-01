import axiosClient from '../axios/axiosClient';

class User {
    getByApartment = (id) => {
        const url = `/admin/user?id_apartment=${id}`;
        return axiosClient.get(url);
    };

    updateUser = (id, payloads) => {
        const url = `/admin/user/${id}`
        return axiosClient.put(url, payloads);
    }

    addUser = (payloads) => {
        const url = `/admin/user`
        return axiosClient.post(url, payloads);
    }

    deleteUser = (id) => {
        const url = `/admin/user/${id}`
        return axiosClient.delete(url);
    }

    login = params => {
        const url = '/admin/login';
        return axiosClient.post(url, params);
    };

}

const userApi = new User();

export default userApi;
