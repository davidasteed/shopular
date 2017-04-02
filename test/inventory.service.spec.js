(function() {
  'use strict';

  let expect = chai.expect;

  describe('inventory service', function() {

    let InventoryService;

    beforeEach(module('shop')); // same as 'ng-app' in the DOM

    describe('InventoryService testing', function() {

      beforeEach(inject(function(_InventoryService_){
        // we are injecting an object matching 'InventoryService'
        InventoryService = _InventoryService_;
      }));

      afterEach(inject(function(_InventoryService_){
        // clear localStorage data before starting next test
        localStorage.removeItem('inventory');
      }));

      it('should fail if the new item is an Array', function() {
        InventoryService.addItem('Bill', '53', '3', 'blue');
        expect(InventoryService.getInventory().length).to.equal(0);
      });

      it('should fail if the new item Object is empty', function() {
        // first add one item to inventory
        InventoryService.addItem(
          {name: 'George',
           price: '5',
           quantity: '4',
           color: 'yellow'});
        InventoryService.addItem({});
        expect(InventoryService.getInventory().length).to.equal(1);
      });

      it('should fail if the item was not provided', function() {
        // try to run function without an item as an arg
        InventoryService.addItem();
        expect(InventoryService.getInventory().length).to.equal(0);
      });

      it('should fail if item price is not a Number', function() {
        InventoryService.addItem(
          {name: 'Josh',
           price: 'abcdef',
           quantity: '4',
           color: 'yellow'});
        expect(InventoryService.getInventory().length).to.equal(0);
      });

      it('should fail if item price is less than a penny', function(){
        InventoryService.addItem(
          {name: 'Willie',
           price: '0.001',
           quantity: '4',
           color: 'yellow'});
        expect(InventoryService.getInventory().length).to.equal(0);
      });

      it('should fail if quantity is not a Number', function() {
        InventoryService.addItem(
          {name: 'Harry',
           price: '133',
           quantity: 'abc123',
           color: 'yellow'});
        expect(InventoryService.getInventory().length).to.equal(0);
      });

      it('should fail if color is not a string', function() {
        InventoryService.addItem(
          {name: 'Dean',
           price: '133',
           quantity: '1',
           color: 123});
        expect(InventoryService.getInventory().length).to.equal(0);
      });

      it('should fail if color property length is zero', function() {
        InventoryService.addItem(
          {name: 'Rich',
           price: '127',
           quantity: '1',
           color: ''});
        expect(InventoryService.getInventory().length).to.equal(0);
      });

      it('should create new item if parameters are valid', function() {
        InventoryService.addItem(
          {name: 'Sally',
           price: '66',
           quantity: '5',
           color: 'Brown'});
        expect(InventoryService.getInventory().length).to.equal(1);
      });

      it('should return an inventory', function() {
        InventoryService.addItem(
          {name: 'Dawn',
           price: '77',
           quantity: '4',
           color: 'Blue'});
      expect(InventoryService.getInventory()[0].name).to.equal('Dawn');
      });
    });
  });

}());
