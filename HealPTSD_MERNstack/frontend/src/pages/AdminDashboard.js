import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const AdminDashboard = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [minAge, setMinAge] = useState(null);
    const [maxAge, setMaxAge] = useState(null);

    const handleLogout = () => {
        axios.get('/api/admin/logout')
          .then((response) => {
            if (response.data.message === 'Logout successful') {
              // Redirect to the login page or any other desired location
              localStorage.removeItem('token')
              window.location.href = '/admin/login';
            }
          })
          .catch((error) => {
            console.log('Logout error:', error);
          });
      };

    useEffect(() => {
        if(!localStorage.getItem('token')){
          console.log("no tok")
          navigate('/admin/login')
        }
      }, [])

    useEffect(() => {
        axios.get("/api/admin/dashboard")
            .then((response) => {
                const userList = response.data.users; // Define userList
                const adminData = response.data.admin;
                setUsers(userList);
                setAdmin(adminData);



                // Calculate minimum and maximum ages
                const ages = userList.map((user) => user.age);
                if (ages.length > 0) {
                    const min = Math.min(...ages);
                    const max = Math.max(...ages);
                    setMinAge(min);
                    setMaxAge(max);
                } else {
                    setMinAge(null);
                    setMaxAge(null);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const userCount = users.length;
    const adminFirstName = admin ? admin.firstName : 'Unknown';
    const adminLastName = admin ? admin.lastName : 'Unknown';
    return (
        <div>
            <div className="container-fluid">
                <div className="row"></div>
                <div className="col-1 left-rectangle-admin">
                    <div className="h-logo"></div>
                </div>
                <div className="col-11 right-rectangle-admin">
                    <div className="row">
                        <h1 className="col-3 admin-heading">Admin dashboard</h1>
                        <div className="col-8 text-right">
                            <div className="admin-details">
                                <h3 className="admin-name">{adminFirstName} {adminLastName}</h3>
                                <div className="dropdown">
                                    <button className="dropdown-icon" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="#">View Profile</a></li>
                                        {/* <li><a className="dropdown-item" href="/admin/login" onClick={handleLogout}>Logout</a></li> */}
                                        <button onClick={handleLogout} className="logout-button">Logout</button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <div class="stats-rectangle" style={{ marginLeft: "10%" }}>
                                <p className="stats-heading">Total Users</p>
                                <p className="stats-subheading">{userCount}</p>
                            </div>
                        </div>
                        <div class="col-md-4 text-center">
                            <div class="stats-rectangle" style={{ marginLeft: "5%" }}>
                                <p className="stats-heading">Age Group</p>
                                <p className="stats-subheading">{minAge} - {maxAge}</p>
                            </div>
                        </div>
                        <div class="col-md-4 text-center">
                            <div class="stats-rectangle" style={{ marginRight: "15%" }}>
                                <p className="stats-heading">Journal entries</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7 table-rectangle-1">
                            <table width="40vw" style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "2%", marginRight: "2%" }}>
                                <thead>
                                    <tr>
                                        <th className="text-center table-header">Name</th>
                                        <th className="text-center table-header">Email</th>
                                        <th className="text-center table-header">Mental Health History</th>
                                        <th className="text-center table-header">Age</th>
                                        <th className="text-center table-header">Gender</th>
                                        <th className="text-center table-header">Do they take therapy?</th>
                                        <th className="text-center table-header">Contact</th>
                                        <th className="text-center table-header">Verified</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="text-center table-entry">{user.firstName} {user.lastName}</td>
                                            <td className="text-center table-entry">{user.email}</td>
                                            <td className="text-center table-entry">{user.mentalHealthHistory}</td>
                                            <td className="text-center table-entry">{user.age}</td>
                                            <td className="text-center table-entry">{user.gender}</td>
                                            <td className="text-center table-entry">{user.therapyOption}</td>
                                            <td className="text-center table-entry">{user.contact}</td>
                                            <td className="text-center table-entry">{user.isVerified ? 'Verified' : 'Not Verified'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-3 table-rectangle-2">
                            <table width="40vw">
                                <thead>
                                    <tr>
                                        <th className="text-center table-header">Email</th>
                                        <th className="text-center table-header">Journal entries</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center table-entry">samplemail@gmail.com</td>
                                        <td className="text-center table-entry">10</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;