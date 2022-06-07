import axiosClient from '../axios/axiosClient';

class Device {
    get = (id) => {
        const url = `/admin/device?id_room=${id}`;
        return axiosClient.get(url);
    };

    update = (id, payloads) => {
        const url = `/admin/device/${id}`
        return axiosClient.put(url, payloads);
    }

    add = (payloads) => {
        const url = `/admin/device`
        return axiosClient.post(url, payloads);
    }

    delete = (id) => {
        const url = `/admin/device/${id}`
        return axiosClient.delete(url);
    }
}

const deviceApi = new Device();

export default deviceApi;
