(function () {
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.displayMenu = function (searchItem) {

      var promise = MenuSearchService.getMenuItms(searchItem);
      promise.then(function (response) {
        menu.menuItms = response.data;
        // console.log(menu.menuItms);
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMenuItms = function (searchTerm) {
      console.log(searchTerm);
      var response = $http({
        method: "GET",
      url: (ApiBasePath +"/menu_items.json")
    });

    var foundItems =[];
    console.log(response.data);

    return response;
  };

}

})();
