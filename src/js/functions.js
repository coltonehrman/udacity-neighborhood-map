function initMap() {

    // Setup empty bounds object for later use when making map contain all locations
    var bounds = window.bounds = new google.maps.LatLngBounds();

    // Setup single infoWindow to be used for all locations
    window.infoWindow = new google.maps.InfoWindow();

    var map = window.map = new google.maps.Map($("#map")[0], {
        center: new google.maps.LatLng(0, 0),
        zoom: 8
    });

    var service = window.service = new google.maps.places.PlacesService(map);

    window.locations.forEach(function(query, index){
        // Closure function to maintain the correct index for each location
        (function(index){

            service.textSearch({

                location: map.center,
                query: query.name

            }, function(results, status){

                addLocation(results, status, index);

            });

        })(index);
    });

    // Setup event handlers
    $("#toggle-sidebar").on("click", toggleSidebar);
}

function toggleSidebar(){
    var $map = $("#map");
    var $sidebar = $("#sidebar");
    var $toggleArrow = $("#toggle-arrow");
    var $searchBar = $("#search-bar");

    $map.toggleClass("sidebar-opened");
    $sidebar.toggleClass("opened");
    $toggleArrow.toggleClass("rotateY-180");
    $searchBar.focus();
}

function addLocation(results, status, index) {

    var target = locations[index];
    var location = results[0];
    var photos = location.photos;

    var bounds = window.bounds;
    var map = window.map;
    var infoWindow = window.infoWindow;

    // Extend bounds object for each location
    bounds.extend(location.geometry.location);

    // Create the marker for each location object
    target.marker = new google.maps.Marker({
        position: location.geometry.location,
        map: map
    });

    // Add an event handler for location marker
    target.marker.addListener("click", function(){
        locationClicked(target);
    });

    //service.getDetails({placeId: location.place_id}, getDetails);

    map.fitBounds(bounds);
}

function locationClicked(target) {
    var infoWindow = window.infoWindow;
    var map = infoWindow.getMap();
    var locations = window.locations;

    locations.forEach(function(location){
        location.marker.setIcon();
    });

    // If infoWindow content is the same as before (click on same location)
    if (infoWindow.content === target.name) {
        infoWindow.setContent(null);
        infoWindow.close();
    }
    // click on different location
    else {
        infoWindow.setContent(target.name);
        infoWindow.open(map, target.marker);
        target.marker.setIcon("http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png");
    }
}

function getDetails() {
    console.log(arguments);
}
