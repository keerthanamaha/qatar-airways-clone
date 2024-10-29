import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css'
function Search() {
    const navigate = useNavigate();
    // State to hold form input values
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departure: '',
        return: '',
        class: 'economy',
        options: 'return',
    });
    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/results', { state: formData });
    };
    return (
        <div className="SearchContainer">
            <div className='Header-tab'>
                <div className='Book-flight'>Book a flight</div>
                <div className='Stopover'>Stopover / Packages</div>
                <div className='Manage'>Manage / Check in</div>
                <div className='Flight-status'>Flight status</div>
            </div>
            <div className='Tab-content'>
                <form onSubmit={handleSubmit}>
                    <div className='Radio'>
                        <label>
                            <input
                                type="radio"
                                name="options"
                                value="option1"
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
                                onChange={handleInputChange}
                                checked={formData.options === 'one-way'}
                            />
                            One Way
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="options"
                                value="multi-way"
                                onChange={handleInputChange}
                                checked={formData.options === 'multi-way'}
                            />
                            Multi Way
                        </label>
                    </div>
                    <div className='Journey-details'>
                        <div className='From-block'>
                        <label htmlFor="from">From:</label>
                            <input
                                type="text"
                                id="from"
                                name="from"
                                placeholder="From"
                                value={formData.from}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className='To-block'>
                            <label htmlFor="to">To:</label>
                            <input
                                type="text"
                                id="to"
                                name="to"
                                placeholder="To"
                                value={formData.to}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className='Departure-block'>
                            <label htmlFor="departure">Departure:</label>
                            <input
                                type="date"
                                id="departure"
                                name="departure"
                                value={formData.departure}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className='Return-block'>
                            <label htmlFor="return">Return:</label>
                            <input
                                type="date"
                                id="return"
                                name="return"
                                value={formData.return}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='Return-block'>
                            <label htmlFor="class">Passengers / Class:</label>
                            <select
                                id="class"
                                name="class"
                                value={formData.class}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="economy">Economy</option>
                                <option value="business">Business</option>
                                <option value="first">First Class</option>
                            </select>
                        </div>
                    </div>

                    <div className='Search-button-div'>
                        <button className='Search-button' type="submit">Search Flight</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;