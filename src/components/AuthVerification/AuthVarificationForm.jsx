import React, { Fragment, useEffect, useState } from "react";
import { Login as LoginIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import './AuthVerification.css';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import urls from "../../redux/urls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from "react-redux";
import { LOGIN_FAIL, SET_TOKEN } from "../../redux/types";


const AuthVerificationForm = (props) => {


console.log("hello authenticate",props)


    const dispatch = useDispatch();
    const [verification, setVerification] = useState("");
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    const loginId = props.auth.user.id;


    let data = {
        id: loginId,
        otp: verification
    }

    const verifiedCode = (e) => {
        e.preventDefault()
        veriFication(data)
        setIsLoading(true)
    }

    const veriFication = (data) => {
        console.log(data);

        fetch(`${urls.base + urls.verificationCode}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                dispatch({
                    type: SET_TOKEN,
                    payload: result
                })
                if (result && location.pathname === '/login') {
                    setIsLoading(false)
                    if (result.two_factor_authentication) {
                        fetch(`${urls.base + urls.profile}`, {
                            method: "GET",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: result.token,
                            },
                        }).then((res) => res.json())
                          .then((result) => {
                                if (result) {
                                    let factorAuth = {
                                        user: result,
                                        token: result.token
                                    }
                                    dispatch({
                                        type: LOGIN_FAIL,
                                        payload: factorAuth,
                                    });
                                    window.location.href = '/';
                                }
                            }).catch((e) => {
                                console.log(e)
                            })
                    }
                }

            }).catch((e) => {
                console.log(e)
            })

    };






    return (
        <Fragment>
            <div className="card shadow">
                <div className="card-header text-center">Verification </div>

                {
                    isLoading ? <>
                        <div className="loader">
                            <CircularProgress className="loader-spinner" />
                        </div>

                    </>
                        :

                        <>

                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Two Factor Authentication<span className="text-danger"> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            value={verification}
                                            onChange={(e) => setVerification(e.target.value)}
                                        />
                                    </div>

                                    <div className="clearfix">
                                        <button
                                            onClick={verifiedCode}
                                            className="btn btn-success btn-success-dark float-right"
                                        >
                                            <LoginIcon /> Continue
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </>
                }


            </div>
            <ToastContainer />

        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AuthVerificationForm);
