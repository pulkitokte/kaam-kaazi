import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const trendingServices = [
  {
    id: 1,
    name: "AC Service",
    lat: 19.076,
    lng: 72.8777,
  },
  {
    id: 2,
    name: "ELectrician",
    lat: 19.079,
    lng: 72.8812,
  },
  {
    id: 3,
    name: "Salon",
    lat: 19.075,
    lng: 72.8731,
  },
];

export default function TrendingMap() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocation({ lat: 19.076, lng: 72.8777 });
      }
    );
  }, []);

  if (!location)return <p className="text-center font-style: italic">fetching location...</p>
    
    return (
        <div className="w-full h-[450]">

        </div>
    )
}
