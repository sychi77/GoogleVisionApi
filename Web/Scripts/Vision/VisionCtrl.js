//Index Controller
(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('visionController', visionController);

    visionController.$inject = ['$scope', 'visionService', '$window', 'toastr'];

    function visionController($scope, visionService, $window, toastr) {

        var vm = this;
        vm.$scope = $scope;
        vm.visionService = _visionService;
        vm.$onInit = _init;
        vm.$window = $window;
        vm.toastr = toastr;

        function _init() {
            return
        }

        function _error(err) {
            return console.log(err)
        }

    }
})();

