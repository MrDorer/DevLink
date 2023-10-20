import React from "react";
import InstagramIcon from '../Assets/InstagramIcon.png'
import FacebookIcon from '../Assets/FacebookIcon.png'
import ThreadIcon from '../Assets/ThreadIcon.png'
import TwitterIcon from '../Assets/TwitterIcon.png'


function Footer() {
    return (
        <>
            <footer className="bg-purple-500 p-4 flex flex-col items-center justify-center z-50   "style={{ backgroundColor: 'rgb(93, 48, 193)' }}>
                <div className=" flex mb-4">
                    <img src={InstagramIcon} alt="Logo" className="h-8 mr-4" />
                    <img src={FacebookIcon} alt="Logo" className="h-8 mr-4" />
                    <img src={TwitterIcon} alt="Logo" className="h-8 mr-4" />
                    <img src={ThreadIcon} alt="Logo" className="h-8 mr-4" />
                </div>
                <div>
                    <p className=" text-white">©2023 X Company Associations | All Rights Reserved</p>
                </div>
            </footer>
        </>
    );

}

export default Footer;