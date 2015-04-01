'use strict';

/**
 * @ngdoc service
 * @name core.Services.CordovaReady
 * @description CordovaReady Factory
 */
angular
    .module('core')
    .factory('CordovaReady',
    function () {

        var _deviceready = false;

        return function (done) {
            if (_deviceready) {
                done();
            }
            else if (typeof window.cordova === 'object') {
                document.addEventListener('deviceready', function () {
                    _deviceready = true
                    done();
                }, false);
            } else {
                done();
            }
        };
    });
