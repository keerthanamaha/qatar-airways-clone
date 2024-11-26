import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import "jspdf-autotable"; // Import the autoTable plugin
import Header from './Header';
import '../styles/FlightResults.css';
import '../styles/Ticket.css';
import logo from '../images/logo.svg';

function Ticket() {
    const location = useLocation();
    const { formData, ticketDetails } = location.state || {};
    const { from, to, departure, return: returnDate, passengers } = formData || {};
    const { outboundFlight, returnFlight, passengerDetails, totalPrice } = ticketDetails || {};

    const { flight: outboundFlightDetails, selectedClass: outboundClass } = outboundFlight || {};
    const { flight: returnFlightDetails, selectedClass: returnClass } = returnFlight || {};
    const handleDownloadTicket = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");

        // Add Title
        doc.setFontSize(20);
        doc.text("Qatar Airways Flight Ticket", 55, 20); // Title

        doc.setFontSize(12); // Reset font size
        doc.text("Flight Ticket Summary", 14, 40);

        // Flight Details Table Header
        const headers = ['Details', 'Outbound Flight', 'Return Flight'];
        const row1 = ['Flight Number', outboundFlightDetails?.flightNumber, returnFlightDetails?.flightNumber];
        const row2 = ['From', outboundFlightDetails?.from, returnFlightDetails?.from];
        const row3 = ['To', outboundFlightDetails?.to, returnFlightDetails?.to];
        const row4 = ['Class', outboundClass, returnClass];
        const row5 = ['Departure Time', outboundFlightDetails?.departureTime, returnFlightDetails?.departureTime];
        const row6 = ['Arrival Time', outboundFlightDetails?.arrivalTime, returnFlightDetails?.arrivalTime];
        const row7 = ['Price', `${outboundClass === 'Economy' ? outboundFlightDetails?.economyPrice : outboundFlightDetails?.businessPrice} SEK`,
                         `${returnClass === 'Economy' ? returnFlightDetails?.economyPrice : returnFlightDetails?.businessPrice} SEK`];
        const row8 = ['Total Price', `${totalPrice} SEK`, '']; // Add total price row

        // Drawing the Flight Details Table
        doc.autoTable({
            head: [headers],
            body: [
                row1, row2, row3, row4, row5, row6, row7, row8
            ],
            startY: 50, // Starting position of the table
            margin: { top: 10, left: 10, right: 10 },
            theme: 'grid', // Grid style for the table
            headStyles: { fillColor: [0, 0, 0] },
            bodyStyles: { fillColor: [245, 245, 245] },
        });

        let currentY = doc.lastAutoTable.finalY + 10;

        // Passenger Details Table
        doc.text("Passenger Details", 14, currentY);
        currentY += 10;

        // Set up columns for passenger details
        const passengerColumns = ['Name', 'Age', 'Phone', 'Food Preference'];
        const passengerData = passengerDetails.map((passenger) => [
            passenger.name,
            passenger.age,
            passenger.phone,
            passenger.foodPreference
        ]);

        // Create passenger details table using autoTable
        doc.autoTable({
            head: [passengerColumns],
            body: passengerData,
            startY: currentY,
            margin: { top: 10, left: 10, right: 10 },
            theme: 'grid',
            headStyles: { fillColor: [0, 0, 0] },
            bodyStyles: { fillColor: [245, 245, 245] },
        });

        currentY = doc.lastAutoTable.finalY + 10;

        // Page Break for long content
        if (doc.internal.pageSize.height < currentY + 30) {
            doc.addPage(); // Add a new page if the content exceeds the current page size
        }

        // Add Footer
        const footerText = "Qatar Airways - Enjoy Your Flight!";
        const pageNumberText = `Page ${doc.internal.getNumberOfPages()}`;

        // Positioning the footer text
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // Set text color for footer
        doc.text(footerText, 14, doc.internal.pageSize.height - 10); // Footer text
        doc.text(pageNumberText, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10); // Page number

        // Save the PDF
        doc.save('qatar-ticket.pdf');
    };


    return (
        <div className="ticket-container">
            <Header
                from={from}
                to={to}
                departure={departure}
                returnDate={returnDate}
                passengers={passengers}
            />
            <h2>Flight Ticket Summary</h2>

            <div className="ticket-summary">
                {/* Outbound Flight Card */}
                {outboundFlightDetails && (
                    <div className="ticket-card outbound-card">
                        <h3>Outbound Flight</h3>
                        <p><strong>Flight Number:</strong> {outboundFlightDetails.flightNumber}</p>
                        <p><strong>From:</strong> {outboundFlightDetails.from}</p>
                        <p><strong>To:</strong> {outboundFlightDetails.to}</p>
                        <p><strong>Class:</strong> {outboundClass}</p>
                        <p><strong>Price:</strong> {outboundClass === 'Economy' ? outboundFlightDetails.economyPrice : outboundFlightDetails.businessPrice}</p>
                    </div>
                )}

                {/* Return Flight Card */}
                {returnFlightDetails && (
                    <div className="ticket-card return-card">
                        <h3>Return Flight</h3>
                        <p><strong>Flight Number:</strong> {returnFlightDetails.flightNumber}</p>
                        <p><strong>From:</strong> {returnFlightDetails.from}</p>
                        <p><strong>To:</strong> {returnFlightDetails.to}</p>
                        <p><strong>Class:</strong> {returnClass}</p>
                        <p><strong>Price:</strong> {returnClass === 'Economy' ? returnFlightDetails.economyPrice : returnFlightDetails.businessPrice}</p>
                    </div>
                )}

                {/* Passenger Details */}
                {passengerDetails && (
                    <div className="passenger-cards">
                        <h3>Passenger Details</h3>
                        {passengerDetails.map((passenger) => (
                            <div className="passenger-card" key={passenger.id}>
                                <p><strong>Name:</strong> {passenger.name}</p>
                                <p><strong>Age:</strong> {passenger.age}</p>
                                <p><strong>Phone:</strong> {passenger.phone}</p>
                                <p><strong>Food Preference:</strong> {passenger.foodPreference}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Total Price */}
                {totalPrice && (
                    <div className="total-price">
                        <h3>Total Price</h3>
                        <p><strong>{`₹ ${totalPrice}`}</strong></p>
                    </div>
                )}
            </div>

            {/* Download Button */}
            <button className="download-button" onClick={handleDownloadTicket}>
                Download Ticket as PDF
            </button>
        </div>
    );
}

export default Ticket;
