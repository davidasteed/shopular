(function() {
  'use strict';

  // create new Angular controller
  angular.module('shop')
  .controller('UserController', UserController);

  // inject the angular service that handles data calls for users
  UserController.$inject = ['UserService'];

  /**
   * [UserController constructor]
   * @param {Object} UserService [angularJS service that handles user data]
   */
  function UserController(UserService) {
    let vm = this;
    vm.displayUser = {username: '', loginDate: ''};

    vm.users = UserService.getUsers();

    // open access to users
    vm.loginUser =
      /**
       * [attempt to log in user]
       * @param  {Object} inputUser [new user]
       * @return {void}
       */
      function loginUser(inputUser) {
        // display login name and login time if successful
        let userLogin = UserService.loginUser(inputUser);
        if (typeof(userLogin) === 'string') {
          vm.displayUser.username = userLogin;
          let newDate = new Date();
          vm.displayUser.loginDate =
            newDate.toLocaleString(
            'en-US', {month: 'short', day: 'numeric'}) +
            ' - ' + newDate.toLocaleString('en-US', {hour: 'numeric',
            minute: 'numeric'});
        } else {
          vm.inputUser = {};
          vm.displayUser = {};
        }
      };

    vm.getLoggedInUser =
      /**
       * [method to obtain logged in user]
       * @return {Object or null} [return user Object
       *                           or null if no user is logged in]
       */
      function getLoggedInUser() {
        // if a username length is greater than zero (is present)
        if (vm.displayUser.username.length) {
          return vm.displayUser;
        }
        else {
          return null;
        }
      };

  }

}());
