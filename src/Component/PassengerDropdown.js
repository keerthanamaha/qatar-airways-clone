// PassengerDropdown.js
import React from 'react';
import '../styles/PassengerDropdown.css';

function PassengerDropdown({ passengers, setPassengers, selectedClass, setSelectedClass, toggleOverlay }) {
    const handlePassengerChange = (type, value) => {
        setPassengers((prevData) => ({
            ...prevData,
            [type]: parseInt(value, 10),
        }));
    };

    return (
        <div className="Passenger-overlay">
            <div className="Passenger-options">
                <h4>Passenger</h4>
                <div className="Passenger-input">
                    <label>Adults (12+ years):</label>
                    <input
                        type="number"
                        min="1"
                        value={passengers.adults}
                        onChange={(e) => handlePassengerChange('adults', e.target.value)}
                    />
                </div>
                <div className="Passenger-input">
                    <label>Children (2-12 years):</label>
                    <input
                        type="number"
                        min="0"
                        value={passengers.children}
                        onChange={(e) => handlePassengerChange('children', e.target.value)}
                    />
                </div>
                <div className="Passenger-input">
                    <label>Infants (0-2 years):</label>
                    <input
                        type="number"
                        min="0"
                        value={passengers.infants}
                        onChange={(e) => handlePassengerChange('infants', e.target.value)}
                    />
                </div>

                <h4>Class</h4>
                <div className="Passenger-line" />
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                </select>
                <button type="button" onClick={toggleOverlay}>Done</button>
            </div>
        </div>
    );
}

export default PassengerDropdown;
