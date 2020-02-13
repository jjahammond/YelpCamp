function initMap() {
  var campgroundLatLng = {lat: 0, lng: 0};

  var map = new google.maps.Map(document.getElementById('map'), {
    center: campgroundLatLng,
    zoom: 14
  });

  var geocoder = new google.maps.Geocoder();
  var address = campground.address;
  // "Mill Lane, Polzeath, Wadebridge PL27 6SS"
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}
