(function() {
  'use strict';

  // create new Angular controller
  angular.module('shop')
  .controller('ShopController', ShopController);

  // inject the angular service that handles data calls to inventory
  ShopController.$inject = ['InventoryService'];

  /**
   * [Constructor function for this Angular controller]
   */
  function ShopController(InventoryService) {
    let shop = this;

    shop.usa = true;
    shop.tax = 0.0575;          // tax is 5.75%
    shop.gbpCalc = 1.5;
    shop.sortOnThis = 'price';  // default sort column

    // query the inventory service for the inventory
    shop.inventory = InventoryService.getInventory();

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
      function addItem(item) {
      InventoryService.addItem(item);
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

    shop.setQuantity = function setQuantity(item, raiseVal) {
      InventoryService.setQuantity(item, raiseVal);
    };


      // function setQuantity(item, raiseVal) {
      //   if (raiseVal) {
      //     item.quantity++;
      //   } else {
      //     if (item.quantity > 1) {
      //       item.quantity--;
      //     } else {
      //         shop.inventory.splice(shop.inventory.indexOf(item), 1);
      //     }
      //   }
      // };
  }
}());
