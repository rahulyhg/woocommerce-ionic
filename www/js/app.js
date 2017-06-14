// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        abstract: true
      })
      .state('app.home', {
        url : '/home',
        views : {
          'menuContent' : {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('app.browse', {
        url : '/browse',
        views : {
          'menuContent' : {
            templateUrl: 'templates/browse.html',
            controller: 'BrowseCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/app/home');
  })


.controller('AppCtrl',function ($scope,WC) {
  var store = WC.WC();

  store.get('products/categories',function (er,data,res) {
    console.log(res);
    $scope.categories = (JSON.parse(res)).product_categories;
    $scope.mainCategories = [];
    $scope.categories.forEach(function(element, index) {
      if (element.parent == 0)
        $scope.mainCategories.push(element);
    })
  })

})
  .controller('HomeCtrl',function ($scope) {

  })
  .controller('BrowseCtrl', function($scope, WC){

    $scope.offset = 0;

    $scope.getProducts = function(){
      var Woocommerce = WC.WC();

      Woocommerce.get('products', function(err, data, res){
        if(err)
          console.log(err);

        console.log(JSON.parse(res));

        $scope.products = JSON.parse(res).products;
        $scope.offset = $scope.offset + 10;
        $scope.canLoadMore = true;
      })
    }

    $scope.getProducts();

    $scope.doRefresh = function(){
      $scope.getProducts();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.loadMore = function(){

      var Woocommerce = WC.WC();

      Woocommerce.get('products?filter[offset]='+$scope.offset, function(err, data, res){

        if(err)
          console.log(err);

        JSON.parse(res).products.forEach(function(element, index){

          $scope.products.push(element);

        })

        $scope.$broadcast('scroll.infiniteScrollComplete');

        if(JSON.parse(res).products.length < 10){
          $scope.canLoadMore = false;
          console.log("no more products!");
          return;
        }
        else{
          $scope.offset = $scope.offset + 10;
        }

      })

    }


  })
