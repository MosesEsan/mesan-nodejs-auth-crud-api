import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../context/auth";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const {state} = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">React CRUD Example</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={'/'} className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/product/create'} className="nav-link">Create</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/product/index'} className="nav-link">Index</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Header;