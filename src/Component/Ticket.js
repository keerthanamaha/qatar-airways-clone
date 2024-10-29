import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../styles/Ticket.css';

function Ticket() {
    const location = useLocation();
    const navigate = useNavigate();

    // Safely destructuring the location state
    const {
        selectedFlightDetails = {},
        name: passengerName = 'N/A',
        email: passengerEmail = 'N/A',
        phone: passengerPhone = 'N/A',
        dob: passengerDOB = 'N/A',
        gender: passengerGender = 'N/A',
        passportNumber = 'N/A',
        nationality = 'N/A',
        specialRequests = 'None',
    } = location.state || {};

    const handleDownload = () => {
        const doc = new jsPDF();
        doc.text("Flight Ticket Summary", 20, 20);
        doc.text("Flight Details:", 20, 30);

        // Ensure selectedFlightDetails has the right fields
        if (selectedFlightDetails) {
            doc.text(`Flight Number: ${selectedFlightDetails.flightNumber}`, 20, 40);
            doc.text(`From: ${selectedFlightDetails.from}`, 20, 50);
            doc.text(`To: ${selectedFlightDetails.to}`, 20, 60);
            doc.text(`Departure: ${selectedFlightDetails.departureTime}`, 20, 70);
            doc.text(`Arrival: ${selectedFlightDetails.arrivalTime}`, 20, 80);
        }

        doc.text("Passenger Details:", 20, 100);
        doc.text(`Name: ${passengerName}`, 20, 110);
        doc.text(`Email: ${passengerEmail}`, 20, 120);
        doc.text(`Phone Number: ${passengerPhone}`, 20, 130);
        doc.text(`Date of Birth: ${passengerDOB}`, 20, 140);
        doc.text(`Gender: ${passengerGender}`, 20, 150);
        doc.text(`Passport Number: ${passportNumber}`, 20, 160);
        doc.text(`Nationality: ${nationality}`, 20, 170);
        doc.text(`Special Requests: ${specialRequests}`, 20, 180);

        doc.save('ticket.pdf');
    };

    return (
        <div className="ticket-container">
            <h2>Flight Ticket Summary</h2>
            <div className="flight-details">
                <h3>Flight Details</h3>
                <div>From: {selectedFlightDetails.from}</div>
                <div>To: {selectedFlightDetails.to}</div>
                <div>Departure: {selectedFlightDetails.departureTime}</div>
                <div>Arrival: {selectedFlightDetails.arrivalTime}</div>
            </div>
            <div className="passenger-details">
                <h3>Passenger Details</h3>
                <div>Name: {passengerName}</div>
                <div>Email: {passengerEmail}</div>
                <div>Phone Number: {passengerPhone}</div>
                <div>Date of Birth: {passengerDOB}</div>
                <div>Gender: {passengerGender}</div>
                <div>Passport Number: {passportNumber}</div>
                <div>Nationality: {nationality}</div>
                <div>Special Requests: {specialRequests}</div>
            </div>
            <button onClick={handleDownload}>Download Ticket</button>
            <button onClick={() => navigate('/results')}>Go Back</button>
        </div>
    );
}

export default Ticket;
