import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const SelfAssessment = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            console.log("no tok")
            navigate('/')
        }
    }, [])

    return (
        <div>
            <Navbar />

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="centered-content">
                <h1 className="start-journey-text" style={{textAlign:"center"}}>Start Your Journey to Healing</h1>
                <h1 className="assess-text" style={{textAlign:"center"}}>ASSESS YOUR WELL-BEING</h1>
                <p className="instruction-text" style={{textAlign:"center"}}>
                    Please read each question carefully, then click on the option that indicates how much <br />
                    you have been bothered by that problem in the last month.
                </p>
                <a href="/self-assessment/question-1" className="assessment-button" style={{ textDecoration: 'none', textAlign:"center" }}>Take Self Assessment Now!</a>
                <br />
                <p className="privacy-text" style={{textAlign:"center"}}>We Value your privacy. <br /> Your responses are confidential and secure.</p>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <Footer />
        </div>
    );
};

export default SelfAssessment;