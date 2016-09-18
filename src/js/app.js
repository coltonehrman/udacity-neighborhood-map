function ViewModel(){

    var self = this;

    self.locations = ko.observableArray();

    locations.forEach(function(location){
        self.locations.push(location.name);
    });

    self.locationMouseover = function(location, event){
        var target = getLocation(location);
        target.marker.setAnimation(google.maps.Animation.BOUNCE);
    };

    self.locationMouseout = function(location, event){
        locations.forEach(function(location){
            location.marker.setAnimation(null);
        });
    };

    self.locationClick = function(location, event){
        var target = getLocation(location);
        var open = true;
        var map = target.infoWindow.getMap();

        if (map !== null && typeof map !== "undefined") {
            open = false;
        }

        locations.forEach(function(location){
            location.infoWindow.close();
        });

        if (open) target.infoWindow.open(map, target.marker);
    };

    self.searchInput = function(viewmodel, event) {
        var searchText = event.target.value.toLowerCase();
        self.locations.removeAll();
        locations.forEach(function(location){
            self.locations.push(location.name);
        });
        locations.forEach(function(location){
            if (!location.name.includes(searchText)) {
                self.locations.remove(location.name);
            }
        });
    };

    function getLocation(location) {
        return locations.reduce(function(prev, curr){
            return (curr.name == location) ? curr : prev;
        });
    }

};

ko.applyBindings(new ViewModel());
