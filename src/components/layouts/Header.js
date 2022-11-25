import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu";
import "../../css/bootstrap.min.css";
import "../../css/app.css";
import { connect } from "react-redux";

const Header = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const date = new Date();
  const location = useLocation();
  //console.log(location, useParams());
  useEffect(() => {
    // if (props.auth.isAuthenticated === false) {
      // let whitListPaths = (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot' || location.pathname ==='/activate/')?false:true;
      // if(whitListPaths){
        //window.location.href = '/login';
      // }
    // }
  }, [props.auth]);

  return (
    <>
      <div>
        <div className="shine-slogan text-white py-1 px-3 d-flex">
          <span className="d-none d-sm-block">
            Shine's Budget Dividend & Retirement Calculator
          </span>
          <span className="ml-auto" style={{ paddingLeft: 10 }}>
            {date.toDateString()}
          </span>
          <span
            className="ml-2 px-1"
            style={{ background: "yellow", borderRadius: 5, color: "black" }}
          >
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="ml-2">
            {date
              .toLocaleDateString(undefined, {
                day: "2-digit",
                timeZoneName: "short",
              })
              .substring(4)}
          </span>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark bg-theme-dark">
          <Link
            className="navbar-brand navbar-brand-shine text-white fs-2 mb-1"
            to="/"
          >
            <strong>Shine's BDR</strong>
          </Link>
          {props.auth && props.auth.user ? (<>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`navbar-collapse ${!openMenu ? "collapse" : ""}`}>
              <Menu />
            </div>
          </>) : ""}
        </nav>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
