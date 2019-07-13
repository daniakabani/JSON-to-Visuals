import React from 'react';
import './Merchants.scss';

const Merchants = (props) => (
    <li onClick={props.clicked}>
        <figure>
            <img src={props.logo} alt="merchant logo"/>
        </figure>
        <h5>{props.name}</h5>
        <h6>{props.address}</h6>
    </li>
)

export default Merchants;