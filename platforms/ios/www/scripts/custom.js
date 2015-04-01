'use strict';
var ApplicationConfiguration = (function() {
    var applicationModuleName = 'angularjsapp';
    var applicationModuleVendorDependencies = ['ngResource', 'ngCookies', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils'];
    var registerModule = function(moduleName) {
        angular
            .module(moduleName, []);
        angular
            .module(applicationModuleName)
            .requires
            .push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();

'use strict';

angular
    .module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular
    .module(ApplicationConfiguration.applicationModuleName)
    .config(['$locationProvider',
        function ($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);
angular
    .element(document)
    .ready(function () {
        if (window.location.hash === '#_=_') {
            window.location.hash = '#!';
        }
        angular
            .bootstrap(document,
                [ApplicationConfiguration.applicationModuleName]);
    });

'use strict';

ApplicationConfiguration.registerModule('core');

'use strict';

angular
    .module('core')
    .config(['$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

                                    $stateProvider
                .state('bluetooth', {
                    url: '/bluetooth',
                    templateUrl: 'modules/core/views/bluetooth.html',
                    controller: 'BluetoothConfigController'
                })
                .state('home', {
                    url: '/',
                    templateUrl: 'modules/core/views/home.html',
                    controller: 'HomeController'
                });
        }
    ]);

'use strict';

angular
    .module('core')
    .factory('CordovaReady',
    function () {

        var _deviceready = false;

        return function (done) {
            if (_deviceready) {
                done('_deviceready');
            }
            else if (typeof window.cordova === 'object') {
                document.addEventListener('deviceready', function () {
                    _deviceready = true
                    done('addEventListener');
                }, false);
            } else {
                done('nada');
            }
        };
    });

'use strict';

angular
    .module('core')
    .controller('BluetoothConfigController', ['$rootScope', '$scope', '$timeout', 'CordovaReady', function ($rootScope, $scope, $timeout, CordovaReady) {
        $scope.devices = [];
        $scope.message = [];

        CordovaReady(function (message) {
            $scope.message.push('CordovaReady '+message);

            bluetoothle.initialize(function (initializeResult) {

                $scope.message.push(initializeResult);

                if (initializeResult.status == "enabled") {
                    $scope.devices = [];
                    bluetoothle.startScan(function (scanResult) {

                        $scope.message.push(scanResult);

                        if (scanResult.status == "scanResult") {
                            $scope.devices.push(scanResult)
                        }
                    }, onError, {});
                }
            }, onError, {
                "request": true
            });
        });


        function onError() {
            $scope.error = arguments;
            console.log('error ', arguments)
        }
    }]);

'use strict';

angular
    .module('core')
    .controller('HomeController', ['$scope',
        function($scope) {

        }
    ]);
