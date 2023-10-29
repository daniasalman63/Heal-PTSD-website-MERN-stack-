import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const Journal = () => {
    const navigate = useNavigate()
    const [stressAnxiety, setStressAnxiety] = useState('');
    const [hurtBetrayal, setHurtBetrayal] = useState('');
    const [relaxedState, setRelaxedState] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            console.log("no tok")
            navigate('/')
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container">
                <p className="assessment-heading">Start Journaling Now</p>
                <p className="journal-text" style={{ marginTop: "5%" }}>Journal Title: Journal #1</p>

                <p className="journalwriting-text" style={{ textAlign: "center" }}>
                    Set a timer (5-15-30 mins), especially if you’re just starting. Focus on writing until the time is up.
                </p>

                <div className="container">
                    <p className="journal-text">If you are feeling stressed/anxious:</p>
                    <ol>
                        <li className="journalwriting-text">Write 5 things that you are proud of?</li>
                        <li className="journalwriting-text">In my ideal world, what person would I be? Traits, Job, Habits, and Lifestyle</li>
                    </ol>

                    <div className="textbox">
                        <textarea className='text-write'
                            value={stressAnxiety}
                            onChange={(e) => setStressAnxiety(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="container">
                    <p className="journal-text" style={{ marginTop: "5%" }}>If you are feeling hurt/betrayed:</p>
                    <ol>
                        <li className="journalwriting-text">Who is causing you this pain? Write them a short letter explaining how you feel.</li>
                        <li className="journalwriting-text">If your friend was going through the same situation, what advice would you give them?</li>
                    </ol>

                    <div className="textbox1">
                    <textarea className='text-write'
                            value={hurtBetrayal}
                            onChange={(e) => setHurtBetrayal(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="container">
                    <p className="journal-text" style={{ marginTop: "5%" }}>If you feel off and do not know what to write:</p>
                    <ol>
                        <li className="journalwriting-text">What are your top 3 favorite ways to relax?</li>
                        <li className="journalwriting-text">List 5 things you want to accomplish this year</li>
                    </ol>

                    <div className="textbox2">
                    <textarea className='text-write'
                            value={relaxedState}
                            onChange={(e) => setRelaxedState(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="col-6 col-md-12 text-end">
                        <div className="d-flex flex-wrap justify-content-end align-items-center">
                            <button type="button" className="btn signupButton">save</button>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />

            <Footer />

            
        </div>
    );
};

export default Journal;