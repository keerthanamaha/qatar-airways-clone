import React, { useState, useEffect,  useCallback} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ReturnFlight.css';
import '../styles/FlightResults.css';
import Header from './Header';

export default function ReturnFlight() {
    const location = useLocation();
    const navigate = useNavigate();  // Initialize useNavigate hook
    const { formData } = location.state || {}; // Extract formData first
    const { from, to, departure, return: returnDate, passengers: initialPassengers } = formData || {};

    // Extract the outbound and return flight data from the location state
    const { outboundFlight, returnFlight } = location.state || {};

    // Use effect to set default passenger details if not provided
    const [passengers, setPassengers] = useState(initialPassengers || 1);  // Default to 1 if no initialPassengers

    // Adjust passengers array based on the count selected
    useEffect(() => {
        if (!initialPassengers || initialPassengers <= 0) {
            setPassengers(1);  // Default to 1 passenger
        } else {
            setPassengers(initialPassengers);  // Use initial value if valid
        }
    }, [initialPassengers]);

    // Generate passenger details based on the number of passengers
    const generatePassengerForms = useCallback(() => {
        return Array.from({ length: passengers }, (_, index) => ({
            id: index + 1,
            name: '',
            age: '',
            phone: '',
            foodPreference: '',
        }));
    }, [passengers]); // Dependency on 'passengers'

    // Get passenger details form
    const [passengerDetails, setPassengerDetails] = useState(generatePassengerForms());

    // Add 'generatePassengerForms' as a dependency for the useEffect
    useEffect(() => {
        setPassengerDetails(generatePassengerForms());
    }, [generatePassengerForms]);  // <-- Added generatePassengerForms here

    // Handle passenger details change
    const handlePassengerChange = (index, field, value) => {
        const updatedPassengers = [...passengerDetails]; // Use passengerDetails for state update
        updatedPassengers[index][field] = value;
        setPassengerDetails(updatedPassengers);
    };

    // Function to check if all passenger details are complete
    const isFormValid = () => {
        return passengerDetails.every(passenger =>
            passenger.name && passenger.age && passenger.phone && passenger.foodPreference
        );
    };

    // Validate age input to ensure it's a number and positive
    const validateAge = (age) => {
        return /^\d+$/.test(age) && parseInt(age) > 0;
    };

    // Validate phone input to ensure it's a valid phone number
    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);  // Validates a 10-digit phone number
    };

    // Format the time for display
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const formatPrice = (price) => price.toLocaleString();

    // Calculate grand total (for simplicity, assuming same selectedClass for both flights)
    const totalPrice =
        outboundFlight && returnFlight
            ? formatPrice(
                  (outboundFlight.selectedClass === 'Economy' ? outboundFlight.flight.economyPrice : outboundFlight.flight.businessPrice) +
                  (returnFlight.selectedClass === 'Economy' ? returnFlight.flight.economyPrice : returnFlight.flight.businessPrice)
              )
            : '0.00';

    // Handle the submission and pass data to the next page
    const handleProceedToPayment = () => {
        const ticketDetails = {
            outboundFlight,
            returnFlight,
            passengerDetails,
            totalPrice,
        };

        navigate('/payment', { state: { formData, ticketDetails } });
    };

    return (
        <div className="return-flight-container">
            <Header
                from={from}
                to={to}
                departure={departure}
                returnDate={returnDate}
                passengers={passengers}
            />
            <div className="return-flight-content">
                {/* Left Content - Passenger Details */}
                <div className="left-content">
                    <p>Passenger Details</p>
                    {passengerDetails.length > 0 ? (
                        passengerDetails.map((passenger, index) => (
                            <div key={passenger.id} className="passenger-card">
                                <h5>Passenger {index + 1}</h5>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        value={passenger.name || ''}
                                        onChange={(e) =>
                                            handlePassengerChange(index, 'name', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Age:</label>
                                    <input
                                        type="text"
                                        value={passenger.age || ''}
                                        onChange={(e) =>
                                            handlePassengerChange(index, 'age', e.target.value)
                                        }
                                        className={!validateAge(passenger.age) ? 'invalid' : ''}
                                    />
                                    {!validateAge(passenger.age) && passenger.age && (
                                        <span className="error">Please enter a valid age</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Phone Number:</label>
                                    <input
                                        type="text"
                                        value={passenger.phone || ''}
                                        onChange={(e) =>
                                            handlePassengerChange(index, 'phone', e.target.value)
                                        }
                                        className={!validatePhone(passenger.phone) ? 'invalid' : ''}
                                    />
                                    {!validatePhone(passenger.phone) && passenger.phone && (
                                        <span className="error">Please enter a valid phone number</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Food Preference:</label>
                                    <select
                                        value={passenger.foodPreference || ''}
                                        onChange={(e) =>
                                            handlePassengerChange(index, 'foodPreference', e.target.value)
                                        }
                                    >
                                        <option value="">Select Food Preference</option>
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                                        <option value="Vegan">Vegan</option>
                                    </select>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No passenger details available</p>
                    )}
                </div>

                {/* Right Content - Flight Summary */}
                <div className="right-content">
                    {outboundFlight && returnFlight ? (
                        <div className="flight-summary-card">
                            {/* Trip Details Section */}
                            <div className="summary-section trip-details">
                                <h3>Trip Details</h3>
                                <div className="section-content">
                                    <div>
                                        <h4>From {from.city} to {to.city}</h4>
                                        <p>{departure}</p>
                                    </div>
                                    <div>
                                        <h4>Return From {to.city} to {from.city}</h4>
                                        <p>{returnDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Flight Info Section */}
                            <div className="summary-section flight-info">
                                <h3>Flight Information</h3>
                                <div className="section-content">
                                    <div>
                                        <h4>Outbound Flight</h4>
                                        <p>Flight: {outboundFlight.flight.flightNumber}</p>
                                        <p>Departure: {formatTime(outboundFlight.flight.departureTime)} | Arrival: {formatTime(outboundFlight.flight.arrivalTime)}</p>
                                        <p>Class: {outboundFlight.selectedClass}</p>
                                        <p>Price: ${formatPrice(outboundFlight.selectedClass === 'Economy' ? outboundFlight.flight.economyPrice : outboundFlight.flight.businessPrice)}</p>
                                    </div>
                                    <div>
                                        <h4>Return Flight</h4>
                                        <p>Flight: {returnFlight.flight.flightNumber}</p>
                                        <p>Departure: {formatTime(returnFlight.flight.departureTime)} | Arrival: {formatTime(returnFlight.flight.arrivalTime)}</p>
                                        <p>Class: {returnFlight.selectedClass}</p>
                                        <p>Price: ${formatPrice(returnFlight.selectedClass === 'Economy' ? returnFlight.flight.economyPrice : returnFlight.flight.businessPrice)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Grand Total Section */}
                            <div className="summary-section total">
                                <h3>Grand Total</h3>
                                <p>SEK {totalPrice}</p>
                            </div>

                            {/* Payment Section */}
                            <div className="summary-section payment">
                                <h3>Payment Information</h3>
                                <div className="section-content">
                                    <p>Please proceed with payment to confirm your booking.</p>
                                    <button
                                        className="payment-button"
                                        onClick={handleProceedToPayment}
                                        disabled={!isFormValid()} // Disable the button if form is not valid
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>No flight data available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
