(function ($, angular, window, undefined) {

    /*
    Sample json output from web api /api/events 
    [{
        "Id": 1,
        "Name": "New Years Eve Party",
        "Date": "31st Decmeber 2012",
        "Address": {
            "Address1": "64 Glebe Place",
            "Address2": "",
            "Suburb": "PENRITH",
            "State": "NSW",
            "Country": "Australia"
        }
    }, {
        "Id": 2,
        "Name": "Treasure Hunt",
        "Date": "22nd September 2012",
        "Address": {
            "Address1": "615 Thirlmere Way",
            "Address2": "",
            "Suburb": "PICTON",
            "State": "NSW",
            "Country": "Australia"
        }
    }];
    */

    angular.module('eventsModule', [])
        .controller('eventsMapCtrl', ['$scope', '$http', function ($scope, $http) {

            var geocoder, map;

            function centerAddressOnMap(address) {    
                geocoder.geocode({ 'address': address }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        $scope.error = true;
                        $scope.info = 'Geocode was not successful for the following reason: ' + status;
                    }
                });                
            }

            function getCompleteAddress(event) {
                return event.Address.Address1 + ' ' + event.Address.Address2 + ' ' + event.Address.Suburb + ', ' + event.Address.State + ', ' + event.Address.Country;
            }

            // function for Next btn
            $scope.nextEvent = function () {
                if ($scope.index + 1 == $scope.events.length) {
                    $scope.index = 0;
                } else {
                    $scope.index++;
                }
                var event = $scope.events[$scope.index];
                if (typeof event !== 'undefined') {
                    centerAddressOnMap(getCompleteAddress(event));
                }
            };

            // populates events and initializes map
            $http.get('/api/events/')
                .success(function (data) {
                    $scope.events = data;
                    geocoder = new google.maps.Geocoder();
                    map = new google.maps.Map($('.map-canvas')[0], {
                        zoom: 8,
                        center: new google.maps.LatLng(-34.397, 150.644)
                    });
                    $scope.index = 0;
                    var event = $scope.events[$scope.index];
                    if (typeof event !== 'undefined') {
                        centerAddressOnMap(getCompleteAddress(event));
                    }
                });            
        }])

})(jQuery, angular, window);

