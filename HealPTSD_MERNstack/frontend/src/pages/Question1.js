import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Question1 = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            console.log("no tok")
            navigate('/')
        }
    }, [])

    return (
        <div>
            <a className="me-2 logoText" href="self-assess.html">
                <img src={require('../img/logo.png')} alt="" width="60" height="60" className="d-inline-block align-text-top" />
                Heal PTSD
            </a>

            <div className="container centered-text">
                <p>
                    In the <span className="italics not-bold"> last month,</span> how much have you been bothered by:
                </p>
                <p className="custom-color"> Repeated, <span className="italics not-bold">disturbing memories, thoughts, or images </span>of
                    <br /> a stressful experience from the past?
                </p>
                <div className="btn-group mt-4" role="group">
                    <button type="button" className="btn custom-button rounded-pill btn-lg" data-value="1">1. Not at all</button>
                    <button type="button" className="btn custom-button rounded-pill btn-lg" data-value="2">2. A little bit</button>
                    <button type="button" className="btn custom-button rounded-pill btn-lg" data-value="3">3. Moderately</button>
                    <button type="button" className="btn custom-button rounded-pill btn-lg" data-value="4">4. Quite a bit</button>
                    <button type="button" className="btn custom-button rounded-pill btn-lg" data-value="5">5. Extremely</button>
                </div>
            </div>

            <a href="/self-assessment/question-2" className="next-button">Next &gt;</a>

            <div className="footer-question">
                <div className="page-count">Page 1 of 17</div>
            </div>
        </div>
    );
};

export default Question1;