(function() {
  'use strict';

  let expect = chai.expect;

  describe('user controller', function() {
    let UserController;
    let mockUserService = {};

    beforeEach(module('shop')); // same as an ng-app declaration

    // inject a provider service that can create controllers
    beforeEach(module(function($provide) {
      $provide.value('UserService', mockUserService);
    }));

    beforeEach(inject(function($controller) {

      //
      // define functions for the service instance
      //

      // mockUserService.



    }));


  });



}());
