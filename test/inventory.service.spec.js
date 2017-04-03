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

      // basic argument validation
      it('should fail if invalid argument was provided', function() {
        // fail without an argument
        InventoryService.addItem();
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail with an array
        InventoryService.addItem(['Bill', '53', '3', 'blue']);
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail an empty Object
        InventoryService.addItem({});
        expect(InventoryService.getInventory().length).to.equal(0);
      });

      // basic property validations
      it('should fail if item name is invalid', function() {
        // fail if item.name is 0 length
        InventoryService.addItem({});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if item.name is missing
        InventoryService.addItem(
          {price: '123',
           quantity: '1',
           color: 'green'});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if item.name is not a string
        InventoryService.addItem(
          {name: ['Juliet'],
           price: '13',
           quantity: '5',
           color: 'russet'});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if item.price was not provided
        InventoryService.addItem(
          {name: 'Broadsword',
           quantity: '4',
           color: 'gold'});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if item.price is not a number
        InventoryService.addItem(
          {name: 'Joshua Tree',
           price: 'abcdef',
           quantity: '4',
           color: 'yellow'});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if item.price is less than a penny
        InventoryService.addItem(
          {name: 'Big Mac',
           price: '0.001',
           quantity: '4',
           color: 'yellow'});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if item.quantity not provided
        InventoryService.addItem(
          {name: 'Broken Axe',
           price: '12',
           color: 'brown'});
        expect(InventoryService.getInventory().length).to.equal(0);

        // should fail if quantity is not a number
        InventoryService.addItem(
          {name: 'Hair Net',
           price: '133',
           quantity: 'abc123',
           color: 'yellow'});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if item.color not provided
        InventoryService.addItem(
          {name: 'Mass driver',
           price: '6',
           quantity: '16'});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if item.color is not a string
        InventoryService.addItem(
          {name: 'Stringed Bow',
           price: '133',
           quantity: '1',
           color: 123});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if item.color property length is zero
        InventoryService.addItem(
          {name: 'Tree',
           price: '127',
           quantity: '1',
           color: ''});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if discount is NaN
        InventoryService.addItem(
          {name: 'S.S. Minnow',
           price: '50,000',
           quantity: '1',
           color: 'white',
           discount: NaN});
        expect(InventoryService.getInventory().length).to.equal(0);

        // fail if discount is not a number
        InventoryService.addItem(
          {name: 'U.S.S. Lexington',
           price: '5,000,000,000,000',
           quantity: '1',
           color: 'white',
           discount: true});
        expect(InventoryService.getInventory().length).to.equal(0);
      });

      it('should create new item if parameters are valid', function() {
        // create item without discount
        // discount should be set to zero
        InventoryService.addItem(
          {name: 'Salient One',
           price: '66',
           quantity: '5',
           color: 'Brown'});
        expect(InventoryService.getInventory().length).to.equal(1);
        expect(InventoryService.getInventory()[0].discount).to.equal(0);

        // create item with discount
        InventoryService.addItem(
          {name: 'Vorlon',
           price: '16',
           quantity: '1',
           color: 'Brown',
           discount: '15'});
        expect(InventoryService.getInventory().length).to.equal(2);
        expect(InventoryService.getInventory()[1].discount).to.equal('15');
      });

      it('should return an inventory', function() {
        InventoryService.addItem(
          {name: 'Dawn Treader',
           price: '77',
           quantity: '4',
           color: 'Blue'});
      expect(InventoryService.getInventory()[0].name)
        .to.equal('Dawn Treader');
      });

      it('should not run setQuantity() with invalid arguments', function() {
        let validItem = {
          name: 'Ogre',
          price: '7',
          quantity: '4',
          color: 'Green'};

        // add a valid item
        InventoryService.addItem(validItem);

        // fail to change quantity if item not provided
        InventoryService.setQuantity(undefined, true);
        expect(InventoryService.getInventory()[0].quantity).to.equal(4);

        // fail to change quantity is item is an array
        InventoryService.setQuantity([], false);
        expect(InventoryService.getInventory()[0].quantity).to.equal(4);

        // fail to change quantity if item is empty
        InventoryService.setQuantity({}, true);
        expect(InventoryService.getInventory()[0].quantity).to.equal(4);

        // fail if raiseVal is not present
        InventoryService.setQuantity(validItem);
        expect(InventoryService.getInventory()[0].quantity).to.equal(4);

        // fail if raiseVal is not a Boolean
        InventoryService.setQuantity(validItem, [true]);
        expect(InventoryService.getInventory()[0].quantity).to.equal(4);
      });
    });
  });

}());
