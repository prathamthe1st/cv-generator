import React, { useEffect } from 'react'
import Convert from '../converter/convert';
import './CV.css'



const CV = ({ result }) => {
    useEffect(() => {
        console.log(result)
    })
    return (
        <>
        <div className='container'>
            CV
        </div>
        <Convert/>
        </>
    );
};

export default CV