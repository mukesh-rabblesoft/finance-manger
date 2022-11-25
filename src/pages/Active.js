import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { activate } from "../redux/actions/authAction";
import "../css/bootstrap.min.css";

const Active = (props) => {
  let params = useParams();
  let inprocess = 0;
  const [activateStatus, setActivateStatus] = useState(0);
  useEffect(() => {
    if (inprocess === 0) {
      props.activate(params);
      inprocess = 1;
    }
  }, []);
  useEffect(() => {
    setTimeout(()=>{
      if (props.auth.msg === "Account activated successfully") {
        setActivateStatus(1);
        setTimeout(()=>{
          window.location.href='/login';
        },5000)
      } else if (props.auth.msg === "Sorry! given link is expired.") {
        setActivateStatus(2);
      } else if (props.auth.msg === 'Sorry! given activation code is expired.') {
        setActivateStatus(2);
      }
    }, 2000);    
  }, [props.auth]);

  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-5 offset-md-4 col-12">
            <div className="card shadow">
              <div className="card-header text-center">
                Activate your account
              </div>
              <div className="card-body">
                {activateStatus === 0 ? (
                  <div className="alert alert-info">Please wait while we are activating your account!</div>
                ) : activateStatus === 1 ? (
                  <div>
                    <div className="alert alert-success">
                      Your account has been activated. You will be redirect to
                      login page after 5s
                    </div>
                  </div>
                ) : (
                  activateStatus === 2 && (
                    <div>
                      <div className="alert alert-danger">
                        Sorry! This is an expired link. Please email me (shayinm@gmail.com) for more
                        detail.
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

export default connect(mapStateToProps, { activate })(Active);
