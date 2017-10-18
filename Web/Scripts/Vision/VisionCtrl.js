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
        vm.imgUrl; //Image URL
        vm.imgFile; //Image File Uploaded
        vm.submitUpload = _submitUpload;
        vm.submitUri = _submitUri;
        vm.gcKey;
        vm.requests = [];
        vm.imagePreview;
        vm.labels; //Label Annotations from Google Cloud Vision API
        vm.webDetection;
        vm.load = false;

        //On initiation, gets Google Cloud API Key
        function _init() {
            vm.visionService.getKey()
                .then(_getKeyGood, _error);
        }
        function _getKeyGood(data) {
            vm.gcKey = data.data.Value;
        }
        //Submit uploaded image as base-64 encoded file
        function _submitUpload() {
            var files = document.getElementById('imageUpload').files;
            getBase64(files[0]);
        }
        //Submit image URL to Google Vision API
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
                            },
                            {
                                "type": "WEB_DETECTION"
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
            vm.webDetection = resp.data.responses[0].webDetection;
            
        }
        function _getImgGood(resp) {
            vm.load = true;
            console.log(resp);
            vm.imagePreview = vm.imgFile;
            vm.labels = resp.data.responses[0].labelAnnotations;
        }
        //Function gets Base-64 encoded form of Image file for JSON request
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
                                },
                                {
                                    "type": "WEB_DETECTION"
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