app.directive('fileUpload', ["FileUploader","$http","$localStorage",function (FileUploader,$http,$localStorage) {
    return {
        restrict: 'EA',
        replace: true,
        required: 'targeturi',
        required: 'filename',
        scope: {
            filename: "=",
            targeturi: "=",
            onChange: '&',

        },
        templateUrl: 'js/template/single-image-upload-directive.html',
        link: function (scope, elm, attrs) {
            scope.uploader = new FileUploader();
            scope.uploader.filters.push({
                name: 'customFiltexr',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    return this.queue.length < 1;
                }
            });
            scope.uploader.filters.push({
                name: 'extension',
                fn: function(item) {
                    return true;
                }
            });
            scope.uploader.onSuccessItem = function(item, response, status, headers) {
                if(response.status == 'ERROR'){
                    item.isSuccess = false;
                    item.isError = true;
                }
                if(item.isError){
                    scope.onChange({type:'error',title:'',text:'上传文件失败'});
                    scope.imgBool=false;
                }else{
                    scope.onChange({type:'success',title:'',text:'上传文件成功',name:response.data});
                    scope.imgBool=true;
                }
            };
            scope.uploader.onErrorItem = function(item, response, status, headers) {
                console.log(response);
            };
            if(scope.filename == '' || scope.filename == undefined){
                scope.uploader.url=scope.targeturi;
            }else{
                scope.uploader.url=scope.targeturi+"?filename="+scope.filename;
            }
            scope.uploader.url=scope.targeturi;
            scope.$watch("filename",function(newVal,oldVal){
                if(newVal!=oldVal){
                    if(scope.filename == '' || scope.filename == undefined || scope.filename == null || scope.filename == 'null'){
                        scope.uploader.url=scope.targeturi;
                    }else{
                        scope.uploader.url=scope.targeturi+"?filename="+newVal;
                    }
                }
            },true)
            scope.fileUpload = function(){
                $localStorage.closeStatus = false;
                var temp = scope.uploader.queue.length - 1;
                scope.uploader.queue[temp].upload();
            }
        }

    };
}]);