(function () {
  'use strict'
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

  FoundItemsDirective.$inject =[];
  function FoundItemsDirective() {
    var ddo ={
      templateUrl: 'foundList.html'
    };
    return ddo;
  }

  MenuSearchService.$inject=['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    service.getMatchedMenuItems = function (searchTerm) {

      var foundItems = [];
      $http.get(ApiBasePath +"/menu_items.json")
        .then(function (response) {
          for (var i = 0; i < response.data.menu_items.length; i++) {
            if (response.data.menu_items[i].description.indexOf(searchTerm) !== -1) {
                foundItems.push(response.data.menu_items[i]);
            }
          }
        });
        return foundItems;
    };
}

  NarrowItDownController.$inject =['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.narrowResult = function () {
      menu.found = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    };

    menu.removeFromList = function (index) {
      menu.found.splice(index, 1);
    };
  }
})();
