import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/FlightResults.css';

function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [selectedFlights, setSelectedFlights] = useState([]);

    // Memoizing searchCriteria with default values
    const searchCriteria = useMemo(() => ({
        from: location.state?.from || 'New York',
        to: location.state?.to || 'Los Angeles',
        departure: location.state?.departure || '2024-11-10',
        return: location.state?.return || '2024-11-17',
        options: location.state?.options || 'round-trip',
        class: location.state?.class || 'Economy'
    }), [location.state]);

    useEffect(() => {
        // Fetch flight data
        fetch('/flights.json')
            .then((response) => response.json())
            .then((data) => setFlights(data))
            .catch((error) => console.error('Error fetching flight data:', error));
    }, []);

    useEffect(() => {
        // Filter flights based on search criteria
        const results = flights.filter(flight => {
            const fromMatch = searchCriteria.from ? flight.from.toLowerCase() === searchCriteria.from.toLowerCase() : true;
            const toMatch = searchCriteria.to ? flight.to.toLowerCase() === searchCriteria.to.toLowerCase() : true;
            const departureMatch = searchCriteria.departure ? flight.departure === searchCriteria.departure : true;
            const returnMatch = searchCriteria.options === 'one-way' ? !searchCriteria.return : flight.return === searchCriteria.return;
            const classMatch = searchCriteria.class ? flight.class.toLowerCase() === searchCriteria.class.toLowerCase() : true;

            return fromMatch && toMatch && departureMatch && returnMatch && classMatch;
        });

        setFilteredFlights(results);
    }, [flights, searchCriteria]);

    const handleFlightSelect = (flightId) => {
        setSelectedFlights((prevSelected) =>
            prevSelected.includes(flightId)
                ? prevSelected.filter(id => id !== flightId)
                : [...prevSelected, flightId]
        );
    };

    const handleNext = () => {
        if (selectedFlights.length === 0) {
            alert("Please select at least one flight to proceed.");
            return;
        }
        const selectedFlightDetails = filteredFlights.filter(flight => selectedFlights.includes(flight.id));
        navigate('/passenger-details', { state: { selectedFlightDetails } });
    };

    const getColorForClass = (classType) => {
        switch (classType.toLowerCase()) {
            case 'economy':
                return '#6c757d'; // Gray
            case 'business':
                return '#007bff'; // Blue
            case 'first class':
                return '#28a745'; // Green
            default:
                return '#6c757d'; // Default gray
        }
    };

    return (
        <div className="results-container">
            <h1>Available Flights</h1>
            <div className="flights-list">
                {filteredFlights.length > 0 ? (
                    filteredFlights.map(flight => (
                        <div key={flight.id} className={`flight-card ${selectedFlights.includes(flight.id) ? 'selected' : ''}`} style={{ borderColor: getColorForClass(flight.class) }}>
                            <div className="flight-info">
                                <div className="flight-airline"><strong>{flight.airline}</strong></div>
                                <div className="flight-route">
                                    <p><i className="fas fa-plane-departure"></i> {flight.from} ➔ {flight.to}</p>
                                </div>
                                <div className="flight-timing">
                                    <p><i className="fas fa-clock"></i> {flight.departure} at {flight.departureTime} | Return: {flight.return} at {flight.returnTime}</p>
                                </div>
                                <div className="flight-stops">
                                    <p><i className="fas fa-exchange-alt"></i> {flight.stops} Stop{flight.stops !== 1 ? 's' : ''}</p>
                                </div>
                                <div className="flight-price">
                                    <p><strong>Price: ${flight.price.toFixed(2)}</strong></p>
                                </div>
                            </div>
                            <button className={`select-button ${selectedFlights.includes(flight.id) ? 'selected' : ''}`} onClick={() => handleFlightSelect(flight.id)}>
                                Select
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No flights available for the selected criteria.</p>
                )}
            </div>
            <button onClick={handleNext} className="next-button">Next</button>
        </div>
    );
}

export default Results;
