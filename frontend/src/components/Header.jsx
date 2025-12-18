import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext"
import defaultAvatar from "../assets/default-avatar-image.png";
function Header() {
    let tabs = [
        { link: "/", label: "Home" },
        { link: "/hotels", label: "Hotels" },
        { link: "/contact", label: "Contact" },
        { link: "/about", label: "About" }
    ];

    const navigate = useNavigate();

    // using userContext
    const { user, logout } = useContext(UserDataContext);
    console.log(user);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
    useEffect(() => {
        document.addEventListener("click", () => {
            setIsAvatarMenuOpen(false)
        })
    }, [])
    return (
        <>
            <header>
                <h1>Hotel-Booking</h1>
                <nav>
                    <ul>
                        {
                            tabs.map(({ link, label }, index) => {
                                return <li key={index}>
                                    <Link to={link}>{label}</Link></li>
                            })
                        }
                    </ul>
                </nav>
                <div id="btns">
                    {
                        user ?
                            <div id="after-login-user">
                                <div id="avatar"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsAvatarMenuOpen(!isAvatarMenuOpen)
                                    }}>
                                    <img src={defaultAvatar} alt={user?.name + " 's  profile-image"} />
                                </div>
                                {
                                    isAvatarMenuOpen && <div id="after-login-nav">
                                        <h4>Welcome {user?.name}</h4>
                                        <ul>
                                            <li>
                                                <Link to="/my-bookings">My-Bookings</Link>
                                            </li>
                                            {
                                                user?.isOwner ?
                                                    <li><Link to="/setup-hotel">Setup Hotel</Link></li>
                                                    : <li>
                                                        <Link to="/register-hotel">Register Hotel</Link>
                                                    </li>
                                            }
                                            <li onClick={logout}>Logout</li>
                                        </ul>
                                    </div>
                                }
                            </div>
                            :
                            <button onClick={() => {
                                navigate("/login");
                            }}>Login</button>
                    }
                </div>

                {/* Mobile nav  */}
                <div id="mobile-nav" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ?
                        <RxCross2 className="menu-btn" />
                        :
                        <GiHamburgerMenu className="menu-btn" />}
                </div>
            </header>
            {/* Mobile navbar  */}
            {isMenuOpen && <div id="mobile-nav-container">
                <ul>
                    {
                        tabs.map(({ link, label }, index) => {
                            return <li key={index}>
                                <Link to={link} />{label}
                            </li>
                        })
                    }
                </ul>
                <div id="mobile-nav-btn">
                    <button onClick={() => {
                        navigate("/login");
                    }}>Login</button>
                </div>
            </div>}
        </>
    )
}

export default Header;