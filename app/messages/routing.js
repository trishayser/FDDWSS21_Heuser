'use strict';
module.exports = function(app) {
    const message = require('./controller');

    app.route('/messages')
        .get(message.list_messages)
        .post(message.create_message);

    app.route('/messages/:message_id')
        .get(message.read_message)
        .put(message.update_message)
        .delete(message.delete_message);

 };