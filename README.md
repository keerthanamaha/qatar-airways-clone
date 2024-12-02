# Qatar Clone Flight Booking Application

This is a flight booking application that mimics the booking flow of Qatar Airways. The application allows users to search for flights, select outbound and return flights (for round-trip bookings), enter passenger details, view the booking summary, proceed to payment, and download the ticket. All data is mocked for development and demonstration purposes.

## Features

### **1. User-friendly Home Page:**
- Option to select between **one-way** or **round-trip** flights.
- **Mock flight search functionality** to display available flights based on selected dates and destinations.
- Interactive flight selection for both **outbound** and **return flights** (if round-trip is selected).
- Smart selection interface to display mocked flight availability based on user input for departure and destination airports.

### **2. Passenger Details Form:**
- **Easy-to-fill passenger details** form (name, contact details, age, and food preferences).
- **Dynamic form validation** to ensure data accuracy (e.g., validating phone numbers, email addresses, and age restrictions).
- **Real-time input checks** for user convenience.

### **3. Comprehensive Flight Summary:**
- Detailed summary of the selected flights, including:
  - **Flight numbers** for both outbound and return flights.
  - **Departure and arrival times** in both local time and time zone.
  - **Flight class** (Economy or Business) and corresponding prices.
  - **Flight duration** and any **layovers** or **direct flights**.
- **Dynamic price calculation** that adjusts based on flight selection and passenger details.
  
### **4. Payment Gateway:**
- **Mock payment flow** to demonstrate the booking process.
- Display of **total price** including taxes, fees, and any discounts or offers.
  
### **5. Ticket Download Feature:**
- After mock payment confirmation, **generate a downloadable flight ticket** with detailed booking information such as:
  - **Ticket number** and **booking reference**.
  - **Passenger information** and selected flight details.
  - **QR code** for easy check-in or ticket validation (if applicable).
  
### **6. Responsive and Mobile-Friendly Design:**
- Fully responsive design ensuring that the app works seamlessly across devices (desktops, tablets, and smartphones).
- Optimized UI/UX for quick navigation and smooth interaction on all screen sizes.
  
### **7. Smooth and Seamless Navigation:**
- **React Router** for easy navigation between different steps of the flight booking process:
  - Home page (flight search).
  - Flight selection.
  - Passenger details.
  - Payment and ticket download.
- **State persistence** across pages to ensure user inputs are saved (e.g., flight selections, passenger details).
  
### **8. Performance Optimization:**
- Optimized for **fast load times** and **smooth performance** using tools like **React.memo**, lazy loading for images and components, and efficient state management with **React Context**.
- **Optimized images** for flight listings and destinations to ensure the app loads quickly.

### **9. Mock Data Integration:**
- All flight data is **mocked** for the purpose of this demo, including:
  - **Flight availability** (mock flight details such as destinations, dates, prices).
  - **Flight details** (flight numbers, timings, prices, etc.).
  - **Passenger information** (user details, contact information).
  - **Payment details** (mock payment flow to demonstrate functionality).
  
## Project Setup

### Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (v14 or later)
- **npm** or **yarn** for package management

### Steps to Run the Project

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/keerthanamaha/qatar-airways-clone
2. Navigate into the project directory:
   ```bash
   cd qatar-clone
3. Install dependencies:
   ```bash
   npm install
4. if you're using Yarn:
   ```bash
   yarn install
6. Run the development server:
   ```bash
      npm start
7. if you are using  Yarn:
   ```bash
      yarn start
Open the app in your browser at http://localhost:3000.
