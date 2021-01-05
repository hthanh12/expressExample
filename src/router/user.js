"use strict";

const userController = require("../controller/userController");
const authentication = require("../middleware/authentication")

module.exports = (router) => {
    router.route('/user').post(userController.create)
    router.route('/login').post(userController.login);
    
    router.route('/checkToken').post(authentication.isLogged,
        userController.checkToken
        );

    router.route('/changePassword').post(authentication.isLogged,
          userController.changePassword);

    //   router
    //     .route("/users")
    //     .delete(authentication.isLogged, userController.deleteUser);

    return router;
};