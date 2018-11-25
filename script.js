let map;
let geocoder;

$(document).ready(function() {

    //initialize Map
    initMap();

    $("#addAddress").click(function() {
        var addressValue = $(this).siblings("input").val();
        console.log("Address: " + addressValue);

        geocoder.geocode({ "address": addressValue }, function(results, status) {
            if (status === "OK") {

                var addressLatLng = results[0].geometry.location;
                map.setCenter(addressLatLng);

                var marker = new google.maps.Marker({
                    map: map,
                    position: addressLatLng
                });

                $("<li/>")
                    .text(addressValue)
                    .appendTo("ul")
                    .attr("data-geolat", addressLatLng.lat())
                    .attr("data-geolng", addressLatLng.lng());

                $("input").val("");

            } else {
                alert("Geocoding unsuccessful. Error: " + status);
                $("input").val("");
            }
        });
    });

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 41.0815, lng: -74.1746 },
            zoom: 10
        });

        geocoder = new google.maps.Geocoder();
    }

    $("#listAddress").on("click", "li", function() {
        var lat = $(this).data("geolat");
        var lng = $(this).data("geolng");
        map.setCenter({ lat: lat, lng: lng });
    });
});