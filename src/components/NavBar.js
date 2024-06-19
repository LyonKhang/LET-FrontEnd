import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/NavBar.css";

function NavBar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    return (
        <>
            <nav className="nav_header">
                <div className="nav_container">

                    <ul className={click ? "nav_menu active" : "nav_menu"}>
                        <li className="nav-item">
                            <NavLink

                                to="/"
                                activeclassname="active"
                                className="nav_button"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/show"
                                activeclassname="active"
                                className="nav_button"
                                onClick={handleClick}
                            >
                                Show
                            </NavLink>
                        </li>
                    </ul>
                    <NavLink to="/" className="nav-brand">
                        <span>LET</span>
                    </NavLink>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
