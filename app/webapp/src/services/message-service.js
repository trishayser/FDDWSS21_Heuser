import axios from 'axios'

const $axios = axios.create({
    baseURL: 'http://localhost:14773',
});

function getMessages(username) {
    return $axios.get("/messages/?user=" + username);
}

export const getMessagesFromUser = async (username) => {
    return Promise.all([getMessages(username)]).then(function (results) {
        return results[0].data;
    });
}