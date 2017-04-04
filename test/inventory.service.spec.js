(function() {
  'use strict';

  let expect = chai.expect;

  describe('InventoryService testing', function() {

    let InventoryService;

    beforeEach(module('shop')); // same as 'ng-app' in the DOM

    beforeEach(inject(function(_InventoryService_){
      // we are injecting an object matching 'InventoryService'
      InventoryService = _InventoryService_;
    }));

    afterEach(function(){
      // clear localStorage data before starting next test
      localStorage.removeItem('inventory');
    });

    it('should fail if addItem() provided no argument', function() {
      InventoryService.addItem();
      expect(InventoryService.getInventory().length).to.equal(0);
    });

    it('should fail if addItem() argument is an Array', function() {
      InventoryService.addItem(['Bill', '53', '3', 'blue']);
      expect(InventoryService.getInventory().length).to.equal(0);
    });

    it('should fail if addItem() provided an empty Object', function() {
      InventoryService.addItem({});
      expect(InventoryService.getInventory().length).to.equal(0);
    });

    it('should fail if addItem() given zero length item.name', function() {
      InventoryService.addItem({});
      expect(InventoryService.getInventory().length).to.equal(0);
    });

    it('should fail if addItem() not provided item.name', function() {
      InventoryService.addItem({
        price: '123',
        quantity: '1',
        color: 'green'});
        expect(InventoryService.getInventory().length).to.equal(0);
      });

    it('should fail if addItem() not given item.name as String', function() {
      InventoryService.addItem({
        name: ['Juliet'],
        price: '13',
        quantity: '5',
        color: 'russet'});
      expect(InventoryService.getInventory().length).to.equal(0);
      });

    it('should fail if addItem() not given item.price', function() {
      InventoryService.addItem({
        name: 'Broadsword',
        quantity: '4',
        color: 'gold'});
      expect(InventoryService.getInventory().length).to.equal(0);
    });

    it('should fail if addItem() not given item.price as Number', function(){
      InventoryService.addItem({
        name: 'Joshua Tree',
        price: 'abcdef',
        quantity: '4',
        color: 'yellow'});
      expect(InventoryService.getInventory().length).to.equal(0);
      });

    it('should fail if addItem() given item.price < 1 cent', function() {
      InventoryService.addItem({
        name: 'Big Mac',
        price: '0.001',
        quantity: '4',
        color: 'yellow'});
      expect(InventoryService.getInventory().length).to.equal(0);
      });

    it('should fail if addItem() not given item.quantity', function() {
      InventoryService.addItem({
        name: 'Broken Axe',
        price: '12',
        color: 'brown'});
      expect(InventoryService.getInventory().length).to.equal(0);
    });

    it('should fail if addItem() given quantity type not Number', function() {
      InventoryService.addItem({
        name: 'SkyNet',
        price: '133',
        quantity: 'abc123',
        color: 'yellow'});
      expect(InventoryService.getInventory().length).to.equal(0);
      });

    it('should fail if addItem() given no item.color', function() {
      InventoryService.addItem({
        name: 'Mass driver',
        price: '6',
        quantity: '16'});
      expect(InventoryService.getInventory().length).to.equal(0);
      });

    it('should fail if addItem() not given item.color as String', function() {
      InventoryService.addItem({
        name: 'Stringed Bow',
        price: '133',
        quantity: '1',
        color: 123});
      expect(InventoryService.getInventory().length).to.equal(0);
      });

    it('should fail if addItem() given zero length item.color', function() {
      InventoryService.addItem({
        name: 'Tree',
        price: '127',
        quantity: '1',
        color: ''});
      expect(InventoryService.getInventory().length).to.equal(0);
      });

    it('should fail if addItem() given discount as NaN', function() {
      InventoryService.addItem({
        name: 'S.S. Minnow',
        price: '50,000',
        quantity: '1',
        color: 'white',
        discount: NaN});
      expect(InventoryService.getInventory().length).to.equal(0);
      });

    it('should fail if addItem() given discount type not Number', function() {
      InventoryService.addItem({
        name: 'U.S.S. Lexington',
        price: '5,000,000,000,000',
        quantity: '1',
        color: 'white',
        discount: true});
      expect(InventoryService.getInventory().length).to.equal(0);
      });

    it('should addItem() with no discount provided', function() {
      // create item without discount
      // discount should be set to zero
      InventoryService.addItem({
        name: 'Highlander',
        price: '66',
        quantity: '5',
        color: 'Brown'});

        let newItem = InventoryService.getInventory();
        expect(newItem.length).to.equal(1);
        expect(newItem[0].name).to.equal('Highlander');
        expect(newItem[0].price).to.equal(66);
        expect(newItem[0].quantity).to.equal(5);
        expect(newItem[0].color).to.equal('Brown');
        expect(newItem[0].discount).to.equal(0);
      });

    it('should addItem() with a discount provided', function() {
      InventoryService.addItem({
        name: 'Vorlon',
        price: '16',
        quantity: '1',
        color: 'Brown',
        discount: '15'});
      let newItem = InventoryService.getInventory();
      expect(newItem.length).to.equal(1);
      expect(newItem[0].name).to.equal('Vorlon');
      expect(newItem[0].price).to.equal(16);
      expect(newItem[0].quantity).to.equal(1);
      expect(newItem[0].color).to.equal('Brown');
      expect(newItem[0].discount).to.equal('15');
      });

    it('should return an inventory', function() {
      InventoryService.addItem({
        name: 'Dawn Treader',
        price: '77',
        quantity: '4',
        color: 'Blue'});
      let newItem = InventoryService.getInventory();
      expect(newItem.length).to.equal(1);
      expect(newItem[0].name).to.equal('Dawn Treader');
      expect(newItem[0].price).to.equal(77);
      expect(newItem[0].quantity).to.equal(4);
      expect(newItem[0].color).to.equal('Blue');
      expect(newItem[0].discount).to.equal(0);
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

}());
