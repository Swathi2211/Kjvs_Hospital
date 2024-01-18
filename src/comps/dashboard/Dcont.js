import React, { useEffect, useState } from 'react';
import bglogo from '../../img/Venk_logo.png';
import "./Dcont.css";
import Dleft from './Dleft';
import Dright from './Dright';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

function Dcont(props) {

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const doctRef = useRef(null);
    const opRef = useRef(null);
    const statRef = useRef(null);
    const teamRef = useRef(null);
    const dashRef = useRef(null);


    const [key, setKey] = useState(0);



    const [activeElement, setActiveElement] = useState(null);

    const scrollToElement = (ref) => {
        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        setActiveElement(ref);
    };

    useEffect(() => {
        // Scroll to dashRef on component mount
        scrollToElement(dashRef);
    }, []); // Empty dependency array means this effect runs only once on mount



    return (
        <>
            <div style={{ backgroundColor: "rgb(238, 238, 238)" }}>


                <div style={{
                    borderRadius: "20px", display: "grid", gridTemplateColumns: isSidebarCollapsed ? "10% 90%" : "18% 82%", boxShadow: "5px 5px 20px 2px rgb(205, 205, 205)", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px", backgroundColor: "white", height
                        : "750px"
                }}>


                    {/* Left SideBar */}
                    <div style={{ fontWeight: "600" }}>
                        <div id="endflex1">
                            {/* sidebar */}

                            <div style={{ marginLeft: "40px", marginTop: "40px" }} onClick={toggleSidebar}>
                                <img src={bglogo} width="50px" height="50px" alt="none" />
                            </div>
                            {!isSidebarCollapsed && (
                                <div style={{ marginTop: "50px", marginLeft: "20px" }}>
                                    <h2 id="ppp" style={{ fontSize: "30px" }}>Kjvs</h2>
                                </div>
                            )}
                        </div>

                        <ul id="dashli" type='none' style={{ paddingLeft: "15px", paddingTop: "20px" }}>

                            <li onClick={() => { scrollToElement(dashRef); }} id={activeElement === dashRef ? "active" : ""}>
                                <i id={activeElement === dashRef ? "active" : ""} className="pi pi-slack sidebaricon"></i>
                                {
                                    !isSidebarCollapsed && (
                                        <span>Dashboard</span>
                                    )
                                }
                            </li>

                            {
                                props.info.job.name === "Doctor" ? (
                                    <>
                                        <Link to={`/dashboard/prescription?fname=${props.info.fname}&lname=${props.info.lname}&id=${props.info.userId}&spl=${props.info.speciality}&phone=${props.info.phone}&email=${props.info.email}`} style={{ color: "black" }}>
                                            <li>
                                                <i className="fa-solid fa-prescription sidebaricon"></i>
                                                {!isSidebarCollapsed && (
                                                    <span>Prescription</span>
                                                )}
                                            </li>
                                        </Link>
                                    </>
                                ) : props.info.job.name === "Front Desk Officer" ? (
                                    <>
                                        <Link to="/dashboard/appointment" style={{ color: "black" }}>
                                            <li>
                                                <i style={{ fontSize: "18px" }} className="fa-solid fa-pen-to-square sidebaricon"></i>
                                                {!isSidebarCollapsed && (
                                                    <span>Appointment</span>
                                                )}
                                            </li>
                                        </Link>
                                    </>
                                ) : (
                                    <></>
                                )
                            }


                            <li id={activeElement === teamRef ? "active" : ""} onClick={() => scrollToElement(teamRef)}>
                                <i id={activeElement === teamRef ? "active" : ""} onClick={() => scrollToElement(teamRef)} style={{ fontSize: "16px" }} class="fa-solid fa-user-group sidebaricon"></i>
                                {
                                    !isSidebarCollapsed && (
                                        <span>My Team</span>
                                    )
                                }
                            </li>

                            <li id={activeElement === doctRef ? "active" : ""} onClick={() => scrollToElement(doctRef)}>
                                <i id={activeElement === doctRef ? "active" : ""} className="fa-solid fa-user-doctor sidebaricon"></i>
                                {
                                    !isSidebarCollapsed && (
                                        <span>Doctor Entry</span>
                                    )
                                }
                            </li>
                            <li id={activeElement === opRef ? "active" : ""} onClick={() => scrollToElement(opRef)}>
                                <i id={activeElement === opRef ? "active" : ""} class="fa-solid fa-wheelchair sidebaricon"></i>
                                {
                                    !isSidebarCollapsed && (
                                        <span>OP Entry</span>
                                    )
                                }
                            </li>

                            <li id={activeElement === statRef ? "active" : ""} onClick={() => scrollToElement(statRef)}>
                                <i id={activeElement === statRef ? "active" : ""} className="pi pi-globe sidebaricon"></i>
                                {
                                    !isSidebarCollapsed && (
                                        <span>Statistics</span>
                                    )
                                }
                            </li>

                        </ul>

                    </div>


                    {/* Right SideBar */}
                    <div>
                        <Dright info={props.info} dashRef={dashRef} teamRef={teamRef} doctRef={doctRef} opRef={opRef} statRef={statRef} />
                    </div>
                </div>


                <div>

                </div>

            </div>
        </>
    )
}

export default Dcont;
