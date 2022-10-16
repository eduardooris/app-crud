import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css'


const Loading = ({ type, color, height, width }) => (
    <div className='loading'>
        <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
);
 
export default Loading;