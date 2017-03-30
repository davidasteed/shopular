(function() {
  'use strict';

  // Angular factory method to create the service
  // to handle user login data
  angular.module('shop').factory('UserService', UserService);

  // "dependency injector" for window.location, where localStorage exists
  UserService.$inject = ['$location'];

  /**
   * [UserService constructor]
   * @param {Object} $location [AngularJS reference to window.location]
   */
  function UserService($location) {

    // add boss user account and password
    let bossUser = {username: 'boss', password: 'abc123'};

    // reference to existing users data,
    // or copy default array
    let users = JSON.parse(localStorage.getItem('users')) || [bossUser];

    /**
     * [loginUser validates a login attempt]
     * @param  {Object} inputUser [user attempting login]
     * @return {String or Boolean: False}  [String is returned if
     *                                      login successful,
     *                                      or false if login fails]
     */
    function loginUser(inputUser) {

      // store return value of login attempt
      let userNameIfLoggedIn;

      // basic data validation:
      // if input user's name or password is
      // null, empty, or non-String, return false
      if (!inputUser.username ||
        typeof(inputUser.username) !== 'string' ||
        inputUser.username.length === 0) {
        return userNameIfLoggedIn = false;
      }
      if (!inputUser.password ||
        typeof(inputUser.password) !== 'string' ||
        inputUser.password.length === 0) {
        return userNameIfLoggedIn = false;
      }

      users.forEach(
        /**
         * [findUser:
         * loop for the users array to find matching user:
         * check password and if matching, return username]
         * @param  {Object} user [user at this loop iteration]
         * @return {String or Boolean: False}  [String is returned if
         *                                      login successful,
         *                                      or false if login fails]
         */
        function findUser(user) {
        if (inputUser.username === user.username) {
          if (inputUser.password === user.password) {
            return userNameIfLoggedIn = user.username;
          } else {
            return userNameIfLoggedIn = false;
          }
        } else {
          return userNameIfLoggedIn = false;
        }
      });

      // indicate false if failed login, otherwise return username
      return userNameIfLoggedIn;
    }

    /**
     * [return user array]
     * @return {Array} [Array of user Objects]
     */
    function getUsers() {
      return users;
    }

    // allow access to service functions
    return {
      loginUser: loginUser,
      getUsers: getUsers
    };
  }

}());
