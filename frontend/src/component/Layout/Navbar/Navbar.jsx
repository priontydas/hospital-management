import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import Topbar from "./Topbar";
import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <>
      <div className="navbar-contaier sticky-top">
        <div className="row">
            <div className="call-md-3">
              <NavLink to="/">
                <img src={Logo} alt="logo" className='brand-logo' />
              </NavLink>
            </div>
            <div className="call-md-9">
          {/* Topbar menu */}
                <div>
                    <Topbar />
                </div>
         {/* main menu */}
                <div>
                    <NavMenu />
                </div>
                
            </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
