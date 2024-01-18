import React, { useState } from 'react';
import bglogo from '../../img/Venk_logo.png';
import "./Dcont.css";

function Dleft(){

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };


    return (
        <>
        
        <div style={{fontWeight:"600"}}>
                        <div id="endflex1">
                            {/* sidebar */}

                            <div style={{ marginLeft: "40px", marginTop: "40px" }} onClick={toggleSidebar}>
                                <img src={bglogo} width="50px" height="50px" alt="none" />
                            </div>
                            {!isSidebarCollapsed && (
                                <div style={{ marginTop: "50px", marginLeft: "20px" }}>
                                    <h2 id="ppp" style={{ fontSize: "30px"}}>Meddic</h2>
                                </div>
                            )}
                        </div>

                        <ul id="dashli" type='none' style={{paddingLeft:"15px", paddingTop:"20px"}}>

                            <li>
                                <i className="pi pi-slack sidebaricon"></i>
                                {
                                    !isSidebarCollapsed && (
                                        <span>Dashboard</span>
                                    )
                                }
                            </li>

                            <li>
                                <i className="pi pi-users sidebaricon"></i>
                                {
                                    !isSidebarCollapsed && (
                                        <span>My Team</span>
                                    )
                                }
                            </li>

                            <li>
                                <i className="fa-solid fa-user-doctor sidebaricon"></i>
                                {
                                    !isSidebarCollapsed && (
                                        <span>Doctor Entry</span>
                                    )
                                }
                            </li>
                            <li>
                                <i class="fa-solid fa-wheelchair sidebaricon"></i>
                                {
                                    !isSidebarCollapsed && (
                                        <span>OP Entry</span>
                                    )
                                }
                            </li>
                            
                            <li>
                                <i className="pi pi-globe sidebaricon"></i>
                                {
                                    !isSidebarCollapsed && (
                                        <span>Statistics</span>
                                    )
                                }
                            </li>

                        </ul>

                    </div>
        
        </>
    )
}

export default Dleft;