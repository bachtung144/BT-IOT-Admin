import axiosClient from '../axios/axiosClient';

class Device {
    getByRoom = (id) => {
        const url = `/admin/device?id_room=${id}`;
        return axiosClient.get(url);
    };

    updateDevice = (id, payloads) => {
        const url = `/admin/device/${id}`
        return axiosClient.put(url, payloads);
    }

    addDevice = (payloads) => {
        const url = `/admin/device`
        return axiosClient.post(url, payloads);
    }

    deleteDevice = (id) => {
        const url = `/admin/device/${id}`
        return axiosClient.delete(url);
    }
}

const deviceApi = new Device();

export default deviceApi;
