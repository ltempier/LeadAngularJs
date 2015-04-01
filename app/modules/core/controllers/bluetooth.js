'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.BluetoothConfigController
 * @description BluetoothConfigController
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('BluetoothConfigController', ['$scope', '$timeout', 'CordovaReady', function ($scope, $timeout, CordovaReady) {
        $scope.devices = [];
        $scope.message = [];

        CordovaReady(function () {

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
