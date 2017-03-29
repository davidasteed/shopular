(function() {
  'use strict';

  // create new Angular controller
  angular.module('shop')
  .controller('ShopController', ShopController);

  /**
   * [Constructor function for this Angular controller]
   */
  function ShopController() {
    let shop = this;

    shop.usa = true;
    shop.tax = 0.0575;          // tax is 5.75%
    shop.gbpCalc = 1.5;
    shop.sortOnThis = 'price';  // default sort column
    shop.newItem = {};

    shop.inventory = [
      { 'id': 2957, 'name': 'widget', 'price': 32, 'quantity': 203, 'color': 'red', 'discount': 31 },
      { 'id': 89274, 'name': 'golf club', 'price': 98, 'quantity': 10, 'color': 'black', 'discount': 0 },
      { 'id': 64, 'name': 'iPhone', 'price': 499, 'quantity': 2, 'color': 'white', 'discount': 0 },
      { 'id': 87363, 'name': 'bonzai tree', 'price': 76, 'quantity': 2, 'color': 'green', 'discount': 0 },
      { 'id': 1736, 'name': 'towel', 'price': 55, 'quantity': 30, 'color': 'brown', 'discount': 10 },
      { 'id': 4836, 'name': 'dog bed', 'price': 99, 'quantity': 10, 'color': 'beige', 'discount': 50 },
      { 'id': 829, 'name': 'waste basket', 'price': 15, 'quantity': 40, 'color': 'silver', 'discount': 0 },
      { 'id': 46, 'name': 'guitar', 'price': 899, 'quantity': 0, 'color': 'blue', 'discount': 150 },
      { 'id': 17456, 'name': 'matcha tea', 'price': 42, 'quantity': 4, 'color': 'green', 'discount': 11 },
      { 'id': 3292, 'name': 'enlightenment', 'price': 99999, 'quantity': 1, 'color': 'red', 'discount': 0 },
      { 'id': 533, 'name': 'eggs', 'price': 5, 'quantity': 12, 'color': 'brown', 'discount': 1 },
      { 'id': 683, 'name': 'pillow', 'price': 27, 'quantity': 10, 'color': 'black', 'discount': 12 }
    ];

    shop.showColor =
    /**
     * [Return USA or UK work for color]
     * @return {String} [country-specific word for color]
     */
    function showColor() {
      if (this.usa) {
        return 'Color';
      } else {
        return 'Colour';
      }
    };

    shop.showName =
    /**
     * [return USA or UK value for name]
     * @param  {Object} item [inventory item]
     * @return {String}      [country-specific string for inventory item]
     */
    function showName(item) {
      if (!this.usa) {
        if (item.name === 'waste basket') {
          return 'rubbish bin';
        } else {
          return item.name;
        }
      } else {
        return item.name;
      }
    };

    shop.salePrice =
    /**
     * [calculuate and return sale price for this item]
     * @param  {Object} item [inventory item]
     * @return {Number}      [sale price]
     */
    function salePrice(item) {
      if (this.usa) {
        return (item.price - item.discount);
      } else {
        return (item.price - item.discount) * this.gbpCalc;
      }
    };

    shop.switchCurrency =
    /**
     * [set usa boolean value: USA = true, UK = false]
     * @return {void}
     */
    function switchCurrency() {
      this.usa = !this.usa;
    };

    shop.addItem =
      /**
       * [Angular calls this method to
       * add new item to the inventory array]
       * @param {Object} item [new item to add]
       */
      function addItem(item) {
        let isDataValid = true;

        // basic validation
        if (typeof(item.name) !== 'string') {
          isDataValid = false;
        } else if (typeof(Number(item.price)) !== 'number') {
          isDataValid = false;
        } else if (!item.quantity) {
          isDataValid = false;
        } else if (typeof(Number(item.quantity)) !== 'number') {
          isDataValid = false;
        } else if (typeof(item.color) !== 'string') {
          isDataValid = false;
        }

        if (isDataValid) {
          // build the object to be added to inventory
          // force input strings to matching numerical values
          shop.newItem.id = Date.now();   // arbitray "unique id"
          shop.newItem.name = item.name;
          shop.newItem.price = Number(item.price);
          shop.newItem.quantity = Number(item.quantity);
          shop.newItem.color = item.color;

          // if no discount is provided, make discount zero
          if (item.discount) {
            shop.newItem.discount = item.discount;
          } else {
            shop.newItem.discount = 0;
          }

          // push item onto the array
          shop.inventory.push(shop.newItem);
        }
        shop.newItem = {};
    };

    shop.setSortOrder =
      /**
       * [set sorting order based on the chosen property,
       * forward or reverse]
       * @param {String} property [property in View to change sorting to]
       */
      function setSortOrder(property) {
        if (shop.sortOnThis === property) {
          shop.sortOnThis = '-' + property;
        } else if (shop.sortOnThis === '-' + property) {
          shop.sortOnThis = property;
        } else {
          shop.sortOnThis = property;
        }
      };

    shop.setQuantity =
      /**
       * [increase, decrease item quantity, or delete if zero]
       * @param {Object} item      [inventory element (an item)]
       * @param {Boolean} raiseVal [raise value is true]
       */
      function setQuantity(item, raiseVal) {
        if (raiseVal) {
          item.quantity++;
        } else {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
              shop.inventory.splice(shop.inventory.indexOf(item), 1);
          }
        }
      };
  }
}());
