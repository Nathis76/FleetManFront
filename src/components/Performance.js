import React, { useEffect, useState } from 'react';
import './Performance.css';

function Performance() {
    const [vessels, setVessels] = useState([]);
    const [selectedVesselId, setSelectedVesselId] = useState(null);
    const [selectedVesselName, setSelectedVesselName] = useState('All Vessels');
    const [noonReports, setNoonReports] = useState([]);

    // Fetch all noon reports and all vessels sorted by date
    useEffect(() => {
        fetch('https://localhost:7234/api/performance/noonreports')
            .then((response) => response.json())
            .then((data) => {
                const sortedNoonReports = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNoonReports(sortedNoonReports);
            })
            .catch((error) => console.error(error));

        fetch('https://localhost:7234/api/performance/vessels')
            .then((response) => response.json())
            .then((data) => setVessels(data))
            .catch((error) => console.error(error));
    }, []);

    // Fetch noon reports for the selected vessel
    useEffect(() => {
        if (selectedVesselId !== null) {
            fetch(`https://localhost:7234/api/performance/filterednoonreports?vesselId=${selectedVesselId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        // Handle the case when data is an array
                        setNoonReports(data);
                    } else {
                        // Handle the case when data is not an array (e.g., "All Vessels" response)
                        setNoonReports([]);
                    }
                })
                .catch((error) => console.error(error));
        } else {
            setSelectedVesselName('All Vessels');
            fetch('https://localhost:7234/api/performance/noonreports')
                .then((response) => response.json())
                .then((data) => {
                    const sortedNoonReports = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setNoonReports(sortedNoonReports);
                })
                .catch((error) => console.error(error));
        }
    }, [selectedVesselId]);

    return (
        <div className="performance-container">
            <h1>Noon Reports</h1>

            <div className="vessel-selection">
                <label className="select-label">Select Vessel:</label>
                <select
                    className="vessel-dropdown"
                    onChange={(e) => {
                        setSelectedVesselId(e.target.value == "" ? null : e.target.value);
                        setSelectedVesselName(e.target.options[e.target.selectedIndex].text);
                    }}
                    value={selectedVesselId || ''}
                >
                    <option value="">-- All Vessels --</option>
                    {vessels.map((vessel) => (
                        <option key={vessel.id} value={vessel.id}>
                            {vessel.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="reports-section">
                <h2 className="section-title">Noon Reports for {selectedVesselName}</h2>
                {noonReports.length > 0 ? (
                    <ul className="report-list">
                        {noonReports.map((report) => (
                            <li key={report.id} className="report-item">
                                <div className="report-details">
                                    <span className="report-info">Vessel: {report.vesselId}</span>
                                    <span className="report-info">Date: {report.reportDateTime}</span>
                                    <span className="report-info">Latitude: {report.latitude}</span>
                                    <span className="report-info">Longitude: {report.longitude}</span>
                                    <span className="report-info">Fuel Consumption: {report.fuelConsumption}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No noon reports available for the selected vessel.</p>
                )}
            </div>
        </div>
    );
}

export default Performance;
