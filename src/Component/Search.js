import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PassengerDropdown from './PassengerDropdown';
import '../styles/Search.css';
import { mockAirports } from '../mock/mockAirports'; // Import mock airports data

function Search() {
    const navigate = useNavigate();
    // Get today's date
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departure: '',
        return: '',
        class: 'economy',
        options: 'return',
    });
    const [showPassengerOverlay, setShowPassengerOverlay] = useState(false);
    const [passengers, setPassengers] = useState({
        adults: 1,
        children: 0,
        infants: 0,
    });

    const [filteredFromAirports, setFilteredFromAirports] = useState([]);
    const [filteredToAirports, setFilteredToAirports] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const focusedFieldRef = useRef(null);  // Create a reference to track which input is focused
    const dropdownRef = useRef(null); // Ref for the airport suggestions dropdown

    useEffect(() => {
        // Initially set the list of all airports when the component mounts
        setFilteredFromAirports(mockAirports.Airports);
        setFilteredToAirports(mockAirports.Airports);

        // Close the dropdown if the user clicks outside of it
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsInputFocused(false); // Close dropdown if clicking outside
            }
        };

        // Bind event listener to the document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const togglePassengerOverlay = () => {
        setShowPassengerOverlay(!showPassengerOverlay);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));


        if (name === 'from') {
            // Filter airports based on the user's input for 'from' field
            const filteredList = mockAirports.Airports.filter((airport) =>
                airport.City.toLowerCase().includes(value.toLowerCase()) ||
                airport.Name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredFromAirports(filteredList);
        } else if (name === 'to') {
            // Filter airports based on the user's input for 'to' field
            const filteredList = mockAirports.Airports.filter((airport) =>
                airport.City.toLowerCase().includes(value.toLowerCase()) ||
                airport.Name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredToAirports(filteredList);
        }

        // Reset error message if user starts typing again
        if (errorMessage) {
            setErrorMessage('');
        }
    };
    // Handle the selection of an airport from the suggestions
    const handleAirportSelect = (airport) => {
        if (focusedFieldRef.current) {
            const field = focusedFieldRef.current;  // Get the field that's currently focused
            const otherField = field === 'from' ? 'to' : 'from';  // The opposite field

            // Check if the selected airport is the same as the other field's value
            if (formData[otherField]?.code === airport.Code) {
                setErrorMessage('From and To cannot be the same.');
                setFormData((prevData) => ({
                    ...prevData,
                    [field]: '', // Reset the 'from' field value if it matches 'to'
                }));
                setIsInputFocused(false);
                return; // Prevent updating if both fields are the same
            }

            // Update the formData with structured data: city, code, name, country
            setFormData((prevData) => ({
                ...prevData,
                [field]: {
                    city: airport.City,
                    code: airport.Code,
                    name: airport.Name,
                    country: airport.Country,
                },
            }));
        }
        setIsInputFocused(false); // Hide the dropdown after selection
    };


    const handleSubmit = (e) => {
        e.preventDefault();
            // Include passengers in the form data to be passed to the next page
    const dataToPass = {
        ...formData,
        passengers: passengers.adults + passengers.children + passengers.infants, // Pass the total number of passengers
    };
        navigate('/results', { state: dataToPass });
    };

    return (
        <div className="SearchContainer">
            <div className="Header-tab">
                <div className="Book-flight">Book a flight</div>
                <div className="Stopover">Stopover / Packages</div>
                <div className="Manage">Manage / Check in</div>
                <div className="Flight-status">Flight status</div>
            </div>
            <div className="Tab-content">
                <form onSubmit={handleSubmit}>
                    <div className="Radio">
                        <label>
                            <input
                                type="radio"
                                name="options"
                                value="return"
                                checked={formData.options === 'return'}
                                onChange={handleInputChange}
                                required
                            />
                            Return
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="options"
                                value="one-way"
                                checked={formData.options === 'one-way'}
                                onChange={handleInputChange}
                            />
                            One Way
                        </label>
                    </div>
                    <div className="Journey-details">
                        <div className="From-block">
                            <label htmlFor="from">From:</label>
                            <input
                                type="text"
                                id="from"
                                name="from"
                                placeholder="City or Airport"
                                value={formData.from ? `${formData.from.city} (${formData.from.name}), ${formData.from.country}` : ''} // Display the concatenated information
                                onChange={handleInputChange}
                                onFocus={() => {
                                    setIsInputFocused(true);
                                    focusedFieldRef.current = 'from';  // Set focused field to 'from'
                                }}
                                required
                            />
                            {isInputFocused && focusedFieldRef.current === 'from' && (
                                <div className="Airport-suggestions" ref={dropdownRef}>
                                    {filteredFromAirports.map((airport) => (
                                        <div
                                            key={airport.Code}
                                            className="Airport-option"
                                            onClick={() => handleAirportSelect(airport)} // Call handleAirportSelect for 'from'
                                        >
                                            {airport.City} ({airport.Name})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="To-block">
                            <label htmlFor="to">To:</label>
                            <input
                                type="text"
                                id="to"
                                name="to"
                                placeholder="City or Airport"
                                value={formData.to ? `${formData.to.city} (${formData.to.name}), ${formData.to.country}` : ''} // Display the concatenated information
                                onChange={handleInputChange}
                                onFocus={() => {
                                    setIsInputFocused(true);
                                    focusedFieldRef.current = 'to';  // Set focused field to 'to'
                                }}
                                required
                            />
                            {isInputFocused && focusedFieldRef.current === 'to' && (
                                <div className="Airport-suggestions" ref={dropdownRef}>
                                    {filteredToAirports.map((airport) => (
                                        <div
                                            key={airport.Code}
                                            className="Airport-option"
                                            onClick={() => handleAirportSelect(airport)} // Call handleAirportSelect for 'to'
                                        >
                                            {airport.City} ({airport.Name})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {errorMessage && <div className="Error-message">{errorMessage}</div>}

                        <div className="Departure-block">
                            <label htmlFor="departure">Departure:</label>
                            <input
                                type="date"
                                id="departure"
                                name="departure"
                                value={formData.departure}
                                onChange={handleInputChange}
                                min={today} // Disable past dates
                                required
                            />
                        </div>

                        {formData.options === 'return' && (
                            <div className="Return-block">
                                <label htmlFor="return">Return:</label>
                                <input
                                    type="date"
                                    id="return"
                                    name="return"
                                    value={formData.return}
                                    onChange={handleInputChange}
                                    min={today} // Disable past dates
                                    required
                                />
                            </div>
                        )}

                        <div className="Passenger-class-block" style={{ position: 'relative' }}>
                            <label>Passengers / Class:</label>
                            <button type="button" className="Passenger-button" onClick={togglePassengerOverlay}>
                                {passengers.adults + passengers.children + passengers.infants} Passengers, {formData.class} Class
                            </button>
                            {showPassengerOverlay && (
                                <PassengerDropdown
                                    passengers={passengers}
                                    setPassengers={setPassengers}
                                    selectedClass={formData.class}
                                    setSelectedClass={(value) => setFormData((prev) => ({ ...prev, class: value }))}
                                    toggleOverlay={togglePassengerOverlay}
                                />
                            )}
                        </div>
                    </div>
                    <div className="Search-button-div">
                        <button className="Search-button" type="submit">Search Flight</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;
