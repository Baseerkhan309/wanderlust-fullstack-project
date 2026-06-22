if (!window.listing.geometry || !window.listing.geometry.coordinates) {
    console.log("No location data");
} else {

    const coordinates = window.listing.geometry.coordinates;

    const map = L.map('map', {
        attributionControl: false
    })
        .setView(
            [coordinates[1], coordinates[0]],
            12
        );

    L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    )
        .addTo(map);


    const customIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [40, 40],
    });


    L.marker([coordinates[1], coordinates[0]], {
        icon: customIcon
    })
        .addTo(map)
        .bindPopup(window.listing.title)
        .openPopup();
}