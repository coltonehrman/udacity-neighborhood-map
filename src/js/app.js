function ViewModel(){

    var self = this;
    var locations = window.locations;
    var infoWindow = window.infoWindow;

    this.locationsList = ko.observableArray();

    // Populate locationList with window.locations data
    locations.forEach(function(location){
        self.locationsList.push(location.name);
    });

    // Mouseover event handler
    this.locationMouseover = function(location, event){
        var target = getLocation(location);
        target.marker.setAnimation(google.maps.Animation.BOUNCE);
    };

    // Mouseout event handler
    this.locationMouseout = function(location, event){
        locations.forEach(function(location){
            location.marker.setAnimation(null);
        });
    };

    // Click event handler
    this.locationClick = function(location, event){
        var target = getLocation(location);
        locationClicked(target);
    };

    // Filter search handler
    this.searchInput = function(viewmodel, event) {
        var searchText = event.target.value.toLowerCase();
        // Remove everything from list to start from scratch
        self.locationsList.removeAll();

        locations.forEach(function(location){
            // If location is part of filter
            if (location.name.includes(searchText)) {
                // If location marker is not on map
                if (location.marker.map === null) {
                    location.marker.setMap(map);
                }
                self.locationsList.push(location.name);
            }
            // If location isn't part of filter
            else {
                location.marker.setMap(null);
            }

        });
    };

    // Returns window.location data according to locationList name
    function getLocation(location) {
        return locations.reduce(function(prev, curr){
            return (curr.name == location) ? curr : prev;
        });
    }

};

ko.applyBindings(new ViewModel());
