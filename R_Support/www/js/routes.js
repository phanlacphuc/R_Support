angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('phanPhucLac.new', {
    cache: false,
    url: '/new',
    views: {
      'side-menu21': {
        templateUrl: 'templates/new.html',
        controller: 'newCtrl'
      }
    }
  })

  .state('phanPhucLac.page10', {
    cache: false,
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/new.html',
        controller: 'page10Ctrl'
      }
    }
  })

  .state('phanPhucLac.page11', {
    cache: false,
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/new.html',
        controller: 'page11Ctrl'
      }
    }
  })

  .state('phanPhucLac.page12', {
    cache: false,
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/new.html',
        controller: 'page12Ctrl'
      }
    }
  })

  .state('phanPhucLac.page13', {
    cache: false,
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/new.html',
        controller: 'page13Ctrl'
      }
    }
  })

  .state('phanPhucLac.page23', {
    cache: false,
    url: '/page23',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page23.html',
        controller: 'page23Ctrl'
      }
    }
  })

  .state('phanPhucLac', {
    url: '/side-menu21',
    templateUrl: 'templates/phanPhucLac.html',
    controller: 'sidemenuCtrl',
    abstract:true
  })

  .state('page6', {
    url: '/page6',
    templateUrl: 'templates/page6.html',
    controller: 'page6Ctrl'
  })

  .state('phanPhucLac.page8', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page8.html',
        controller: 'page8Ctrl'
      }
    }
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })
  .state('page25', {
    url: '/page25',
    templateUrl: 'templates/page25.html',
    controller: 'page25Ctrl'
  })
  .state('phanPhucLac.page15', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page15.html',
        controller: 'page15Ctrl'
      }
    }
  })
  .state('signupsuccess', {
    url: '/signupsuccess',
    templateUrl: 'templates/page15.html',
    controller: 'signupsuccessCtrl'
  })
  .state('page14', {
    url: '/page14',
    templateUrl: 'templates/page14.html',
    controller: 'page14Ctrl'
  })

  .state('page24', {
    cache: false,
    url: '/page24',
    templateUrl: 'templates/page24.html',
    controller: 'page24Ctrl'
  })

$urlRouterProvider.otherwise('/page6')



});
