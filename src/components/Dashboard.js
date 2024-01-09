import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
    const [vessels, setVessels] = useState([]);
    const [noonReports, setNoonReports] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7234/api/dashboard/vessels')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setVessels(data))
            .catch(error => console.error(error));

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

    const combinedData = vessels.map(vessel => {
        const matchingReport = noonReports.find(report => report.vesselId === vessel.id);
        return { vessel, noonReport: matchingReport };
    });

    return (
        <div className="dashboard-container">
            <h2>Latest Vessel Data</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Vessel Name</th>
                        <th>Consumption</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {combinedData.map(item => (
                        <tr key={item.vessel.id}>
                            <td>{item.vessel.name}</td>
                            <td>{item.noonReport ? item.noonReport.fuelConsumption : 'N/A'}</td>
                            <td>{item.noonReport ? item.noonReport.longitude : 'N/A'}</td>
                            <td>{item.noonReport ? item.noonReport.latitude : 'N/A'}</td>
                            <td>{item.noonReport ? item.noonReport.reportDateTime : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
