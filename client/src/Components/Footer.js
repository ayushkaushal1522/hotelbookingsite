import React from 'react'
import "./Footer.css";


const Footer = () => {

    const year = new Date().getFullYear();
    console.log(year);

    return (
        <footer>
            <div className="footer_container">
                <div className="footr_details_one">
                    <h3><b>Get to Know US</b></h3>
                    <p>About us</p>
                    <p>Careers</p>
                    <p>Press Releases</p>
                    <p>Amazon Cares</p>
                </div>
                <div className="footr_details_one">
                    <h3><b>Connect with Us</b></h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div className="footr_details_one forres">
                    <h3><b>Make Money with Us</b></h3>
                    <p>paisa</p>
                    <p>Rupya</p>
                    <p>Dollar</p>
                </div>
                <div className="footr_details_one forres">
                    <h3><b>Make Money with Us</b></h3>
                    <p>Bank</p>
                    <p>Cash</p>
                    <p>Cheque</p>
                </div>
            </div>
            <div className="lastdetails">
                <p>Conditions of Use & Sale &nbsp; &nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;  © 1996-{year}, Roomie.com, Inc. or its affiliates</p>
            </div>
        </footer>
    )
}

export default Footer