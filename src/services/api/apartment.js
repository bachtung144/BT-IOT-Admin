import axiosClient from '../axios/axiosClient';

class Apartment {
    get = (id) => {
        const url = `/admin/apartment?building_id=${id}`;
        return axiosClient.get(url);
    };

    update = (id, payloads) => {
        const url = `/admin/apartment/${id}`
        return axiosClient.put(url, payloads);
    }

    delete = (id) => {
        const url = `/admin/apartment/${id}`
        return axiosClient.delete(url);
    }

    add = (payloads) => {
        const url = `/admin/apartment`
        return axiosClient.post(url, payloads);
    }
}

const apartmentApi = new Apartment();

export default apartmentApi;
