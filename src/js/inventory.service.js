(function() {
  'use strict';

  // Angular factory method to create the service
  // to handle work against the inventory data
  angular.module('shop').factory('InventoryService', InventoryService);

  /**
   * [InventoryService constructor]
   */
  function InventoryService() {

    // reference to existing inventory,
    // or create new one
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    /**
     * [add item to the inventory]
     * @param {Objct} item [item to be added]
     */
    function addItem(item) {
      // if array is empty or null, return
      if (!item || (Object.keys(item)).length === 0 ||
        Array.isArray(item) || typeof(item) !== 'object') {
        return;
      }

      // basic property validation
      if (item.id) {
        return; // our system will write an id value
      }

      if (!item.hasOwnProperty('name') ||
        item.name.length === 0 ||
        typeof(item.name) !== 'string') {
        return;
      }
      if (!item.hasOwnProperty('price') ||
        Number.isNaN(Number(item.price)) ||
        typeof(Number(item.price)) !== 'number' ||
        item.price < 0.01) {
        return;
      }
      if (!item.hasOwnProperty('quantity') ||
        Number.isNaN(Number(item.quantity)) ||
        typeof(Number(item.quantity)) !== 'number' ||
        item.quantity % 1 !== 0) {
        return;
      }
      if (!item.hasOwnProperty('color') ||
        typeof(item.color) !== 'string' ||
        item.color.length === 0) {
        return;
      }

      // validate discount only if it was provided
      let discountPresent = item.hasOwnProperty('discount');
      if (discountPresent) {
        if (Number.isNaN(Number(item.discount)) ||
          typeof(Number(item.discount)) !== 'number') {
          return;
        }
      }

      // build the object to be added to inventory
      // force input strings to matching numerical values
      let tempItem = {};
      tempItem.id = Date.now();   // arbitray "unique id"
      tempItem.name = item.name;
      tempItem.price = Number(item.price);
      tempItem.quantity = Number(item.quantity);
      tempItem.color = item.color;

      // set discount, else if not provided, make discount zero
      if (discountPresent) {
        tempItem.discount = item.discount;
      } else if (!discountPresent) {
        tempItem.discount = 0;
      }

      // push item onto the array
      inventory.push(tempItem);

      // store inventory in localStorage as a String
      localStorage.setItem('inventory', angular.toJson(inventory));
    }

    /**
     * [return variable that points to
     * existing or new inventory in localStorage]
     * @return {Object} [inventory as an Object]
     */
    function getInventory() {
      return inventory;
    }

    /**
     * [update inventory if an item's quantity changes]
     * @param {Object} item      [item in the inventory]
     * @param {Boolean} raiseVal [true if user wants to increase quantity]
     */
    function setQuantity(item, raiseVal) {
      // basic validation for arguments
      if (!item || Array.isArray(item) ||
        (Object.keys(item)).length === 0 || typeof(item) !== 'object') {
        return;
      }
      if (typeof(raiseVal) !== 'boolean') {
        return;
      }

      // loop over the array to find matching value
      inventory.forEach(function findMatching(eachItem) {
        if (eachItem.id === item.id) {
          // raise or lower quantity, or delete item as appropriate
          if (raiseVal) {
            eachItem.quantity++;
          } else {
            if (item.quantity > 1) {
              eachItem.quantity--;
            } else {
              inventory.splice(inventory.indexOf(eachItem), 1);
            }
          }
        }
      });

    }

    // allow access to service functions
    return {
      addItem: addItem,
      getInventory: getInventory,
      setQuantity: setQuantity
    };
  }

}());
