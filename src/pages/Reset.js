import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../redux/actions/authAction";

const Reset = (props) => {
  let params = useParams();
  const [resetStatus, setResetStatus] = useState(0);
  const [user, setUser] = useState({
    new_password: "",
    retype_password: "",
    unique_code: params.unique_code,
  });
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (props.auth && props.auth.msg) {
      if(props.auth.msg ==='Password changed successfully'){
        setResetStatus(1);
        setTimeout(()=>{
          window.location.href='/login';
        },5000)
      } else {
        setErrorText(props.auth.msg);
      }
    }
  }, [props.auth]);

  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-5 offset-md-4 col-12">
            <div className="card shadow">
              <div className="card-header text-center">Reset your password</div>
              <div className="card-body">
                {resetStatus === 0 ? (
                  <form onSubmit={()=>{
                    setErrorText("");
                    props.resetPassword(user);
                  }}>
                    <div className="alert alert-warning">
                      Please input your new password
                    </div>
                    <div className="mb-3">
                      <label htmlFor="ePass1" className="form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="ePass1"
                        required
                        onFocus={()=>{setErrorText("");}}
                        value={user.new_password}
                        onChange={(e) =>
                          setUser({ ...user, new_password: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="ePass2" className="form-label">
                        Retype Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="ePass2"
                        required
                        onFocus={()=>{setErrorText("");}}
                        value={user.retype_password}
                        onChange={(e) =>
                          setUser({ ...user, retype_password: e.target.value })
                        }
                      />
                    </div>
                    {errorText !== "" && (
                      <p className="text-danger"> {errorText}</p>
                    )}
                    <div className="clearfix">
                      <a className="btn-link float-left mt-2" href="/">
                        Return to login
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setErrorText("");
                          props.resetPassword(user);
                        }}
                        className="btn btn-success btn-success-dark float-right"
                        disabled={((user.new_password !== user.retype_password) || (user.new_password ===""))}
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                ) : (
                  resetStatus === 1 && (
                    <div>
                      <div className="alert alert-success">
                        Your password has been update successful! You will be
                        redirected to login page after 5s!
                      </div>
                      <div className="text-center">
                        <a
                          className="btn btn-success btn-success-dark mt-2"
                          href="/"
                        >
                          Login now
                        </a>
                      </div>
                    </div>
                  )
                )}
              </div>
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

export default connect(mapStateToProps, { resetPassword })(Reset);
