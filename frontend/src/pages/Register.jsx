import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom"
import api from "../api/api";
function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        date_of_birth: "",
        profile_picture_url: ""
    });
    function handleChange(e) {
        const label = e.target.name; //first_name
        let value;
        if (label == "profile_picture_url") {
            value = e.target.files[0];
        }
        else {
            value = e.target.value; //"u"
        }
        setData({ ...data, [label]: value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (let i in data) {
                formData.append(i, data[i]);
            }
            const res = await api.post("/auth/register", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (res.status == 201) {
                alert("User Registered Successfully");
                navigate("/login");
            }
        }
        catch (err) {
            alert(err?.response?.data?.message || "Internal Server Error");
            console.log(err);
        }
        setData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone: "",
            date_of_birth: "",
            profile_picture_url: ""
        })
    }
    return (
        <section id="register-section">
            <form id="register-form" onSubmit={handleSubmit}>
                <h1>Register Page</h1>
                <div className="register-input-container">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" value={data.first_name} name="first_name" onChange={handleChange} required />
                </div>
                <div className="register-input-container">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" value={data.last_name} name="last_name" onChange={handleChange} required />
                </div>
                <div className="register-input-container">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={data.email} name="email" onChange={handleChange} required />
                </div>
                <div className="register-input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={data.password} name="password" onChange={handleChange} required />
                </div>
                <div className="register-input-container">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" name="phone" value={data.phone} onChange={handleChange} required />
                </div>
                <div className="register-input-container">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input type="date" id="dob" name="date_of_birth" value={data.date_of_birth} onChange={handleChange} required />
                </div>
                <div className="register-input-container profile-image-input">
                    <label htmlFor="profile">Profile Image</label>
                    <input type="file" id="profile" value={data.profile_picture_url.filename} name="profile_picture_url" onChange={handleChange} required />
                </div>
                <div id="register-new-user">
                    <p>Already Registered?</p>
                    <Link to="/login">Login Here</Link>
                </div>
                <div id="register-btn">
                    <button>Register</button>
                </div>
            </form>
        </section>
    )
}

export default Register