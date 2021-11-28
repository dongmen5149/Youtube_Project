import React from 'react'
import { FaCode } from "react-icons/fa";
import 'antd/dist/antd.css';

function LandingPage() {
    return (
        <>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>start page</span>
            </div>
            <div style={{ float: 'right' }}>Hello my name is Ryu^^</div>
        </>
    )
}

export default LandingPage
