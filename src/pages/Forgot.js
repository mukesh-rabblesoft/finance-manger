import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import { Refresh } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { forgotPassword } from "../redux/actions/authAction";

function Forgot(props) {
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (props.auth && props.auth.msg) {
      if(props.auth.msg ==='Reset link has been sent succesfully'){
        setForgotSuccess(true);
        setIsWaiting(false);
        setTimeout(()=>{
          window.location.href='/login';
        },5000)
      } else {
        setErrorText(props.auth.msg);
        setIsWaiting(false);
      }
    }
  }, [props.auth]);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-5 offset-md-4 col-12">
          <div className="card shadow">
            <div className="card-header text-center">Forgot your password</div>
            <div className="card-body">
              {!forgotSuccess ? (
                <>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Email Id"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {isWaiting && <div>Waiting...</div>}
                  {errorText !== "" && (
                    <div className="text-danger">{errorText}</div>
                  )}
                  <div className="clearfix mt-3">
                    <Link className="btn-link float-left mt-2" to="/login">
                      Return to login
                    </Link>

                    <button
                      onClick={() => {
                          setIsWaiting(true);
                          setErrorText("");
                          props.forgotPassword({ email })
                      }}
                      // type="submit"
                      className="btn btn-success btn-success-dark float-right"
                      disabled={isWaiting}
                    >
                      <Refresh />
                      Reset
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <div className="alert alert-success">
                    Reset password link has been sent, please check your email and
                    follow instruction to reset your account!
                  </div>
                  <div className="text-center">
                    <Link
                      className="btn btn-success btn-success-dark mt-2"
                      to="/login"
                    >
                      Return to login
                    </Link>
                  </div>
                </div>
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

export default connect(mapStateToProps, { forgotPassword })(Forgot);
