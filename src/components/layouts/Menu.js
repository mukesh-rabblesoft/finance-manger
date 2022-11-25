import React, { useState, useEffect } from "react";
import "../../css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, clearAuthMsg } from "../../redux/actions/authAction";


const Menu = (props) => {
    const location = useLocation();
   const [dropdownMenu, setDropdownMenu] = useState("");
    
console.log("props.auth.isAuthenticated",props.auth.isAuthenticated)

  return (
    <>
      {props.auth && props.auth.isAuthenticated ? (<>
      <ul className="navbar-nav mr-auto">
        <li className={`nav-item dropdown ${location.pathname === "/" ? "active" : ""}`}>
          <Link className={`nav-link text-bold active dropdown-toggle`} to={`#`} onClick={() => {
            if (dropdownMenu === "budgets") {
              setDropdownMenu("");
            } else {
              setDropdownMenu("budgets");
            }
          }}>
            Budgets
          </Link>
          <div className={`dropdown-menu ${dropdownMenu === "budgets" ? "show" : ""}`}>
            <Link key={`budget-`} className={`dropdown-item ${location.pathname === `/` ? "active" : ""} `} to={`/budget/2022`}>
              2022
            </Link>
          </div>
        </li>
        <li className={`nav-item ${location.pathname === "/asset-liability" ? "active" : ""}`}>
            <Link key={`budget-`} className={`nav-link text-bold ${location.pathname === `/asset-liability` ? "active" : ""} `} to={`/asset-liability`}>
              Asset/Liability
            </Link>          
        </li>
        <li className={`nav-item ${location.pathname === "/gds-tds" ? "active" : ""}`}>
            <Link key={`budget-`} className={`nav-link text-bold ${location.pathname === `/gds-tds` ? "active" : ""} `} to={`/gds-tds`}>
              GDS/TDS
            </Link>          
        </li>
        <li className={`nav-item dropdown ${location.pathname === "/banks" ? "active" : ""}`}>
          <Link className={`nav-link text-bold active dropdown-toggle`} to={`/banks`} onClick={() => {
            if (dropdownMenu === "banks") {
              setDropdownMenu("");
            } else {
              setDropdownMenu("banks");
            }
          }}>
            Banks
          </Link>
          <div className={`dropdown-menu ${dropdownMenu === "banks" ? "show" : ""}`}>
            <Link key={`budget-`} className={`dropdown-item ${location.pathname === `/banks` ? "active" : ""} `} to={`/banks`}>
              banks
            </Link>
          </div>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0 text-white ml-auto">
      {/* <button type="button" className="text-white btn btn-success font-weight-bold mr-1" onClick={()=>{
        props.activateTwoFactUser(activateDetails)
          setActiveVal(activeVal === 1 ? 0 : 1)
      }} > {activeVal === 1 ? "activate" : "Deactivate" }</button> */}
        {/* <Link to="/enable-authenticate" className="text-white font-weight-bold mr-1">EnableAuthenticate </Link> */}
        <Link to="/enable-authenticate" className="text-white font-weight-bold mr-2"
        >
          Profile
        </Link>
        <span className="font-weight-bold">
           {/* <span>{props.auth.user.first_name} {props.auth.user.last_name}</span>  */}
          <span className="mr-1"> |  </span> 
        </span>
        <Link to="#" className="text-white font-weight-bold"
          onClick={() => {
            props.logout()
            props.clearAuthMsg()
            window.location.href = '/login'
            
          }}
        >
          Logout
        </Link>
      </form></>) : ""}
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
  clearAuthMsg,
})(Menu);