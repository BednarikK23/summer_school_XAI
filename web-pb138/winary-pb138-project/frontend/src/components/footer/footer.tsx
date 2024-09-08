import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import './footer.css';

const Footer = () => {
    return (
        <>
           <footer className="footer">
                <p className="footer__text">
                    Follow us on our social media
                </p>
                <div className="icons">
                    <FacebookIcon />
                    <InstagramIcon />
                    <TwitterIcon />
                </div>
            </footer>
        </>
    );
};

export default Footer;
