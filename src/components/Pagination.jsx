import React from 'react';

const Pagination = (props) => (
    <li onClick={props.click} value={props.value}>
        {props.num}
    </li>
)

export default Pagination;