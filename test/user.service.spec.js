(function() {
  'use strict';

  let expect = chai.expect;

  describe('UserService testing', function() {

    let UserService;

    beforeEach(module('shop')); // same as 'ng-app' in the DOM

    beforeEach(inject(function(_UserService_) {
      // we are injecting an object matching 'UserService'
      UserService = _UserService_;
    }));

    afterEach(function() {
      // clear localStorage data before starting next test
      // NOTE: users always starts out containing the boss Object
      localStorage.removeItem('users');
    });

    it('should fail if loginUser() has no argument', function() {
      expect(UserService.loginUser()).to.equal(false);
    });

    it('should fail if loginUser() has zero length argument', function() {
      expect(UserService.loginUser({})).to.equal(false);
    });

    it('should fail if loginUser() not passed a username', function() {
      expect(UserService.loginUser({
        password: 'abc123'}))
        .to.equal(false);
      });

    it('should fail if loginUser() not given username as String', function(){
      expect(UserService.loginUser({
        username: 123,
        password: 'abc123'}))
        .to.equal(false);
      });

    it('should fail if loginUser() given zero length username', function() {
      expect(UserService.loginUser({
        username: '',
        password: 'abc123'}))
        .to.equal(false);
      });

    it('should fail if loginUser() not given a password', function() {
      expect(UserService.loginUser({
        username: 'boss'}))
        .to.equal(false);
      });

    it('should fail if loginUser() not given password as String', function(){
      expect(UserService.loginUser({
        username: 'boss',
        password: 555}))
        .to.equal(false);
      });

    it('should fail if loginUser() given a zero length password', function() {
      expect(UserService.loginUser({
        username: 'boss',
        password: ''}))
        .to.equal(false);
      });

    it('should run loginUser() if argument is a valid user', function() {
      let userLogin = UserService.loginUser({
        username: 'boss',
        password: 'abc123'});
      expect(userLogin).to.equal('boss');
      });

    it('should return Users', function() {
      expect(UserService.getUsers()[0].username).to.equal('boss');
    });
  });

}());
