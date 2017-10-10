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
        vm.submitUpload = _submitUpload;
        vm.submitUri = _submitUri;
        vm.gcKey;
        vm.requests = [];

        function _init() {
            vm.visionService.getKey()
                .then(_getKeyGood, _error);
        }
        function _getKeyGood(data) {
            vm.gcKey = data.data.Value;
        }
        function _submitUpload() {
            var files = document.getElementById('imageUpload').files;
            getBase64(files[0]);
        }
        function _submitUri() {
            var requests = {
                "requests": [
                    {
                        "image": {
                            "source": {
                                "imageUri": vm.imgUrl
                            }
                        },
                        "features": [
                            {
                                "type": "LABEL_DETECTION",
                                "maxResults": 10
                            }
                        ]
                    }
                ]
            }
            vm.visionService.getImageAnalysis(vm.gcKey, requests)
                .then(_getImgGood, _error);
        }
        function _getImgGood(resp) {
            console.log(resp);

        }
        function getBase64(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                var imgContent = reader.result.substring(22);
                var requests = {
                    "requests": [
                        {
                            "image": {
                                "content": imgContent
                            },
                            "features": [
                                {
                                    "type": "LABEL_DETECTION",
                                    "maxResults": 10
                                }
                            ]
                        }
                    ]
                }
            vm.visionService.getImageAnalysis(vm.gcKey, requests)
                .then(_getImgGood, _error);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
        function _error(err) {
            console.log(err);
        }

    }
})();

