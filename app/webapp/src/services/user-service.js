import axios from 'axios'

const $axios = axios.create({
    baseURL: process.env.VUE_APP_USER_API,
});

// eslint-disable-next-line no-unused-vars
function getAllUsers() {
    return $axios.get("/users/");
}

export function getUser(username) {
    return $axios.get("/users/" + username);
}

function putUser(username, data) {
    return $axios.put("/users/" + username, data);
}

export const updateSubs = async (username, subs) => {
    var data = {
        user_id: username,
        subscribed: subs
    }
    return Promise.resolve(putUser(username, data))
}

export const validateUser = async (username) => {
    return Promise.all([getUser(username)]).then(function (results) {
        var user = results[0].data;
        if (user.length == 0) {
            console.log("validate: failed");
            return false
        }  else {
            console.log("validate: check");
            return true
        }
    });
}
