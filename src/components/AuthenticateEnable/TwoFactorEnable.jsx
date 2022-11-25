import React, { Fragment, useEffect, useState } from "react";
import { Container } from "@mui/material";
import './TWoFactorEnable.css';
import { connect } from "react-redux";
import urls from "../../redux/urls";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';



const TwoFactorEnable = (props) => {



    let navigate = useNavigate();

    const [qrImage, setQrImage] = useState([]);
    const [activeVal, setActiveVal] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const loginId = props.auth.user.id;



    let activateDetails = {
        id: loginId,
        twofacr: activeVal
    }

    useEffect(() => {
        if (loginId) {
            qrCodegenrater(loginId)

        }
    }, [props])


    const qrCodegenrater = (loginId) => {

        setIsLoading(true)
        fetch(`${urls.base + urls.QrCode}?id=${loginId}`)
            .then((result) => result.json()).then((qrdata) => {
                if (qrdata) {
                    setQrImage(qrdata.qrcode.image);
                    setIsLoading(false)
                }
            }).catch((error) => {
                console.log(error)
            })

    };





    const acivateUserAccount = () => {

        activateTwoFactUser(activateDetails)
        setActiveVal(activeVal === 1 ? 0 : 1)
    }

    const activateTwoFactUser = (activateDetails) => {
        fetch(`${urls.base + urls.twoFactActive}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(activateDetails)
        }).then((res) => res.json())
            .then((result) => {
                navigate('/login')
            })
            .catch((e) => {
                console.log(e)
            })
    }


    return (
        <Fragment>



            <section className="factor_authencate">
                <Container>
                    <div className="row">
                        {
                            isLoading ? <><div className="loader">
                                <CircularProgress className="loader-spinner" />
                            </div> </> :
                                <>
                                    <div className="qr_code">
                                        <div>
                                            <div className="qr_txt">
                                                <p>Scan Qr Code</p>
                                            </div>
                                            <img src={qrImage} />
                                            <div className="text-center">
                                                <p>Enable Two Factor Authenticate click on button</p>
                                            </div>
                                        </div>


                                        <button type="button" className="text-white btn btn-success font-weight-bold mr-1" onClick={acivateUserAccount} > {activeVal === 1 ? "Enable Authentication" : "Disable Authentication"}</button>

                                    </div>
                                </>
                        }
                    </div>
                </Container>
            </section>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(TwoFactorEnable)