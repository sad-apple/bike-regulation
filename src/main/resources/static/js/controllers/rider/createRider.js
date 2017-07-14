
app.controller('createRiderController', ['$scope', '$http', '$modalInstance', function ($scope, $http, $modalInstance) {

    $scope.roles = null;
    $scope.checkRoles = [];

    //获得骑行用户列表
    function init(){
        /*$http.get('customers/getAllRole').success(function (data){
            $scope.roles = data.data;
        });*/

        $scope.riderDto={};
        $scope.riderDto.userStatus="1";
     /*   $scope.riderDto.isModifyPassWord="1";
        $scope.riderDto.isMoreoverLogin="1";
        $scope.riderDto.isPhoneLogin="1";
        $scope.riderDto.isWechatLogin="1";*/
    }

    init();

    $scope.updateSelection = function($event,id){
        var checkbox = $event.target ;
        var checked = checkbox.checked ;
        if(checked){
            $scope.checkRoles.push(id) ;
        }else{
            var idx = $scope.checkRoles.indexOf(id) ;
            $scope.checkRoles.splice(idx,1) ;
        }
    } ;

    /**
     * 创建骑行用户信息
     */
    $scope.create = function () {
        $http.post('customers/createRider', $scope.riderDto).success(function (data) {
            if(data.status=="ERROR"){
                alert(data.error);
            }else{
                $scope.close('SUCCESS');
            }
        }).error(function (err) {
            alert(err.error);
        });
    }

    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
    
    var ID = $scope.riderDto.idCardNumber;

    $scope.idCardValidate = function () {
        if(typeof ID !== 'string') return false;
        var city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
        var d = new Date(birthday);
        var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
        var currentTime = new Date().getTime();
        var time = d.getTime();
        var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        var sum = 0, i, residue;

        if(!/^\d{17}(\d|x)$/i.test(ID)) return false;
        if(city[ID.substr(0,2)] === undefined) return false;
        if(time >= currentTime || birthday !== newBirthday) return false;
        for(i=0; i<17; i++) {
            sum += ID.substr(i, 1) * arrInt[i];
        }
        residue = arrCh[sum % 11];
        if (residue !== ID.substr(17, 1)) return false;

        return true;
    }
    
}]);


