import axios from 'axios'

const $axios = axios.create({
    baseURL: 'http://localhost:13773',
});

function getAllFacilities() {
    return $axios.get("/facilities/");
}

// eslint-disable-next-line no-unused-vars
export const getFacilities = async () => {
    return Promise.all([getAllFacilities()]).then(function (results) {
       return results[0].data;
    });
}
