'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.BluetoothConfigController
 * @description BluetoothConfigController
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('BluetoothConfigController', ['$scope', '$timeout', function ($scope, $timeout,) {
        $scope.devices = [];


        $timeout(function () {
            $scope.message = [bluetoothle]

            bluetoothle.initialize(function (initializeResult) {

                $scope.message.push(initializeResult)

                if (initializeResult.status == "enabled") {
                    $scope.devices = [];
                    bluetoothle.startScan(function (scanResult) {

                        $scope.message.push(scanResult)

                        if (scanResult.status == "scanResult") {
                            $scope.devices.push(scanResult)
                        }
                    }, onError, {});
                }
            }, onError, {
                "request": true
            });
        }, 1000)


        function onError() {
            $scope.error = arguments
            console.log('error ', arguments)
        }

    }]);
