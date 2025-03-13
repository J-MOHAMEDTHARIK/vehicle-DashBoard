import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Bus icon from Icons8
const busIcon = new L.Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=KXKIFxpA3E9g&format=png&color=000000",
  iconSize: [40, 40],
});

// Initial bus locations (inside Chennai, Chengalpattu & Ranipet)
const initialBuses = [
  {
    id: 1,
    busNumber: "Bus : 39",
    lat: 13.0827,
    lng: 80.2707,
    city: "Chennai",
    speed: 45,
    temp: 85,
  },
  {
    id: 2,
    busNumber: "Bus : 123",
    lat: 12.6921,
    lng: 79.9781,
    city: "Chengalpattu",
    speed: 55,
    temp: 78,
  },
  {
    id: 3,
    busNumber: "Bus :67",
    lat: 12.9317,
    lng: 79.3333,
    city: "Ranipet",
    speed: 60,
    temp: 82,
  },
];

const BusMap = () => {
  const [buses, setBuses] = useState(initialBuses);
  const [selectedBus, setSelectedBus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBuses, setFilteredBuses] = useState(initialBuses);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.005,
          lng: bus.lng + (Math.random() - 0.5) * 0.005,
          speed: Math.floor(Math.random() * 30) + 40,
          temp: Math.floor(Math.random() * 10) + 75,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFilteredBuses(
      buses.filter(
        (bus) =>
          bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bus.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, buses]);

  return (
    <div>
      {/* Search Box */}
      <div className="mb-4 px-4">
        <input
          type="text"
          placeholder="Search by Bus Number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white w-full"
        />
      </div>

      {/* Map with Bus Locations */}
      <MapContainer
        center={[12.8236, 79.5306]}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredBuses.map((bus) => (
          <Marker
            key={bus.id}
            position={[bus.lat, bus.lng]}
            icon={busIcon}
            eventHandlers={{
              click: () => setSelectedBus(bus),
            }}
          >
            <Popup>{bus.busNumber}</Popup> {/* Shows only Bus Number */}
          </Marker>
        ))}
      </MapContainer>

      {/* Bus Details Boxes Below the Map */}
      {selectedBus && (
        <div className="flex justify-center gap-4 mt-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white text-center w-1/3">
            <h2 className="text-lg font-bold">Location</h2>
            <p>
              {selectedBus.lat.toFixed(4)}, {selectedBus.lng.toFixed(4)}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white text-center w-1/3">
            <h2 className="text-lg font-bold">Speed</h2>
            <p>{selectedBus.speed} km/h</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white text-center w-1/3">
            <h2 className="text-lg font-bold">Coolant Temp</h2>
            <p>{selectedBus.temp}°C</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusMap;
