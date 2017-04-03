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

      it('should fail property values are invalid', function() {
        // fail if no argument provided
        expect(UserService.loginUser()).to.equal(false);

        // fail if argument is zero length
        expect(UserService.loginUser({})).to.equal(false);

        // fail is username is not present
        expect(UserService.loginUser(
          {password: 'abc123'})).to.equal(false);

        // fail if username is not a string
        expect(UserService.loginUser(
          {username: 123,
          password: 'abc123'})).to.equal(false);

        // fail if username is zero length
        expect(UserService.loginUser(
          {username: '',
          password: 'abc123'})).to.equal(false);

        // fail if password is not present
        expect(UserService.loginUser(
          {username: 'boss'})).to.equal(false);

        // fail if password is not a string
        expect(UserService.loginUser(
          {username: 'boss',
           password: 555})).to.equal(false);

        // fail if password is zero length
        expect(UserService.loginUser(
          {username: 'boss',
           password: ''})).to.equal(false);
      });

      it('should succeed if valid user', function() {
        let userLogin = UserService.loginUser(
          {username: 'boss',
           password: 'abc123'});
        expect(userLogin).to.equal('boss');
      });

      it('should return Users', function() {
        expect(UserService.getUsers()[0].username).to.equal('boss');
      });
    });

  });

}());
