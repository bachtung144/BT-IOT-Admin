import axiosClient from '../axios/axiosClient';

class Room {
    getByApartment = (id) => {
        const url = `/admin/room?id_apartment=${id}`;
        return axiosClient.get(url);
    };

    updateRoom = (id, payloads) => {
        const url = `/admin/room/${id}`
        return axiosClient.put(url, payloads);
    }

    addRoom = (payloads) => {
        const url = `/admin/room`
        return axiosClient.post(url, payloads);
    }
}

const roomApi = new Room();

export default roomApi;
