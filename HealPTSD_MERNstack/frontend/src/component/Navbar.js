import React from 'react';
import axios from 'axios';

const Navbar = () => {
    const handleLogout = () => {
        axios.get('/api/logout')
          .then((response) => {
            if (response.data.message === 'Logout successful') {
              // Redirect to the login page or any other desired location
              localStorage.removeItem('token')
              window.location.href = '/';
            }
          })
          .catch((error) => {
            console.log('Logout error:', error);
          });
      };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbarCustom">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active navbarTabs" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active navbarTabs" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active navbarTabs" href="/journal">Journal</a>
                            </li>
                            <li className="nav-item">
                                <input className="btn signupButton" type="button" value="Sign Out" onClick={handleLogout} />
                            </li>
                        </ul>
                    </div>
                    <a className="me-2 logoText" href="#">
                        <img src={require('../img/logo.png')} alt="" width="60" height="60" className="d-inline-block align-text-top" />
                        Heal PTSD
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;