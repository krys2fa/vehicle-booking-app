/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './NavBar.css';
import { logout } from '../actions/auth';

function NavBar() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };
  const { user } = useSelector(state => state.auth);
  console.log('App -> user', user);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <div className="nav-link">{user.username}</div>
                </li>
                <li className="nav-item">
                  <Link to="/bookings" className="nav-text">
                    <FaIcons.FaBook />
                    <span>Bookings</span>
                  </Link>
                  <Link to="/vehicle" className="nav-text">
                    <AiIcons.AiFillCar />
                    <span>Vehicles</span>
                  </Link>
                  <Link to="/login" className="nav-text" onClick={logOut}>
                    <AiIcons.AiOutlineLogout />
                    <span>LogOut</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-text">
                    <AiIcons.AiOutlineLogin />
                    <span>Login</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <a href="/register" className="nav-text">
                    <FaIcons.FaFileContract />
                    <span>Sign Up</span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default NavBar;
