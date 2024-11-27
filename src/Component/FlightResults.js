import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';
import '../styles/FlightResults.css';
import { mockFlightData } from '../mock/mockFlightData';
import { mockFlightDataReturn } from '../mock/mockFlightDataReturn';  // Import the return flight mock data
import Header from './Header';

function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;
    const { from, to, departure, return: returnDate, passengers } = formData || {};
    const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const formattedDeparture = departure ? formatDate(departure) : '';
    const formattedReturn = returnDate ? formatDate(returnDate) : '';

    const selectedDate = selectedOutboundFlight ? returnDate : departure;
    const selectedDateObject = new Date(selectedDate);
    selectedDateObject.setHours(0, 0, 0, 0);

    const extractCityName = (cityString) => cityString.split(',')[0].trim().toLowerCase();

    // Use both outbound and return flights data
    const availableFlights = useMemo(() => {
        const data = selectedOutboundFlight ? mockFlightDataReturn.Flights : mockFlightData.Flights;  // Choose the right data set based on outbound selection

        const fromCity = selectedOutboundFlight ? to : from;
        const toCity = selectedOutboundFlight ? from : to;

        return data.filter(flight => {
            const flightDate = new Date(flight.departureTime);
            const dateMatch = flightDate.toLocaleDateString('en-CA') === selectedDateObject.toLocaleDateString('en-CA');
            const fromCityMatch = flight.from.trim().toLowerCase() === extractCityName(fromCity.city);
            const toCityMatch = flight.to.trim().toLowerCase() === extractCityName(toCity.city);

            return fromCityMatch && toCityMatch && dateMatch;
        });
    }, [from, to, selectedOutboundFlight, selectedDateObject]);

    const formatPrice = (price) => price.toLocaleString();

    const handleFlightClassSelection = (flight, selectedClass) => {

        if (!selectedOutboundFlight && returnDate) {
            setSelectedOutboundFlight({ flight, selectedClass });
        } else {
            navigate('/return-flight', {
                state: {
                    outboundFlight: selectedOutboundFlight,
                    returnFlight: { flight, selectedClass },
                    formData
                },
            });
        }
    };

    return (
        <div className="container">
              <Header
                from={from}
                to={to}
                departure={departure}
                returnDate={returnDate}
                passengers={passengers}
            />
            <div className="content">
                <div className="content-div">
                    <h3>{formattedDeparture ? formattedDeparture : 'Loading Departure Date...'}</h3>
                </div>
                <div className="content-div">
                    {from && to ? (
                        <h6>
                            Select your {selectedOutboundFlight ? 'return' : 'departure'} flight from
                            <span className="from-city"> {extractCityName(selectedOutboundFlight ? to.city : from.city)} </span>
                            to <span className="to-city"> {extractCityName(selectedOutboundFlight ? from.city : to.city)}</span>
                        </h6>
                    ) : (
                        <h6>Loading flight details...</h6>
                    )}
                </div>
                <div className="flight-cards">
                    {availableFlights.length > 0 ? (
                        availableFlights.map(flight => (
                            <div className="flight-card" key={flight.flightNumber}>
                                <div className="flight-details">
                                    <div className="Departure-time">
                                        <div className="time">{formatTime(flight.departureTime)}</div>
                                        <div className="airport-code">{selectedOutboundFlight ? to.code : from.code}</div>
                                    </div>
                                    <div className="flight-route">
                                        <p className="stops">
                                            <i className="fa fa-arrow-right"></i> <i className="fa fa-plane"></i> Stops: {flight.stops} <i className="fa fa-arrow-right"></i>
                                        </p>
                                    </div>
                                    <div className="Arrival-time">
                                        <div className="time">{formatTime(flight.arrivalTime)}</div>
                                        <div className="airport-code">{selectedOutboundFlight ? from.code : to.code}</div>
                                    </div>
                                </div>
                                <div>
                                    <img className="logo" src={logo} alt="logo" />
                                </div>
                                <div className="flight-prices">
                                    <button
                                        className="price-button"
                                        onClick={() => handleFlightClassSelection(flight, 'Economy')}
                                    >
                                        <span className="class-label">Economy</span>
                                        <span className="price">${formatPrice(flight.economyPrice)}</span>
                                    </button>
                                    <button
                                        className="price-button"
                                        onClick={() => handleFlightClassSelection(flight, 'Business')}
                                    >
                                        <span className="class-label">Business</span>
                                        <span className="price">${formatPrice(flight.businessPrice)}</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No flights available for the selected route.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Results;
