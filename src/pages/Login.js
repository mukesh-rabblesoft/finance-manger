import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import { Login as LoginIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../redux/actions/authAction";
import AuthVerificationForm from "../components/AuthVerification/AuthVarificationForm";

const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [verificationForm, setVerificationForm] = useState(false)
  const [loginForm, setLoginForm] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (props.auth && props.auth.token) {
      if (props.auth.isAuthenticated === true && location.pathname === '/login') {
        window.location.href = '/';
      } else {
        setLoginError("Invalid Login details");
        setWaiting(false)
      }
    }
     else {
       if (props.auth.two_factor_authentication) {
         setVerificationForm(true)
         setLoginForm(false)
       }
     }
  }, [props.auth]);

  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-5 offset-md-4 col-12">

            {
              loginForm ?
                <>
                  <div className="card shadow">
                    <div className="card-header text-center">Login</div>
                    <div className="card-body" ng-init="user={}">
                      {loginError && (
                        <div className="alert alert-warning">
                          Username or password is invalid!
                        </div>
                      )}
                      <form onSubmit={() => {
                        setWaiting(true)
                        props.login({ username, password })
                      }}>
                        <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label">
                            Username <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="clearfix">
                          <Link className="btn-link float-left mt-2" to="/forgot">
                            Forgot password?
                          </Link>

                          <button
                            // type="submit"
                            onClick={() => {
                              setWaiting(true)
                              props.login({ username, password })

                            }
                            }
                            disabled={waiting || username === "" || password === ""}
                            className="btn btn-success btn-success-dark float-right"
                          >
                            <LoginIcon /> &nbsp; {!waiting ? "Login" : "Logging in..."}

                          </button>
                        </div>
                        <div className="mt-3">
                          If you don't have account &nbsp;
                          <Link className="btn-link" to="/register">
                            Register now
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
                :
                null
            }

            {
              verificationForm ? <AuthVerificationForm /> : null
            }

          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
