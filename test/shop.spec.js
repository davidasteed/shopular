(function() {
  'use strict';

  let expect = window.chai.expect;

  describe('math test', function() {

    describe('test sum function', function() {

      it('add two numbers', function() {
        let result = 1 + 2;
        // chai assertions
        expect( result ).to.be.a( 'number' );
        expect( result ).to.equal( 3 );
      });

    });

  });


}());
