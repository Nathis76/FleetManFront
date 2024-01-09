import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
  const mapRef = useRef(null);
  const [vessels, setVessels] = useState([]);
  const [noonReports, setNoonReports] = useState([]);
  const [map, setMap] = useState(null); 

  useEffect(() => {
    // Fetch vessel data
    fetch('https://localhost:7234/api/dashboard/vessels')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setVessels(data))
      .catch(error => console.error(error));

    // Fetch noon reports
    fetch('https://localhost:7234/api/dashboard/noonreports')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setNoonReports(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Initialize the map if the container is available
    if (mapRef.current && vessels.length > 0 && noonReports.length > 0 && !map) {
      const newMap = L.map(mapRef.current).setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(newMap);

      // Create markers and add them to the map
      const markers = combinedData.map(item => {
        const { latitude, longitude } = item.noonReport;
        const vesselName = item.vessel.name;
    

        // Create a marker
        const marker = L.marker([latitude, longitude]);

        // Add a tooltip with the vessel name
        marker.bindTooltip(vesselName);

        return marker.addTo(newMap);
      });

      // Fit the map bounds to all markers
      newMap.fitBounds(L.featureGroup(markers).getBounds());

      setMap(newMap); // Store the map instance in the state
    }
  }, [vessels, noonReports, map]);

  const combinedData = vessels.map(vessel => {
    const matchingReport = noonReports.find(report => report.vesselId === vessel.id);
    return { vessel, noonReport: matchingReport };
  });

  return <div ref={mapRef} style={{ width: '100%', height: '95vh' }}></div>;
}

export default Map;
