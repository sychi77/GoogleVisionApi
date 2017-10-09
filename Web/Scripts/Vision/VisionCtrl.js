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
        vm.visionService = visionService;
        vm.$onInit = _init;
        vm.$window = $window;
        vm.toastr = toastr;
        vm.imgUrl;
        vm.imgFile;
        vm.submit = _submit;
        vm.gcKey;

        function _init() {
            vm.visionService.getKey()
                .then(_getKeyGood, _error);
        }
        function _getKeyGood(data) {
            vm.gcKey = data.data.Value;
        }
        function _submit(imgData) {
            vm.visionService.getImageAnalysis(vm.gcKey, imgData)
                .then(_getImgGood, _error);
        }
        function _error(err) {
            console.log(err);
        }

    }
})();

