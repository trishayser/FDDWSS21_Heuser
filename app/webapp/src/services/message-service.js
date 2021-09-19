import axios from 'axios'

const $axios = axios.create({
    baseURL: process.env.VUE_APP_MESSAGE_API,
});

function getMessages(username) {
    return $axios.get("/messages/?user=" + username);
}

export const getMessagesFromUser = async (username) => {
    return Promise.all([getMessages(username)]).then(function (results) {
        return results[0].data;
    });
}