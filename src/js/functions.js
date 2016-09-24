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

                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    addLocation(results, status, index);
                } else {
                    alert("Error: " + status);
                }

            });

        })(index);
    });

    // Setup event handlers
    $("#toggle-sidebar").on("click", toggleSidebar);
    ko.applyBindings(new ViewModel());
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

    var lat = location.geometry.location.lat();
    var lng = location.geometry.location.lng();

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

    var url = "https://api.foursquare.com/v2/venues/search/?" + $.param({
        client_id: "TO52PZ1FSWGVFG0EEU3R1LUEXCNLHNQTTGNAKMDYA3JTITPM",
        client_secret: "LDD0AVTHQDHICVA5KZRDRJGCFX4KA410SIHR0UWKK0FQCB2Z",
        v: "20130815",
        ll: lat + "," + lng,
        query: location.name,
        limit: "5"
    });

    $.ajax(url, {
        dataType: "jsonp",
        success: function(data){
            var id = data.response.venues[0].id;
            getPhotos(id, target);
        },
        error: function(xhr, status, error) {
            alert("Error: " + status);
        }
    });

    function getPhotos(id, model) {
        url = "https://api.foursquare.com/v2/venues/" + id + "/photos/?" + $.param({
            client_id: "TO52PZ1FSWGVFG0EEU3R1LUEXCNLHNQTTGNAKMDYA3JTITPM",
            client_secret: "LDD0AVTHQDHICVA5KZRDRJGCFX4KA410SIHR0UWKK0FQCB2Z",
            v: "20130815"
        });

        $.ajax(url, {
            dataType: "jsonp",
            success: function(data){
                var photos = data.response.photos.items;
                photos.forEach(function(photo){
                    var url = photo.prefix + "height100" + photo.suffix;
                    model.photos.push(url);
                });
            },
            error: function(xhr, status, error) {
                alert("Error: " + status);
            }
        });
    }

    map.fitBounds(bounds);
}

function locationClicked(target) {
    var infoWindow = window.infoWindow;
    var map = infoWindow.getMap();
    var locations = window.locations;
    var content = "<div>";

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
        target.photos.forEach(function(photo){
            var img = "<img src='" + photo + "'>";
            content += img;
        });
        content += "</div>";
        infoWindow.setContent(content);
        infoWindow.open(map, target.marker);
        target.marker.setIcon("http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png");
    }
}

function mapError() {
    alert("Google Map Error");
}
