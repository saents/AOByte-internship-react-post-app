import React from 'react';
import './Footer.scss';
import { GithubOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";

const iconStyles = { fontSize: '2.7em', color: '#fcfcfc'}

const Footer = () => {
    return (
        <footer className="footer">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>

            <div className={'links'}>
                <a className='icon_link' rel="noreferrer" target='_blank' href="https://github.com/saents"><GithubOutlined className={'icon'} style={iconStyles}/>Github</a>
                <a className='icon_link' rel="noreferrer" target='_blank' href="https://www.linkedin.com/in/armdev292/"><LinkedinOutlined className={'icon'} style={iconStyles}/>LinkedIn</a>
                <a className='icon_link' rel="noreferrer" target='_blank' href="https://www.instagram.com/mosh_292/"><InstagramOutlined className={'icon'} style={iconStyles}/>Instagram</a>
            </div>
        </footer>
    );
}

export default Footer;
