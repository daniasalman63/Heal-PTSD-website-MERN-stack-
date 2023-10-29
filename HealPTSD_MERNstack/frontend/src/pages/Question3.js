import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Question3 = () => {
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

                <p className="custom-color">
                    Suddenly<span className="italics not-bold"> acting or feeling </span>as if a stressful experience<br />
                    <span className="italics not-bold"> were happening </span> again (as if you were reliving it)?
                </p>

                <div className="btn-group mt-4" role="group">
                    <button type="button" className="btn custom-button rounded-pill btn-lg" data-value="1">1. Not at all</button>
                    <button type="button" className="btn custom-button rounded-pill btn-lg" data-value="2">2. A little bit</button>
                    <button type="button" className="btn custom-button rounded-pill btn-lg" data-value="3">3. Moderately</button>
                    <button type="button" className="btn custom-button rounded-pill btn-lg" data-value="4">4. Quite a bit</button>
                    <button type="button" className="btn custom-button rounded-pill btn-lg" data-value="5">5. Extremely</button>
                </div>
            </div>
            <a href="/self-assessment/question-2" className="previous-button">&lt; Previous</a>
            <a href="#" className="next-button">Next &gt;</a>

            <div className="footer-question">
                <div className="page-count">Page 3 of 17</div>
            </div>
        </div>
    );
};

export default Question3;