﻿//Index Controller
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
        vm.imagePreview;
        vm.labels;
        vm.load = false;

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
                .then(_getUriGood, _error);
        }
        function _getUriGood(resp) {
            vm.load = true;
            console.log(resp);
            vm.imagePreview = vm.imgUrl;
            vm.labels = resp.data.responses[0].labelAnnotations;

        }
        function _getImgGood(resp) {
            vm.load = true;
            console.log(resp);
            vm.imagePreview = vm.imgFile;
            vm.labels = resp.data.responses[0].labelAnnotations;
        }
        function getBase64(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                vm.imgFile = reader.result;
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

