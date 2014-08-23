(function () {

    /*
    1 - Retrieve data from the web api - done, but refactor using resource
    2 - Get the latLng of the address of the first event - 
    3 - Initialize the map with the latlng of the first address - working but zoomed out and no marker
       
    4 - Btn click cycles through the list of events and displays 
        and displays the address of the next event on the google map
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
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });                
            }

            $scope.nextEvent = function () {
                if ($scope.index + 1 == $scope.events.length) {
                    $scope.index = 0;
                } else {
                    $scope.index++;
                }
                var event = $scope.events[$scope.index];
                if (event !== 'undefined') {
                    centerAddressOnMap(event.Address.Address1);
                }
            };

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
                    if (event !== 'undefined') {
                        centerAddressOnMap(event.Address.Address1);
                    }
                });            
        }])

})();

//var geocoder;
//var map;
//function initialize() {
//    geocoder = new google.maps.Geocoder();
//    var latlng = new google.maps.LatLng(-34.397, 150.644);
//    var mapOptions = {
//        zoom: 8,
//        center: latlng
//    }
//    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//}

//function codeAddress() {
//    var address = document.getElementById('address').value;
//    geocoder.geocode({ 'address': address }, function (results, status) {
//        if (status == google.maps.GeocoderStatus.OK) {
//            map.setCenter(results[0].geometry.location);
//            var marker = new google.maps.Marker({
//                map: map,
//                position: results[0].geometry.location
//            });
//        } else {
//            alert('Geocode was not successful for the following reason: ' + status);
//        }
//    });
//}

//  

//$scope.events = [{
//    "Id": 1,
//    "Name": "New Years Eve Party",
//    "Date": "31st Decmeber 2012",
//    "Address": {
//        "Address1": "64 Glebe Place",
//        "Address2": "",
//        "Suburb": "PENRITH",
//        "State": "NSW",
//        "Country": "Australia"
//    }
//}, {
//    "Id": 2,
//    "Name": "Treasure Hunt",
//    "Date": "22nd September 2012",
//    "Address": {
//        "Address1": "615 Thirlmere Way",
//        "Address2": "",
//        "Suburb": "PICTON",
//        "State": "NSW",
//        "Country": "Australia"
//    }
//}];

//{                            
//    "status": "OK",
//    "results": [ {
//        "types": [ "locality", "political" ],
//        "formatted_address": "Winnetka, IL, USA",
//        "address_components": [ {
//            "long_name": "Winnetka",
//            "short_name": "Winnetka",
//            "types": [ "locality", "political" ]
//        }, {
//            "long_name": "Illinois",
//            "short_name": "IL",
//            "types": [ "administrative_area_level_1", "political" ]
//        }, {
//            "long_name": "United States",
//            "short_name": "US",
//            "types": [ "country", "political" ]
//        } ],
//        "geometry": {
//            "location": {
//                "lat": 42.1083080,
//                "lng": -87.7417070
//            },
//            "location_type": "APPROXIMATE",
//            "viewport": {
//                "southwest": {
//                    "lat": 42.0917501,
//                    "lng": -87.7737218
//                },
//                "northeast": {
//                    "lat": 42.1248616,
//                    "lng": -87.7096922
//                }
//            },
//            "bounds": {
//                "southwest": {
//                    "lat": 42.0885320,
//                    "lng": -87.7715480
//                },
//                "northeast": {
//                    "lat": 42.1284090,
//                    "lng": -87.7110160
//                }
//            }
//        }
//    } ]
//}


// http://ericpanorel.net/2013/08/11/angularjs-and-google-maps/
// http://jsfiddle.net/ramandv/xSPAA/
//'use strict';
//gApp.controller('CtrlGMap',
//    function CtrlGMap($scope) {
//        // defaults for your business location and blurb
//        var streetAddress = "5111 47 St NE  Calgary, AB T3J 3R2",
//            Location = new google.maps.LatLng(51.098945, -113.970889),
//            businessWriteup = "<b>Calgary Police Service</b><br/>Calgary's Finest<br/>",
//            defaultFromAddress = 'Calgary',
//            businessTitle = "Calgary Police Service",
//            directionsService = new google.maps.DirectionsService(),
//            directionsDisplay = new google.maps.DirectionsRenderer({
//                draggable: true
//            }),

//            mapOptions = {
//                center: Location,
//                zoom: 11,
//                mapTypeId: google.maps.MapTypeId.ROADMAP
//            },
//            map = new google.maps.Map(document.getElementById("map_canvas"),
//            mapOptions);

//        // add your fixed business marker
//        var contentString = businessWriteup + streetAddress,
//          marker = new google.maps.Marker({
//              position: Location,
//              map: map,
//              title: businessTitle,
//              animation: google.maps.Animation.DROP
//          });
//        // show info Window
//        var infowindow = new google.maps.InfoWindow({
//            content: contentString
//        });
//        google.maps.event.addListener(marker, 'click', function () {
//            infowindow.open(map, marker);
//        });

//        directionsDisplay.setMap(map);
//        directionsDisplay.setPanel(document.getElementById('directions'));


//        $scope.fromAddress = defaultFromAddress;
//        $scope.selectedOption = 'Driving';
//        $scope.options = ['Driving', 'Walking', 'Bicycling', 'Transit'];
//        $scope.totalKm = 0;

//        $scope.setDirections = function () {
//            var selectedMode = $scope.selectedOption.toUpperCase() || 'DRIVING',
//                from = $scope.fromAddress || defaultFromAddress,
//                request = {
//                    origin: from,
//                    destination: streetAddress,
//                    travelMode: selectedMode,
//                    provideRouteAlternatives: true,
//                    unitSystem: google.maps.UnitSystem.METRIC,
//                    optimizeWaypoints: true
//                };
//            if (selectedMode === 'TRANSIT') {
//                request.transitOptions = {
//                    departureTime: new Date()
//                };
//            }

//            directionsService.route(request, function (response, status) {
//                if (status === google.maps.DirectionsStatus.OK) {
//                    directionsDisplay.setDirections(response);
//                } else {
//                    toastr.error(status);
//                }
//            });
//        }

//        // Try HTML5 geolocation
//        if ("geolocation" in navigator) {
//            navigator.geolocation.getCurrentPosition(function (position) {
//                var pos = new google.maps.LatLng(position.coords.latitude,
//                                                 position.coords.longitude);
//                //map.setCenter(Location);
//                $scope.$apply(function () {
//                    $scope.fromAddress = pos;
//                });
//                $scope.setDirections();
//            });
//        }







//        google.maps.event.addListener(directionsDisplay, 'directions_changed', function () {

//            computeTotalDistance(directionsDisplay.directions);
//            try {
//                if (directionsDisplay.directions.routes[0].legs[0]) {

//                    $scope.$apply(function () {
//                        $scope.fromAddress = directionsDisplay.directions.routes[0].legs[0].start_address;
//                    });
//                }
//            } catch (e) { }
//        });

//        // fire it up initially
//        $scope.setDirections();
//        // watch if the mode has changed
//        $scope.$watch('selectedOption', function (newValue, oldValue) { $scope.setDirections(); });

//        function computeTotalDistance(result) {
//            var total = 0, i,
//                myroute = result.routes[0];
//            for (i = 0; i < myroute.legs.length; i++) {
//                total += myroute.legs[i].distance.value;
//            }
//            total = total / 1000;
//            $scope.$apply(function () {
//                $scope.totalKm = total;
//            });
//        }

//    }
//);
