function toggleSidebar(){
    var sidebarToggle = document.getElementById("toggle-sidebar");
    var sidebar = document.getElementById("sidebar");
    var currentLeft = sidebar.style.left;
    var toggleArrow = document.getElementById("toggle-arrow");

    if ( currentLeft == "-300px" || !currentLeft ) {
        sidebar.style.left = "0";
        sidebarToggle.style.left = 300 - sidebarToggle.offsetWidth + "px";
        toggleArrow.classList.toggle("rotateY-180");
    }
    else {
        sidebar.style.left = "-300px";
        sidebarToggle.style.left = "0";
        toggleArrow.classList.toggle("rotateY-180");
    }
}

function searchPlaces(results, status) {

    var photos = results[0].photos;

    bounds.extend(results[0].geometry.location);

    if (photos) {

        var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: results[0].name,
            icon: results[0].photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})
        });

    }
    else {
        var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: results[0].name
        });
    }

    var infoWindow = new google.maps.InfoWindow({
        content: "<div><h1>Test</h1></div>"
    });

    marker.addListener("click", function(){
        infoWindow.open(map, marker);
    });

    service.getDetails({placeId: results[0].place_id}, getDetails);

    map.fitBounds(bounds);
}

function getDetails() {
    console.log(arguments);
}
