import axiosClient from '../axios/axiosClient';

class Room {
    get = (id) => {
        const url = `/admin/room?id_apartment=${id}`;
        return axiosClient.get(url);
    };

    update = (id, payloads) => {
        const url = `/admin/room/${id}`
        return axiosClient.put(url, payloads);
    }

    add = (payloads) => {
        const url = `/admin/room`
        return axiosClient.post(url, payloads);
    }

    delete = (id) => {
        const url = `/admin/room/${id}`
        return axiosClient.delete(url);
    }
}

const roomApi = new Room();

export default roomApi;
