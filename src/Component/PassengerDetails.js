import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightCard from './FlightCard'; // Ensure the correct import path
import '../styles/FlightResults.css'; // Ensure this is included
import '../styles/PassengerDetails.css';

function PassengerDetails() {
    const location = useLocation();
    const navigate = useNavigate(); // Use navigate to redirect
    const { selectedFlightDetails } = location.state || { selectedFlightDetails: [] }; // Safely access flight details

    // State to store passenger information
    const [passengerInfo, setPassengerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        passportNumber: '',
        nationality: '',
        frequentFlyer: '',
        specialRequests: '',
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassengerInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const flightDetails = selectedFlightDetails[0]; // Assuming you want the first flight
        navigate('/ticket', { state: { selectedFlightDetails: flightDetails, ...passengerInfo } });
    };

    return (
        <div className="passenger-details-container">
            <h1>Selected Flights</h1>
            <div className="flights-list">
                {selectedFlightDetails.length > 0 ? (
                    selectedFlightDetails.map((flight, index) => (
                        <FlightCard
                            key={index} // Consider using flight.id if available
                            flight={flight}
                            isSelected={true} // All displayed flights are selected
                        />
                    ))
                ) : (
                    <p>No flights selected.</p>
                )}
            </div>
            {/* Passenger Information Card */}
            <div className="passenger-info-card">
                <h2>Passenger Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="First Last"
                            value={passengerInfo.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="example@example.com"
                            value={passengerInfo.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="+1 234 567 8901"
                            value={passengerInfo.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="dob"
                            required
                            value={passengerInfo.dob}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender:</label>
                        <select
                            name="gender"
                            required
                            value={passengerInfo.gender}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Passport Number:</label>
                        <input
                            type="text"
                            name="passportNumber"
                            required
                            placeholder="ABC123456"
                            value={passengerInfo.passportNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nationality:</label>
                        <input
                            type="text"
                            name="nationality"
                            required
                            placeholder="Country"
                            value={passengerInfo.nationality}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Frequent Flyer Number:</label>
                        <input
                            type="text"
                            name="frequentFlyer"
                            placeholder="Optional"
                            value={passengerInfo.frequentFlyer}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Special Requests:</label>
                        <textarea
                            name="specialRequests"
                            placeholder="Any special requests or assistance needed"
                            value={passengerInfo.specialRequests}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button type="submit" className="confirm-button">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
}

export default PassengerDetails;
