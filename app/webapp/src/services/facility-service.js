import axios from 'axios'
import {getUser} from "./user-service";

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

export const getFacilitiesWithSubs = async (username) => {
    return Promise.all([getAllFacilities(), getUser(username)]).then(function (results) {
        var facilities = results[0].data;
        var subscripted = results[1].data[0].subscribed;
        console.log(subscripted);

        for (let i=0; i<facilities.length; i++) {
            if (subscripted.includes(facilities[i].facility_id)) {
                facilities[i].isSubscribed = true;
                console.log(facilities[i].facility_id + " subed");
            } else {
                facilities[i].isSubscribed = false;
            }
        }
        return facilities;
    });
}
