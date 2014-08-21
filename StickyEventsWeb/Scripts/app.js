angular.module('eventsModule', [])
    .controller('eventsListCtrl', ['$scope', function ($scope) {
        $scope.events = [
            { id: 1, name: "New Years Eve Party", date: "31st Decmeber 2012" },
            { id: 2, name: "Treasure Hunt", date: "22nd September 2012" },
        ];

        $scope.changeValue = function () {
            $scope.events.push({ id: 3, name: "Thanks Giving", date: "July 12, 2014" });
        };
    }])
    .controller('mapCtrl', ['$scope', function ($scope, eventsListCtrl) {
        console.log('mapctrl');
        $scope.get = function(){
            console.log('get');
        };
    }]);




