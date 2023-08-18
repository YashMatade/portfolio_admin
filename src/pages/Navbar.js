import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to={"/"} className="navbar-brand" href="/">Dashboard</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/skills"}>Skills</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/projects"}>Projects</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={""}>Others</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
