import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const BusTracker = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [location, setLocation] = useState({ lat: 30.8773, lng: 76.8723 });

  useEffect(() => {
    // Initialize map only once
    mapRef.current = L.map("map").setView([location.lat, location.lng], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // Add initial marker
    markerRef.current = L.marker([location.lat, location.lng]).addTo(mapRef.current);

    return () => {
      mapRef.current.remove(); // Cleanup
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://your-server-url/get-location")
        .then((res) => res.json())
        .then((data) => {
          if (data.latitude && data.longitude) {
            const lat = parseFloat(data.latitude);
            const lng = parseFloat(data.longitude);
            setLocation({ lat, lng });

            // Update marker position
            if (markerRef.current) {
              markerRef.current.setLatLng([lat, lng]);
              mapRef.current.setView([lat, lng]);
            }
          }
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="map" style={{ height: "100vh", width: "100%" }}></div>
  );
};

export default BusTracker;
