import React, { useState } from 'react';
import axios from 'axios';
import LeftRectangle from '../component/LeftRectangle';
import Logo from '../component/Logo'


const Registration = () => {
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mentalHealthHistory: '',
    age: '',
    gender: '',
    therapyOption: '',
    contact: ''
  })

  const { firstName, lastName, email, password, mentalHealthHistory, age, gender, therapyOption, contact } = values;

  const handleChange = name => (e) => {
    // console.log(e.target.value);
    setValues({ ...values, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createAccount = await axios.post('/api/register', {
        firstName,
        lastName,
        email,
        password,
        mentalHealthHistory,
        age,
        gender,
        therapyOption,
        contact
      });
  
      if (createAccount.data.message) {
        // If the response contains a message, it's an error
        setMessage(createAccount.data.message); // Set the error message from the server
      } else {
        // Successful account creation
        console.log('Account created successfully');
        setValues({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          mentalHealthHistory: '',
          age: '',
          gender: '',
          therapyOption: '',
          contact: ''
        });
      }
    } catch (err) {
      // Handle network or other errors, or display the specific error if available
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  }
  
  

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
        <LeftRectangle />
          <div className="col-8 right-rectangle">
          <Logo />
            <div className="registration-form">
              <h2 className="create-account-heading">Create Account</h2>
              <form action="/register" method="post" onSubmit={handleSubmit}>
                <div className="name-inputs">
                  <div className="name-input">
                    <label className="top-label-small input-field-font" htmlFor="firstName">First Name</label>
                    <input onChange={handleChange("firstName")} className="top-input small-input-field" type="text" name="firstName" value={firstName} required />
                  </div>

                  <div className="name-input">
                    <label className="top-label-small input-field-font" htmlFor="lastName">Last Name</label>
                    <input onChange={handleChange("lastName")} className="top-input small-input-field" type="text" name="lastName" value={lastName} required />
                  </div>
                </div>

                <div className="name-inputs">
                  <div className="name-input">
                    <label className="top-label-email input-field-font" htmlFor="email">Email</label>
                    <input onChange={handleChange("email")} className="top-input big-input-field" type="email" name="email" value={email} required /><br />
                  </div>
                </div>

                <div className="name-inputs" style={{ marginTop: '-2.3%' }}>
                  <div className="name-input">
                    <label className="top-label-password input-field-font" htmlFor="password">Password</label>
                    <input onChange={handleChange("password")} className="top-input big-input-field" type="password" name="password" value={password} required /><br />
                  </div>
                </div>

                <div className="name-inputs">
                  <div className="name-input">
                    <label className="top-label-history input-field-font" htmlFor="mentalHealthHistory" style={{ marginTop: '-4.7%' }}>Mental Health History</label>
                    <select className="top-input small-input-field" name="mentalHealthHistory" value={values.mentalHealthHistory} onChange={handleChange("mentalHealthHistory")}>
                      <option value="" disabled>Select One</option>
                      <option value="No Known History">No Known History</option>
                      <option value="Anxiety Disorders">Anxiety Disorders</option>
                      <option value="Depression">Depression</option>
                      <option value="Bipolar Disorder">Bipolar Disorder</option>
                      <option value="Diagnosed PTSD">Diagnosed PTSD</option>
                      <option value="Schizophrenia">Schizophrenia</option>
                      <option value="Substance Abuse">Substance Abuse</option>
                      <option value="Eating Disorder">Eating Disorder</option>
                      <option value="OCD (Obsessive-Compulsive Disorder)">OCD (Obsessive-Compulsive Disorder)</option>
                      <option value="Personality Disorders">Personality Disorders</option>
                      <option value="Self-harm">Self-harm</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="name-input">
                    <label className="top-label-small input-field-font" htmlFor="age" style={{ marginTop: '-4.7%' }}>Age</label>
                    <input onChange={handleChange("age")} className="top-input small-input-field" type="number" name="age" value={age} /><br />
                  </div>
                </div>

                <div className="name-inputs">
                  <label className="top-label-gender input-field-font" htmlFor="gender">Gender</label>
                  <div className="name-input-gender">
                    <input
                     style={{marginBottom: '-3%'}}
                      type="radio"
                      name="gender"
                      value="male"
                      checked={values.gender === "male"}
                      className="custom-radio-male"
                      onChange={handleChange("gender")}
                      required
                    />
                    <label style={{marginLeft: '1%'}} className="input-field-font" htmlFor="male">
                      Male
                    </label>
                  </div>

                  <div className="name-input-gender">
                    <input
                    style={{marginBottom: '-3%'}}
                      type="radio"
                      name="gender"
                      value="female"
                      checked={values.gender === "female"}
                      className="custom-radio-female"
                      onChange={handleChange("gender")}
                      required
                    />
                    <label style={{marginLeft: '1%'}} htmlFor="female" className="input-field-font">
                      Female
                    </label>
                  </div>

                  <div className="name-input-gender">
                    <input
                      style={{marginBottom: '-3%'}}
                      type="radio"
                      name="gender"
                      value="other"
                      checked={values.gender === "other"}
                      className="custom-radio-other"
                      onChange={handleChange("gender")}
                      required
                    />
                    <label style={{marginLeft: '1%'}} htmlFor="other" className="input-field-font">
                      Other
                    </label><br />
                  </div>
                </div>
                <div className="name-inputs">
                  <div className="name-input">
                    <label htmlFor="therapyOption" className="top-label-therapy input-field-font" style={{ marginLeft: '-1%', marginBottom: '6%' }}>Do you currently receive therapy?</label>
                    <input
                      type="radio"
                      name="therapyOption"
                      value="yes"
                      checked={values.therapyOption === "yes"}
                      onChange={handleChange("therapyOption")}
                      required
                    />
                    <label htmlFor="yesTherapy" className="input-field-font">
                      Yes
                    </label>

                    <input
                      type="radio"
                      name="therapyOption"
                      value="no"
                      checked={values.therapyOption === "no"}
                      onChange={handleChange("therapyOption")}
                      style={{ marginLeft: '26%' }}
                      required
                    />
                    <label htmlFor="noTherapy" className="input-field-font">
                      No
                    </label>
                  </div>

                  <div className="name-input">
                    <label htmlFor="contact" className="top-label-small input-field-font" style={{ marginTop: '-0.5%' }}>Contact</label>
                    <input
                      type="text"
                      className="top-input small-input-field"
                      style={{ marginTop: '-0.5%' }}
                      name="contact"
                      value={contact}
                      onChange={handleChange("contact")}
                    /><br />
                  </div>
                </div>

                <input type="submit" value="Create Account" className="submit-button" />
              </form>
            </div>
            <div className="inline-elements">
              <p className="foot-text-one">Already have an account?</p>
              <a href="/" className="foot-text-two">Login</a>
            </div>
            {message && <p className='message-display'>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
