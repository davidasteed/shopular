(function() {
  'use strict';

  // Angular factory method to create the service
  // to handle work against the inventory data
  angular.module('shop').factory('InventoryService', InventoryService);

  // "dependency injector" for window.location, where localStorage exists
  InventoryService.$inject = ['$location'];

  // angular service Constructor
  // NOTE docblock
  function InventoryService($location) {

    // reference to existing inventory,
    // or create new one
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    // NOTE docblock
    function addItem(item) {
      // if array is empty or null, return
      if (!item || item.length === 0) {
        return;
      }

      // basic property validation
      if ((typeof(item.name) !== 'string') ||
        (item.name.length === 0)) {
        return;
      }
      if (typeof(Number(item.price)) !== 'number') {
        return;
      }
      if (!item.quantity || typeof(Number(item.quantity)) !== 'number') {
        return;
      }
      if (typeof(item.color) !== 'string' || item.color.length === 0) {
        return;
      }

      // build the object to be added to inventory
      // force input strings to matching numerical values
      let tempItem = {};
      tempItem.id = Date.now();   // arbitray "unique id"
      tempItem.name = item.name;
      tempItem.price = Number(item.price);
      tempItem.quantity = Number(item.quantity);
      tempItem.color = item.color;

      // if no discount is provided, make discount zero
      if (item.discount) {
        tempItem.discount = item.discount;
      } else {
        tempItem.discount = 0;
      }

      // push item onto the array
      inventory.push(tempItem);

      // store inventory in localStorage as a String
      localStorage.setItem('inventory', angular.toJson(inventory));
    }

    // NOTE docblock
    function getInventory() {
      return inventory;
    }

    // NOTE docblock
    function setQuantity(item, raiseVal) {

      // get current inventory
      let currentInventory = JSON.parse(localStorage.getItem('inventory'));

      // loop over the array to find matching value
      currentInventory.forEach(function findMatching(eachItem) {
        if (eachItem.id === item.id) {
          // raise or lower quantity, or delete item as appropriate
          if (raiseVal) {
            eachItem.quantity++;
          } else {
            if (item.quantity > 1) {
              eachItem.quantity--;
            } else {
              currentInventory.splice(currentInventory.indexOf(eachItem), 1);
            }
          }
        }

      });


      console.log("localStorage before change: ");
      console.log(localStorage.inventory);
      // write result back into localStorage
      localStorage.setItem('inventory', angular.toJson(currentInventory));

      console.log("inventory in localStorage after change now looks like: ");
      console.log(localStorage.inventory);

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


      // // find item in current localStorage
      // let currentItem = localStorage.inventory;
      // console.log('currentItem is', currentItem);
      //
      // let jsonParsed = JSON.parse(localStorage.getItem('inventory'));
      // console.log('jsonParsed = ', jsonParsed);
      // console.log('jsonParsed[1] = ', jsonParsed[1]);
      //
      // jsonParsed[1].name = 'Jerry';
      // console.log('jerry should be in element 1: ', jsonParsed);
      // localStorage.setItem('inventory', angular.toJson(jsonParsed));
      //
      // console.log('should see Jerry now in ', JSON.parse(localStorage.getItem('inventory')));

      // if (raiseVal) {
      //   // loop through localStorage and raise
      //   // the quality value of the matching index position
      //   for (let i = localStorage.inventory.length - 1; i >= 0; i--) {
      //     if (localStorage.key[i].name === item.name) {
      //       console.log('the match was at ', localStorage[i]);
      //     }
      //   }
      // }
    }





    // allow access to service functions
    return {
      addItem: addItem,
      getInventory: getInventory,
      setQuantity: setQuantity
    };
  }

}());
