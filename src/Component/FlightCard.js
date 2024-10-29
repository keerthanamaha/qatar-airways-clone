// FlightCard.js
import React from 'react';
import '../styles/FlightResults.css';

const FlightCard = ({ flight, onSelect, isSelected }) => (
    <div className="flight-card">
        <div className="flight-info">
            <div className="flight-airline"><strong>{flight.airline}</strong></div>
            <div className="flight-route">
                <p>{flight.from} ➔ {flight.to}</p>
            </div>
            <div className="flight-timing">
                <p>{flight.departure} at {flight.departureTime} | Return: {flight.return} at {flight.returnTime}</p>
            </div>
            <div className="flight-stops">
                <p>{flight.stops} Stop{flight.stops !== 1 ? 's' : ''}</p>
            </div>
            <div className="flight-price">
                <p><strong>Price: ${flight.price.toFixed(2)}</strong></p>
            </div>
        </div>
        <button
            className="select-button"
            onClick={onSelect}
            style={{ backgroundColor: isSelected ? 'lightgreen' : '#0070f3' }} // Change button color when selected
        >
            {isSelected ? 'Selected' : 'Select'}
        </button>
    </div>
);

export default FlightCard;
