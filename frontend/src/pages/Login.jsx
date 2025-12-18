import { useContext, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom"
import api from "../api/api";
import { UserDataContext } from "../context/UserContext"
function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const { setUser } = useContext(UserDataContext);
    function handleChange(e) {
        const label = e.target.name;
        let value;
        if (label == "profile_picture_url") {
            value = e.target.files[0];
        }
        else {
            value = e.target.value;
        }
        setData({ ...data, [label]: value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", data);
            if (res.status == 200) {
                console.log(res.data);
                setUser(res?.data?.data)
                alert("User Login Successfully");
            }
            else {
                alert(res.data.message);
            }
        }
        catch (err) {
            alert(err?.response?.data?.message || "Internal Server Error");
            console.log(err);
        }
        finally {
            setData({
                email: "",
                password: "",
            })
        }
    }
    return (
        <section id="login-section">
            <form id="login-form" onSubmit={handleSubmit}>
                <h1>Login Page</h1>
                <div className="login-input-container">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={data.email} name="email" onChange={handleChange} />
                </div>
                <div className="login-input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={data.password} name="password" onChange={handleChange} />
                </div>
                <div id="login-new-user">
                    <p>New User?</p>
                    <Link to="/register">Register Here</Link>
                </div>
                <div id="login-btn">
                    <button>Login</button>
                </div>
            </form>
        </section>
    )
}

export default Login