import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card card-theme-dark shadow budget-container mr-2 printable">
                    <div className="card-body pl-3 pr-3 pt-2">
                        <section id="tableWrapper" className="mt-2 text-center">
                            Page not found
                            <br/>
                            <Link to={`/`}>Home</Link>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
export default NotFound;