'use strict';

describe('Controller: BluetoothConfigController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var BluetoothConfigController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        BluetoothConfigController = $controller('BluetoothConfigController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
