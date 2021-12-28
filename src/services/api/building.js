import axiosClient from '../axios/axiosClient';

class Building {
    getAll = () => {
        const url = `/admin/building`;
        return axiosClient.get(url);
    };

    deleteBuilding = (id) => {
        const url = `/admin/building/${id}`
        return axiosClient.delete(url);
    }

    updateBuilding = (id, payloads) => {
        const url = `/admin/building/${id}`
        return axiosClient.put(url, payloads);
    }

    addBuilding = (payloads) => {
        const url = `/admin/building`
        return axiosClient.post(url, payloads);
    }
}

const buildingApi = new Building();

export default buildingApi;
