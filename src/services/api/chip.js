import axiosClient from '../axios/axiosClient';

class Chip {
    getAll = () => {
        const url = `/admin/chip`;
        return axiosClient.get(url);
    };

    delete = (id) => {
        const url = `/admin/chip/${id}`
        return axiosClient.delete(url);
    }

    update = (id, payloads) => {
        const url = `/admin/chip/${id}`
        return axiosClient.put(url, payloads);
    }

    add = (payloads) => {
        const url = `/admin/chip`
        return axiosClient.post(url, payloads);
    }
}

const chipApi = new Chip();

export default chipApi;
