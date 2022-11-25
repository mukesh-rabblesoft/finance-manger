import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
// import { Register as RegisterIcon } from "@mui/icons-material";
import { register, clearAuthMsg } from "../redux/actions/authAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Register(props) {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [user, setUser] = useState({
    username: "",
    passwd: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    gender: 1,
    city: "",
    country: "",
  });

  useEffect(() => {
    if (props.auth.msg === "Wrong credentials") {
      console.log("Clear Auth Msg")
      props.clearAuthMsg();
    }
    if (props.auth.msg !== "") {
      if (errorText !== "") {
        setErrorText("");
      }
      setIsWaiting(false);

      if (props.auth.msg === "Register success") {
        setRegisterSuccess(true);
      }
      if (props.auth.msg === "Logged out") {
        props.clearAuthMsg();
        setRegisterSuccess(false);
        setErrorText("")
      }
      setErrorText(props.auth.msg);
    }
  }, [props.auth]);

  //console.log(props.auth.msg === "Wrong credentials", props.auth.msg)
  //console.log(props.auth)
  //console.log("error text", errorText)
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3 col-12">
          <div className="card shadow">
            <div className="card-header text-center">Register</div>
            <div className="card-body">
              {registerSuccess ? (
                <>
                  <div className="alert alert-success">
                    Register success! An email has been sent. Please check your
                    mailbox and activate your account.
                  </div>
                  <div className="text-center">
                    <Link
                      className="btn btn-success btn-success-dark mt-2"
                      to="/login"
                    >
                      Return to login
                    </Link>
                  </div>
                </>

              ) : (
                <>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="txtUsername" className="form-label">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtUsername"
                        required
                        value={user.username}
                        onChange={(e) =>
                          setUser({ ...user, username: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="txtPassword" className="form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="txtPassword"
                        required
                        value={user.passwd}
                        onChange={(e) =>
                          setUser({ ...user, passwd: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="txtFirstname" className="form-label">
                        First name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtFirstname"
                        required
                        value={user.first_name}
                        onChange={(e) =>
                          setUser({ ...user, first_name: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="txtLastname" className="form-label">
                        Last name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtLastname"
                        required
                        value={user.last_name}
                        onChange={(e) =>
                          setUser({ ...user, last_name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="txtEmail" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="txtEmail"
                        required
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="txtEmail" className="form-label">
                        Mobile <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtMobile"
                        required
                        value={user.mobile}
                        maxLength="15"
                        onChange={(e) => {
                          // let val = e.target.value;
                          // if(val.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                          // val = '';
                          // }
                          setUser({ ...user, mobile: e.target.value })
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="txtGender" className="form-label">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select form-control"
                        value={user.gender}
                        required
                        onChange={(e) =>
                          setUser({ ...user, gender: Number(e.target.value) })
                        }
                        defaultValue={(user && user.gender) ? user.gender : 1}
                      >
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="txtCity" className="form-label">
                        City <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtCity"
                        required
                        value={user.city}
                        onChange={(e) =>
                          setUser({ ...user, city: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="txtState" className="form-label">
                        State <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtState"
                        required
                        value={user.state}
                        onChange={(e) =>
                          setUser({ ...user, state: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="txtCountry" className="form-label">
                        Country <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtCountry"
                        required
                        value={user.country}
                        onChange={(e) =>
                          setUser({ ...user, country: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {isWaiting && <div>Waiting...</div>}
                  {(errorText && errorText !== "") && (
                    <div className="alert alert-warning">{errorText}</div>
                  )}
                  <Link className="btn-link float-left mt-2" to="/login">
                    You have account already?
                  </Link>
                  <button
                    onClick={() => {
                      setIsWaiting(true);
                      props.register(user);
                    }}
                    className="btn btn-success btn-success-dark float-right"
                    disabled={isWaiting}
                  >
                    {/* <RegisterIcon /> */}
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register, clearAuthMsg })(Register);