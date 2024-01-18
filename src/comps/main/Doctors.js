import React, { useEffect, useState } from 'react';
import "./Doctors.css";

import axios from 'axios';


function Doctors() {

    let [dis, setDis] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/employee/fetch')
            .then((e) => {
                setDis(e.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    dis = dis.filter((e,k)=> {return e.job.name === "Doctor"});


    const [startIndex, setStartIndex] = useState(0);

    const nextSet = () => {
        setStartIndex((prevIndex) => (prevIndex + 3) % dis.length);
    };

    const prevSet = () => {
        setStartIndex((prevIndex) => (prevIndex - 3 + dis.length) % dis.length);
    };

    return (
        <>
            <h2 style={{ fontSize: "50px", textAlign: "center", color: "rgb(0, 160, 144)", marginTop: "100px" }}>OUR DOCTORS</h2>
            <p style={{ fontSize: "20px", textAlign: "center", marginTop: "0px", marginBottom: "100px" }}>Meet Our Amazing Doctors</p>

            <div style={{ display: "flex", overflow: "hidden", justifyContent: "center", marginBottom: "100px" }}>
                <button style={{ border: "none", backgroundColor: "white", marginTop: "-100px" }} onClick={prevSet}><i className="fa-solid fa-chevron-left" style={{ fontSize: "20px", color: "rgb(0, 160, 144)" }}></i></button>
                {dis.slice(startIndex, startIndex + 3).map((ele, id) => (
                    <div key={id} className="doctor-container" style={{ textAlign: "center", margin: "0 40px" }}>
                        <div className="image-container">
                            <img src={require(`../../profile/${ele.photos}`)} alt="none" width="200px" height="300px" className="doctor-image" />
                            <div id="ftl" className="hover-elements">
                                <div >
                                    <i className="fa-brands fa-facebook-f"></i>
                                </div>
                                <div>
                                    <i className="fa-brands fa-instagram"></i>
                                </div>
                                <div >
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </div>
                            </div>
                        </div>
                        <h2 style={{ marginTop: "15px" }}>{ele.fname} {ele.lname}</h2>
                        <p style={{ marginTop: "-15px" }}>{ele.speciality}</p>
                    </div>
                ))}
                <button style={{ border: "none", backgroundColor: "white", marginTop: "-100px" }} onClick={nextSet}><i className="fa-solid fa-chevron-right" style={{ fontSize: "20px", color: "rgb(0, 160, 144)" }}></i></button>
            </div>
        </>
    );
}

export default Doctors;
