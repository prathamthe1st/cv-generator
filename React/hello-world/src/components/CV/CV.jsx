import React, { useEffect } from 'react'
import './CV.css'



const CV = ({ result }) => {
    useEffect(() => {
        console.log(result)
    })
    return (
        <div className='container'>
            CV
        </div>
    );
};

export default CV