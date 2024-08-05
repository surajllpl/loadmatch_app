import React, { useEffect, useRef } from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const MapLoader = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY}
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};

function GoogleMapUse({ hsource, hdestination }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const google = window.google;
    if (!google) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 8,
    });

    if (!hsource || !hdestination) return;

    const sourceMarker = new google.maps.Marker({
      position: {
        lat: hsource.geometry?.location?.lat,
        lng: hsource.geometry?.location?.lng,
      },
      map: map,
      title: "Source",
    });

    const destinationMarker = new google.maps.Marker({
      position: {
        lat: hdestination.geometry?.location?.lat,
        lng: hdestination.geometry?.location?.lng,
      },
      map: map,
      title: "Destination",
    });

    const directionsService = new google.maps.DirectionsService();
    const request = {
      origin: {
        lat: hsource.geometry?.location?.lat,
        lng: hsource.geometry?.location?.lng,
      },
      destination: {
        lat: hdestination.geometry?.location?.lat,
        lng: hdestination.geometry?.location?.lng,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const distance = result.routes[0].legs[0]?.distance?.text;
        const duration = result.routes[0].legs[0]?.duration?.text;
        console.log("Distance:", distance);
        console.log("Duration:", duration);
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  }, [hsource, hdestination]);

  return (
    <MapLoader>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
    </MapLoader>
  );
}

export default GoogleMapUse;
