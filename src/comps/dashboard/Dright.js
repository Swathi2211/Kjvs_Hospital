import React, { useEffect, useRef } from 'react';
import { Badge } from 'primereact/badge';
import blue from "../../img/Doc1.jpg";
import { InputTextarea } from "primereact/inputtextarea";

import "./Dcont.css";
import { useState } from 'react';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Link } from 'react-router-dom';
import axios from 'axios';
import DAttenList from './doctAttList';
import OpAttList from './opAttList';
import { Calendar } from 'primereact/calendar';
import Leave from '../edit/leave';
import { Toast } from 'primereact/toast';

import ad2 from "../../img/ad2.jpg";
import ad6 from "../../img/ad6.jpg";
import ad7 from "../../img/ad7.jpg";
import ad10 from "../../img/ad10.jpg";
import ad11 from "../../img/ad11.jpg";
import ad12 from "../../img/ad4.jpg";
import ad5 from "../../img/ad5.jpg";
import Stat from './stat';






function Dright(props) {


    const docRef = useRef(null);
    const nurRef = useRef(null);
    const patRef = useRef(null);



    const [visibleMap, setVisibleMap] = useState({});

    const [pat, setPat] = useState([]);

    const [dis, setDis] = useState([]);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const docCleanup = startCountdown(docRef, setDocCount, dis.filter((e) => e.job.name === "Doctor").length);
        const nurCleanup = startCountdown(nurRef, setNurCount, dis.filter((e) => e.job.name === "Front Desk Officer").length);
        const patCleanup = startCountdown(patRef, setPatCount, pat.length);

        return () => {
            docCleanup();
            nurCleanup();
            patCleanup();
        };
    }, [dis, pat.length]);


    useEffect(() => {
        axios.get('http://localhost:8080/employee/fetch')
            .then((e) => {
                setDis(e.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get('http://localhost:8080/appoint/fetch')
            .then((e) => {
                setPat(e.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let doc = dis.filter((item) => item.userId !== props.info.userId);


    const [yes, setYes] = useState(false);

    function clickYes() {
        setYes(!yes);
    }





    const [docCount, setDocCount] = useState(0);
    const [nurCount, setNurCount] = useState(0);
    const [patCount, setPatCount] = useState(0);

    const startCountdown = (ref, setCount, initialValue) => {
        let count = initialValue;

        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount === initialValue) {
                    clearInterval(interval);
                    return initialValue; // Stop at the specified count
                }
                return prevCount + 1;
            });
        }, 5); // Increase the interval to 1000ms for better visibility

        // Cleanup the interval on unmount or when ref changes
        return () => clearInterval(interval);
    };



    const info = [
        {
            ic: "fa-solid fa-stethoscope",
            occ: "Doctors",
            count: docCount,
            title: "They care for your health",
            clr: "rgba(213, 91, 247, 0.7)"
        },
        {
            ic: "fa-solid fa-user-nurse",
            occ: "Nurses",
            count: nurCount,
            title: "Your health in their care",
            clr: "rgba(91, 114, 247, 0.6)"
        },
        {
            ic: "fa-solid fa-shield",
            occ: "Patients",
            count: patCount,
            title: "Living with good health",
            clr: "rgba(91, 247, 146, 0.868)"
        },
    ]


    function getCurrentDate() {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const currentDate = new Date();
        const day = addDaySuffix(currentDate.getDate());
        const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
        const year = currentDate.getFullYear();

        return `${day} ${month} ${year}`;
    }

    // Function to add suffix to day
    function addDaySuffix(day) {
        if (day >= 11 && day <= 13) {
            return `${day}th`;
        }
        switch (day % 10) {
            case 1:
                return `${day}st`;
            case 2:
                return `${day}nd`;
            case 3:
                return `${day}rd`;
            default:
                return `${day}th`;
        }
    }

    const formattedDate = getCurrentDate();

    const [entryTime, setEntry] = useState({
        name: props.info.fname + " " + props.info.lname,
        userId: props.info.userId,
        in_time: null,
        out_time: null
    });

    const [log, setLog] = useState(false);

    function openModal(message) {
        document.getElementById('modal-message').innerText = message;
        document.getElementById('overlay').style.display = 'flex';
    }

    function closeModal() {
        document.getElementById('overlay').style.display = 'none';
    }

    const handleAttendance = () => {

        setLog(!log);
        if (!log) {
            setEntry({ ...entryTime, in_time: new Date().toLocaleTimeString() });
            alert("Logged-In Successfully...");
        } else {
            setEntry({ ...entryTime, out_time: new Date().toLocaleTimeString() });
            alert("Logged-Out Successfully...");
        }

    }

    const sendAttendance = (obj) => {
        axios.post('http://localhost:8080/attend/add', obj)
            .then((res) => {
                console.log("Successfully Added");

            })
            .catch((err) => {
                console.log("");
            });
    }




    useEffect(() => {

        if (entryTime.out_time !== null) {
            const attendObj = { ...entryTime };
            sendAttendance(attendObj);
            setEntry({ in_time: null, out_time: null });
        }


    }, [entryTime]);



    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Clicked outside the element

                setYes(false);
            }
        };

        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const [leaveVisible, setLeaveVisible] = useState(false);
    const [dates, setDates] = useState(null);
    const [reason, setReason] = useState('');

    const handleLeaveDialogHide = () => {
        setLeaveVisible(false);
        // Additional logic to handle the submitted data if needed
    };

    const handleLeaveSubmission = () => {
        // Handle the leave submission logic here
        console.log("Dates:", dates);
        console.log("Reason:", reason);
        // You might want to make an API call or update the state accordingly
        handleLeaveDialogHide();
    };

    useEffect(() => {

    }, [leaveVisible]);

    // console.log(props.info.job.name);

    // Assuming you have the user's email in the variable user.email
    const userEmail = props.info.email;

    // Construct the Outlook URL with the user's email
    const outlookUrl = `https://outlook.com/mail/${userEmail}`;

    const toast = useRef(null);

    const showSuccessMessage = () => {
        toast.current.show({ severity: 'success', summary: 'Signed-in', detail: 'Successfully', life: 3000 });

    };

    const handleUpdate = (id) => {

        showSuccessMessage1();

        axios.delete(`http://localhost:8080/employee/remove/${id}`)
            .then((res) => {
                console.log("Successfully Updated");
            })
            .catch((err) => {
                console.log(err);
            });

        back();

    };

    function back() {
        // Reload the page after 1000ms (1 second)
        setTimeout(() => {
            window.location.reload();
        }, 500);

    }

    const toast1 = useRef(null);

    const showSuccessMessage1 = () => {
        toast1.current.show({ severity: 'error', summary: 'Fired', detail: 'Successfully', life: 10000 });
    };

    const [filterValue, setFilterValue] = useState('');
    const [fil, setFil] = useState(false);

    const filteredDoc = doc.filter((ele) =>
        ele.fname.toLowerCase().includes(filterValue.toLowerCase())
    );


    return (
        <>

            <div style={{ backgroundColor: "rgb(250, 250, 250)", borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}>
                <div style={{ marginTop: "5px", height: "735px", overflowY: "scroll" }}>

                    <div>
                        <div ref={props.dashRef} style={{ padding: "50px", display: "grid", gridTemplateColumns: "70% 30%", marginTop: "-15px", marginBottom: "30px" }} id="endflex2">


                            <div>
                                <h2>Dashboard</h2>
                                <p style={{ marginTop: "-15px" }}>{formattedDate}</p>
                            </div>


                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>



                                <a id="dashLink" href={outlookUrl} target="_blank" rel="noopener noreferrer">
                                    <div className='badge' style={{}}>
                                        <i className="pi pi-comment p-overlay-badge" style={{ fontSize: "15px", color: "grey" }}>
                                            <Badge severity="success"></Badge>
                                        </i>
                                    </div>
                                </a>


                                {/* ${JSON.stringify(props.info)} */}

                                <Link to={`/dashboard/notification?info=${props.info.userId}`}>
                                    <button style={{ backgroundColor: "transparent" }} className='badge'>
                                        <i id="hov" className="pi pi-bell p-overlay-badge" style={{ fontSize: "15px", color: "grey", top: "2px"}}>
                                            <Badge severity="success"></Badge>
                                        </i>
                                    </button>
                                </Link>


                                <button ref={dropdownRef} onClick={clickYes} id="self" style={{ display: "flex", marginTop: "-8px", height: "60px", border: "none", backgroundColor: "rgb(250, 250, 250)", textAlign: "left" }}>
                                    <div>
                                        <img src={require(`../../profile/${props.info.photos}`)} alt="none" width="50px" height="50px" style={{ borderRadius: "100%" }} />
                                    </div>
                                    <div style={{ marginLeft: "15px" }}>
                                        <h3 id="mons" style={{ fontSize: "16px" }}>{props.info.fname} {props.info.lname}</h3>
                                        <p id="barlow" style={{ marginTop: "-10px" }}>{props.info.job.name}</p>
                                    </div>
                                    {
                                        yes && (
                                            <ul type="none" id="profile" style={{ position: "absolute", marginTop: "35px", marginLeft: "5px", left: "1290px" }}>
                                                <li style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                                                    <Link to={`/dashboard/profile?info=${JSON.stringify(props.info)}`}>
                                                        <button>
                                                            <p><i style={{ marginRight: "15px" }} className='pi pi-user'></i>Profile</p>
                                                        </button>
                                                    </Link>
                                                </li>

                                                <li style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                                                    <button onClick={() => {
                                                        setLeaveVisible(true);
                                                        window.location.href = `/dashboard/leave?info=${JSON.stringify(props.info)}`;
                                                    }}>
                                                        <p><i style={{ marginRight: "15px" }} className='pi pi-user'></i><i style={{ position: "absolute", top: "80px", left: "15px" }} class="fa-solid fa-xmark"></i>Apply Leave</p>
                                                    </button>




                                                </li>
                                                <li style={{ backgroundColor: "rgb(250, 250, 250)" }}>

                                                    <Toast id="lvToast" ref={toast} />

                                                    <button onClick={handleAttendance}>
                                                        {log ? (
                                                            <i style={{ marginRight: "15px" }} className='pi pi-sign-out'></i>
                                                        ) : (
                                                            <i style={{ marginRight: "15px" }} className='pi pi-sign-in'></i>
                                                        )}
                                                        {log ? "Logout" : "Login"}
                                                    </button>
                                                </li>

                                            </ul>
                                        )
                                    }
                                </button>





                            </div>



                        </div>



                        <div style={{ display: "flex" }}>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "800px", marginTop: "-30px", marginLeft: "45px" }}>

                                    {
                                        info.map((ele, id) => {
                                            return (
                                                <div key={id} style={{ backgroundColor: ele.clr, height: "140px", width: "240px", padding: "30px", borderRadius: "20px" }}>

                                                    <h5 style={{
                                                        marginTop: "-10px", textAlign: "center",
                                                        marginLeft: "-20px", marginBottom: "10px"
                                                    }}><i style={{ borderRadius: "100%", padding: "5px", backgroundColor: "rgb(250, 250, 250,0.6)", marginRight: "7px" }} class={ele.ic}></i>{ele.occ}</h5>
                                                    <p id="barlow" style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center" }}>{ele.count}</p>
                                                    <p style={{ fontSize: "13px", textAlign: "center", marginTop: "8px" }}>{ele.title}</p>
                                                </div>
                                            )
                                        })
                                    }

                                </div>

                                <div ref={props.teamRef} style={{ marginTop: "50px", marginLeft: "50px", backgroundColor: "white", width: "800px", padding: "50px", borderRadius: "20px" }}>
                                    <div style={{ display: "flex", width: "700px", justifyContent: "space-between", marginBottom: "20px" }}>
                                        <h2>My Team</h2>
                                        <input style={{ width: "250px", height: "35px", padding: "15px", border: "1px solid rgb(33, 147, 213)" }}
                                            type="text"
                                            value={filterValue}
                                            onChange={(e) => { setFil(true); setFilterValue(e.target.value); }}
                                            placeholder="Search by name"
                                        />
                                    </div>

                                    {
                                        !fil && (
                                            <div className='example' style={{ height: "500px", overflowY: "scroll" }}>
                                                {
                                                    doc.map((ele, id) => {
                                                        return (
                                                            <div>

                                                                <button id="empShow" onClick={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [id]: !prevVisibleMap[id] }))} style={{ display: "flex", marginBottom: "20px", borderRadius: "10px", padding: "5px", paddingLeft: "15px", border: "none", width: "100%", textAlign: "left" }}>
                                                                    <div>
                                                                        <img src={require(`../../profile/${ele.photos}`)} alt="none" width="50px" height="50px" style={{ borderRadius: "100%" }} />
                                                                    </div>
                                                                    <div style={{ marginLeft: "15px", width: "580px" }}>
                                                                        <h3 id="mons" style={{ fontSize: "14px" }}>{ele.fname} {ele.lname}</h3>
                                                                        <p id="barlow" style={{ marginTop: "-10px", fontSize: "13px" }}>{ele.job.name}</p>
                                                                    </div>
                                                                    <i style={{
                                                                        fontSize: "20px", marginTop: "17px",
                                                                        color: "grey"
                                                                    }} class="fa-solid fa-angle-right" ></i>
                                                                </button>

                                                                <Toast className="delToast" id="apToast" ref={toast1} />
                                                                <Dialog style={{ backgroundColor: "white", width: "600px", height: "260px", paddingLeft: "20px" }} visible={visibleMap[id]} onHide={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [id]: false }))}>
                                                                    <div style={{ display: "flex", width: "580px" }}>
                                                                        <div >
                                                                            <img style={{ border: "1px solid black" }} src={require(`../../profile/${ele.photos}`)} alt="none" width="200px" height="200px" />
                                                                        </div>
                                                                        <div style={{ padding: "15px" }}>
                                                                            <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "80px" }}>Name</span>{ele.fname} {ele.lname}</p>
                                                                            <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "70px" }}>User Id</span>{ele.userId}</p>
                                                                            <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "22px" }}>Blood Group</span> {ele.blood.name}</p>
                                                                            {
                                                                                ele.job.name === "Doctor" ? (
                                                                                    <div>
                                                                                        <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "42px" }}>Proffesion</span> {ele.speciality}</p>
                                                                                    </div>
                                                                                ) : (
                                                                                    <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "90px" }}>Role</span>{ele.job.name}</p>
                                                                                )
                                                                            }
                                                                            <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "82px" }}>Email</span><a href={`mailto:${ele.email}`}>{ele.email}</a>
                                                                            </p>

                                                                            <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "75px" }}>Phone</span><a href={`tel:${ele.phone}`}>{ele.phone}</a>
                                                                            </p>

                                                                            {
                                                                                props.info.job.name === "HR" && (
                                                                                    <button onClick={() => {
                                                                                        handleUpdate(ele._id);
                                                                                        setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [id]: false }));
                                                                                    }} className='crosClass' id="cros" style={{ marginTop: "22.5px", marginLeft: "322px", borderTopRightRadius: "0px" }} >Fire</button>
                                                                                )
                                                                            }


                                                                        </div>
                                                                    </div>

                                                                </Dialog>

                                                            </div>
                                                        )

                                                    })


                                                }
                                            </div>
                                        )
                                    }





                                    {
                                        fil && (
                                            <div className='example' style={{ height: "500px", overflowY: "scroll" }}>
                                                {
                                                    filteredDoc.map((ele, id) => {
                                                        return (
                                                            <div>

                                                                <button id="empShow" onClick={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [id]: !prevVisibleMap[id] }))} style={{ display: "flex", marginBottom: "20px", borderRadius: "10px", padding: "5px", paddingLeft: "15px", border: "none", width: "100%", textAlign: "left" }}>
                                                                    <div>
                                                                        <img src={require(`../../profile/${ele.photos}`)} alt="none" width="50px" height="50px" style={{ borderRadius: "100%" }} />
                                                                    </div>
                                                                    <div style={{ marginLeft: "15px", width: "580px" }}>
                                                                        <h3 id="mons" style={{ fontSize: "14px" }}>{ele.fname} {ele.lname}</h3>
                                                                        <p id="barlow" style={{ marginTop: "-10px", fontSize: "13px" }}>{ele.job.name}</p>
                                                                    </div>
                                                                    <i style={{
                                                                        fontSize: "20px", marginTop: "17px",
                                                                        color: "grey"
                                                                    }} class="fa-solid fa-angle-right" ></i>
                                                                </button>

                                                                <Toast className="delToast" id="apToast" ref={toast1} />
                                                                <Dialog style={{ backgroundColor: "white", width: "600px", height: "260px", paddingLeft: "20px" }} visible={visibleMap[id]} onHide={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [id]: false }))}>
                                                                    <div style={{ display: "flex", width: "580px" }}>
                                                                        <div >
                                                                            <img style={{ border: "1px solid black" }} src={require(`../../profile/${ele.photos}`)} alt="none" width="200px" height="200px" />
                                                                        </div>
                                                                        <div style={{ padding: "15px" }}>
                                                                            <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "80px" }}>Name</span>{ele.fname} {ele.lname}</p>
                                                                            <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "70px" }}>User Id</span>{ele.userId}</p>
                                                                            <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "22px" }}>Blood Group</span> {ele.blood.name}</p>
                                                                            {
                                                                                ele.job.name === "Doctor" ? (
                                                                                    <div>
                                                                                        <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "42px" }}>Proffesion</span> {ele.speciality}</p>
                                                                                    </div>
                                                                                ) : (
                                                                                    <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "90px" }}>Role</span>{ele.job.name}</p>
                                                                                )
                                                                            }
                                                                            <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "82px" }}>Email</span><a href={`mailto:${ele.email}`}>{ele.email}</a>
                                                                            </p>

                                                                            <p style={{ margin: "5px" }}><span style={{ fontWeight: "bold", marginRight: "75px" }}>Phone</span><a href={`tel:${ele.phone}`}>{ele.phone}</a>
                                                                            </p>

                                                                            {
                                                                                props.info.job.name === "HR" && (
                                                                                    <button onClick={() => {
                                                                                        handleUpdate(ele._id);
                                                                                        setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [id]: false }));
                                                                                    }} className='crosClass' id="cros" style={{ marginTop: "22.5px", marginLeft: "322px", borderTopRightRadius: "0px" }} >Fire</button>
                                                                                )
                                                                            }


                                                                        </div>
                                                                    </div>

                                                                </Dialog>

                                                            </div>
                                                        )

                                                    })


                                                }
                                            </div>
                                        )
                                    }






                                    {props.info.job.name === "HR" && <Link to="/dashboard/add$Employee">
                                        <button id="addEmpbtn" style={{ width: "100%", padding: "15px", borderRadius: "10px", marginTop: "10px" }}><i class="fa-solid fa-plus" style={{ padding: "7px", backgroundColor: "white", color: "grey", borderRadius: "100%", marginRight: "10px" }}></i>Add more employee</button>
                                    </Link>



                                    }



                                </div>

                                <div ref={props.doctRef} style={{ marginTop: "50px", marginLeft: "50px", backgroundColor: "white", width: "800px", padding: "50px", borderRadius: "20px" }}>

                                    <h2 style={{ margin: "10px", marginBottom: "40px", marginTop: "-10px" }}>Doctor Entry</h2>

                                    <div style={{ display: "flex", width: "400px", justifyContent: "space-between", marginBottom: "20px" }}>
                                        <DAttenList />
                                    </div>

                                </div>


                                <div ref={props.opRef} style={{ marginTop: "50px", marginLeft: "50px", backgroundColor: "white", width: "800px", padding: "50px", borderRadius: "20px" }}>

                                    <h2 style={{ margin: "10px", marginBottom: "40px", marginTop: "-10px" }}>OP Entry</h2>

                                    <div style={{ display: "flex", width: "400px", justifyContent: "space-between", marginBottom: "20px" }}>

                                        <OpAttList />
                                    </div>

                                </div>

                                <div ref={props.statRef} style={{ marginTop: "50px", marginLeft: "50px", backgroundColor: "white", width: "800px", padding: "50px", borderRadius: "20px", marginBottom:"30px" }}>

                                    <h2 style={{ margin: "10px", marginBottom: "40px", marginTop: "-10px", marginLeft:"20px" }}>Statistics</h2>

                                    <Stat work={props.info.userId} />
                                </div>


                            </div>


                            <div style={{ marginTop: "-60px", overflowX: "hidden" }}>
                                <img style={{ margin: "40px" }} src={ad2} alt="none" width="300px" height="300px" />
                                <img style={{ margin: "40px" }} src={ad6} alt="none" width="300px" height="300px" />
                                <img style={{ margin: "40px" }} src={ad7} alt="none" width="300px" height="300px" />
                                <img style={{ margin: "40px" }} src={ad11} alt="none" width="300px" height="300px" />
                                <img style={{ margin: "40px" }} src={ad12} alt="none" width="300px" height="300px" />
                                <img style={{ margin: "40px" }} src={ad5} alt="none" width="300px" height="300px" />
                                <img style={{ margin: "40px" }} src={ad10} alt="none" width="300px" height="300px" />

                            </div>
                        </div>
                    </div>




                </div>

            </div>

        </>
    )
}

export default Dright;