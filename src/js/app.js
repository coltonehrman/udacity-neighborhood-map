function ViewModel(){

    var self = this;

    self.locations = ko.observableArray();

    locations.forEach(function(location){
        self.locations.push(location.name);
    });

    self.locationMouseover = function(location, event){

        var target = locations.reduce(function(prev, curr){
            return (curr.name == location) ? curr : prev;
        });

        target.marker.setAnimation(google.maps.Animation.BOUNCE);
    };

    self.locationMouseout = function(location, event){
        locations.forEach(function(location){
            location.marker.setAnimation(null);
        });
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

};

ko.applyBindings(new ViewModel());
