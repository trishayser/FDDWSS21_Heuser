'use strict';
module.exports = function(app) {
    const user = require('./controller');

    app.route('/users')
        .get(user.list_users)
        .post(user.create_user);

    app.route('/users/:user_id')
        .get(user.read_user)
        .put(user.update_user)
        .delete(user.delete_user);

 };