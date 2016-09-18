function toggleSidebar(){
    var $map = $("#map");
    var $sidebar = $("#sidebar");
    var $toggleArrow = $("#toggle-arrow");

    $map.toggleClass("sidebar-opened");
    $sidebar.toggleClass("opened");
    $toggleArrow.toggleClass("rotateY-180");
}

function addLocations(results, status, index) {

    var location = results[0];
    var photos = location.photos;
    console.log(results[0]);
    bounds.extend(location.geometry.location);

    locations[index].marker = new google.maps.Marker({
        position: location.geometry.location,
        map: map,
        title: location.name
    });

    locations[index].infoWindow = new google.maps.InfoWindow({

        content: '<div class="location-details"><h1 class="location-name">' + locations[index].name + '</h1><div class="col-half"><strong>Address:</strong><address>' + location.formatted_address.split(", ").join("<br>") + '</address></div><div class="col-half"><strong>Hours:</strong></div></div>'
    });

    locations[index].marker.addListener("click", function(){
        locations.forEach(function(location){
            location.infoWindow.close();
        });
        locations[index].infoWindow.open(map, locations[index].marker);
    });

    //service.getDetails({placeId: location.place_id}, getDetails);

    map.fitBounds(bounds);
}

function getDetails() {
    console.log(arguments);
}
