// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ow from '../images/ow.svg';
import logo from '../images/logo.svg';
import '../styles/FlightResults.css';

const Header = ({ from, to, departure, returnDate, passengers }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    const formattedDeparture = departure ? formatDate(departure) : '';
    const formattedReturn = returnDate ? formatDate(returnDate) : '';

    return (
        <div className="header">
            <div className="header-left">
                <button className="back-button" onClick={() => navigate(-1)}>←</button>
                <img className="logo" src={logo} alt="logo" />
                <img className="ow" src={ow} alt="Qatar" />
            </div>
            <div className="header-center">
                <div className="header-center-inner">
                    <div className="center-div">
                        <div className="flight-route">
                            {from && to ? (
                                <span>
                                    {from.code} &#8652; {to.code}
                                </span>
                            ) : (
                                <span>Loading...</span>
                            )}
                        </div>
                    </div>
                    <div className="center-div">
                        {departure && returnDate ? (
                            <span>
                                <i className='far fa-calendar-alt'></i> {formattedDeparture} - {formattedReturn}
                            </span>
                        ) : (
                            <span>Loading Dates...</span>
                        )}
                    </div>
                    <div className="center-div">
                        <i className='fas fa-users'></i><span>{passengers} passenger</span>
                    </div>
                    <div className="center-div">
                        <button className="modify-search-button">
                            <i className="fa fa-search"></i> Modify Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="header-right">
                <button className="login-button">Login</button>
            </div>
        </div>
    );
};

export default Header;
