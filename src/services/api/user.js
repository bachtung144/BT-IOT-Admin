import axiosClient from '../axios/axiosClient';

class User {
    get = (id) => {
        const url = `/admin/user?apartment_id=${id}`;
        return axiosClient.get(url);
    };

    update = (id, payloads) => {
        const url = `/admin/user/${id}`
        return axiosClient.put(url, payloads);
    }

    add = (payloads) => {
        const url = `/admin/user`
        return axiosClient.post(url, payloads);
    }

    delete = (id) => {
        const url = `/admin/user/${id}`
        return axiosClient.delete(url);
    }

    login = params => {
        const url = '/admin/login';
        return axiosClient.post(url, params);
    };

    changePass = params => {
        const url = '/admin/change-password';
        return axiosClient.put(url, params);
    };

}

const userApi = new User();

export default userApi;
