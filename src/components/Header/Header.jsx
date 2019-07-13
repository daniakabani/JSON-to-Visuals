import React from 'react';
import './Header.scss';

const Header = (props) =>(
    <header id="header">
        <div className="logo">
            <a href="#" onClick={props.click}>back home</a>   
        </div>
    </header>
)

export default Header;