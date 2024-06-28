import React from 'react';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import 'bootstrap/dist/css/bootstrap.css';

const Footer = () => {
    const [open, setOpen] = useState(false);
    return (
        <footer className="footer">
        <div className="footer-content">
            <a href="https://alzerjawi.com" className="footer-tab" target="_blank" rel="noopener noreferrer">
            Portfolio
            </a>
            <div className="footer-tab" onClick={() => setOpen(!open)}>{open ? 'Close About' : 'About'}</div>
        </div>
        <div className="copyright">© 2023 TaskMang. All rights reserved.</div>
        <Collapse in={open}>
                <div className='footer-tab' id="example-collapse-text"><br></br>
                Welcome to TaskMang - Your Ultimate Task Management Solution!
        Effortlessly organize your daily tasks, boost productivity, and stay on top
        of your to-do list with TaskMang. Our intuitive app provides a seamless
        task management experience, combining powerful features with a
        user-friendly interface. Whether you're a professional aiming for peak
        efficiency or someone looking to enhance personal productivity,
        TaskMang is your go-to solution.
                </div>
        </Collapse>
        </footer>
    );
};

export default Footer;