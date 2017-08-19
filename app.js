(function () {
  'use strict'
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController);

  NarrowItDownController.$inject =['$http'];
  function NarrowItDownController($http) {
    var menu = this;

    menu.narrowResult = function () {
      $http.get("https://davids-restaurant.herokuapp.com/menu_items.json")
        .then(function (response) {

          var foundItems = [];
          for (var i = 0; i < response.data.menu_items.length; i++) {

            if (response.data.menu_items[i].description.indexOf(menu.searchTerm) !== -1) {
                foundItems.push(response.data.menu_items[i]);
            }
          }
          menu.found = foundItems;
        });
    };

    menu.removeFromList = function (index) {
      menu.found.splice(index, 1);
    };
  }
})();
