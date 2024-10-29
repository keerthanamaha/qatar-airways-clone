import React from 'react';
import '../styles/Home.css';
import logo from '../images/logo.svg';
import search from '../images/search.svg';
import ow from '../images/ow.svg'
function Home() {
    return (
        <div>
            <div className='Banner'>
                <div className='Content'>
                <div className='Header'>
                    <div className='LeftContent'>
                        <img className="logo" src={logo} alt='logo'></img>
                        <img className="ow" src={ow} alt='logo'></img>
                    </div>
                    <div className='NavbarContent'>
                        <p className='Explore'>Explore</p>
                        <p className='Book'>Book</p>
                        <p className='Experience'>Experience</p>
                        <p className='Priviledge Club'>Priviledge Club</p>
                    </div>
                    <div className='Search'>
                        <p className='Help'>Help</p>
                        <img className="search" src={search} alt='logo'></img>
                        <p className='EN'>EN</p>
                    </div>
                    <div className='LoginContainer'>
                        <p>Login</p>
                        <p>| SignUp</p>
                    </div>
                </div>
                <div className='HeroContent'>
                    <div><h1>Explore Our Member Offers</h1></div>
                    <div><p>Not a member? Join today.</p></div>
                    <div ><button className='BookButton'>Book now</button></div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Home;