(function() {
  'use strict';

  let expect = chai.expect;

  describe('user service', function() {

    let UserService;

    beforeEach(module('shop')); // same as 'ng-app' in the DOM

    describe('UserService testing', function() {

      beforeEach(inject(function(_UserService_) {
        // we are injecting an object matching 'UserService'
        UserService = _UserService_;
      }));

      afterEach(inject(function(_UserService_) {
        // clear localStorage data before starting next test
        // localStorage.removeItem('users');
        // NOTE: users always starts out containing the boss Object
        localStorage.removeItem('users');
      }));

      it('should succeed if valid user', function() {
        let userLogin = UserService.loginUser(
          {username: 'boss',
           password: 'abc123'});
        expect(userLogin).to.equal('boss');
      });

      it('should fail if username is not a string', function() {
        UserService.loginUser(
          {username: 123,
           password: 'yueue'});
        expect(UserService.getUsers().length).to.equal(1);
      });

    });

  });

}());
