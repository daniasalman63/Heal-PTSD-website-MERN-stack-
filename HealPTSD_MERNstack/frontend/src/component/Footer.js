import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
                <div className="container" style={{ color: "black" }}>
                    <div className="row">
                        <div className="col-4">
                            <h2 className="footer-heading">Our services</h2>
                            <ul className="footer-list">
                                <li><a className="footer-link" href="#">Self-assessment</a></li>
                                <li><a className="footer-link" href="#">Journal</a></li>
                                <li><a className="footer-link" href="#">Coping Strategies</a></li>
                                <li><a className="footer-link" href="#">Consult</a></li>
                            </ul>
                        </div>

                        <div className="col-4">
                            <h2 className="footer-heading">Useful Links</h2>
                            <ul className="footer-list">
                                <li><a className="footer-link" href="#">About</a></li>
                                <li><a className="footer-link" href="#">Latest Updates</a></li>
                                <li><a className="footer-link" href="#">What is PTSD?</a></li>
                            </ul>
                        </div>

                        <div className="col-4">
                            <h2 className="footer-heading">Get In Touch</h2>
                            <address className="footer-list">
                                <p><img src={require('../img/fluent_location-28-filled.png')} alt="Location Icon" /><a className="footer-link" href="#"> Mankato, Karachi 75290</a></p>
                                <p><img src={require('../img/ic_round-email.png')} alt="Email Icon" /><a className="footer-link" href="#"> info@healptsd.com</a></p>
                                <p><img src={require('../img/ph_phone-fill.png')} alt="Phone Icon" /><a className="footer-link" href="#"> 868 264 9654</a></p>
                            </address>
                        </div>
                    </div>
                </div>
                <hr />
                <p className="copy-tag">
                    Copyright &copy; Heal PTSD. All rights reserved
                    <img src={require('../img/Group 20.png')} alt="Image description" />
                </p>
            </footer>

  );
}

export default Footer;
