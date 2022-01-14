import axiosClient from '../axios/axiosClient';

class Apartment {
    getByBuilding = (id) => {
        const url = `/admin/apartment?id_building=${id}`;
        return axiosClient.get(url);
    };

    updateApartment = (id, payloads) => {
        const url = `/admin/apartment/${id}`
        return axiosClient.put(url, payloads);
    }

    deleteApartment = (id) => {
        const url = `/admin/apartment/${id}`
        return axiosClient.delete(url);
    }

    addApartment = (payloads) => {
        const url = `/admin/apartment`
        return axiosClient.post(url, payloads);
    }
}

const apartmentApi = new Apartment();

export default apartmentApi;
