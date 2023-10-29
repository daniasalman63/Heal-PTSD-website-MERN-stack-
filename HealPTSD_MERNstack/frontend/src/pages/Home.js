import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const Home = () => {
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
      <div className="row">
        <div className="col-8">
          <img src={require('../img/homeMain.png')} alt="nurture brain image" className="homepage-main-img" />
        </div>
        <div className="col-4">
          <p className='homepage-main-text-heading-1'>What is</p>
          <p className='homepage-main-text-heading-2'>PTSD?</p>
          <p className='homepage-main-text-subheading'>PTSD, or Post-Traumatic Stress Disorder, is a mental health condition that can develop after experiencing or witnessing a traumatic event. Symptoms may include flashbacks, nightmares, severe anxiety, and emotional distress.</p>
          <button type="button" class="btn learnmore-btn learnmore-txt">Learn more</button>
        </div>
      </div>
      <div className='row' style={{ marginTop: "10%" }}>
        <div className="col-6">
          <p className='fancy-heading' style={{ marginRight: "70%" }}>Self Check</p>
          <p className='normal-heading' style={{ marginLeft: "12%" }}>Assess Your Mental Well-being Today</p>
          <p className="normal-txt" style={{ marginLeft: "12.5%", marginTop: "3%", width: "70%" }}>Evaluate your emotional health with our self-assessment tools. Gain insight and take steps toward healing.</p>
          <img src={require('../img/quotes.png')} className='quotes-img' />
          <span className="normal-txt">"Understanding is the first step to healing." - Amit Ray</span>
          <button type="button" class="btn startnow-btn startnow-txt"><a href="/self-assessment">Start Now</a></button>
        </div>
        <div className="col-6">
          <div class="image-container">
            <img src={require('../img/circle.png')} alt="First Image" class="base-image" />
            <img src={require('../img/bogrec.png')} alt="Second Image" class="top-image-1" />
            <img src={require('../img/whiteRec.png')} alt="Third Image" class="top-image-2" />
            <img src={require('../img/smallImg.png')} alt="Fourth Image" class="top-image-3" />
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "20%", position: "relative" }}>
        <img src={require('../img/twoBase.png')} className='two-recs' />
        <div className="carousel-overlay">
          <p className="fancy-heading-rec">Our Services</p>
          <p className="normal-heading-rec">
            Access Healing Tools from Anywhere
          </p>
          <p className="normal-txt-rec">
            Explore a range of evidence-based online therapies to support your journey to recovery. These self-help resources empower you to manage PTSD symptoms on your terms.
          </p>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={require('../img/cardRec.png')} className="carousel-card" alt="..." />
                <div className="carousel-caption-heading">
                  <p>Artful Healing: Your Personal Image Therapy Companion</p>
                </div>
                <div className="carousel-caption-subheading">
                  <p>Discover the therapeutic power of creativity with Artful Healing, your trusted companion for image therapy. This unique app is designed to help you express, explore, and heal through art and imagery.</p>
                </div>
                <div className="carousel-link">
                  <a href="#">Try Now</a>
                </div>
              </div>
              <div className="carousel-item">
                <img src={require('../img/cardRec.png')} className="carousel-card" alt="..." />
                <div className="carousel-caption-heading">
                  <p>BreatheEasy: Your Guided Breathing Therapy Companion</p>
                </div>
                <div className="carousel-caption-subheading">
                  <p>Experience the calming and transformative power of conscious breathing with BreatheEasy, your trusted companion for breathing therapy. This app is designed to help you achieve emotional balance, reduce stress, and enhance your well-being.</p>
                </div>
                <div className="carousel-link">
                  <a href="#">Try Now</a>
                </div>
              </div>
              <div className="carousel-item">
                <img src={require('../img/cardRec.png')} className="carousel-card" alt="..." />
                <div className="carousel-caption-heading">
                  <p>JournalEase: Your Personal Guided Journaling Assistant</p>
                </div>
                <div className="carousel-caption-subheading">
                  <p>Capture Your Thoughts and Emotions with JournalEase, your devoted companion for mindful journaling. This tool is expertly designed to promote self-reflection, encourage expressive writing, and provide guidance for organizing your thoughts. </p>
                </div>
                <div className="carousel-link">
                  <a href="/journal">Try Now</a>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
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

export default Home;