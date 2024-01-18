import React, { useEffect, useState, useRef } from "react";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import TimePicker from "react-time-picker";
import "react-clock/dist/Clock.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";


import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import "../appointment/appCont.css";

import doc from "../../img/doc_all.jpg";
import axios from "axios";

function AppCont() {

    const [reqd, setReqd] = useState({
        name: false,
        dob: false,
        phone: false,
        email: false,
        cov: false,
        time: false,
        date: false,
        handle: true
    });

    const [count, setCount] = useState(0);





    const [app, setApp] = useState({});

    const [name, setName] = useState('');
    const [ph, setPh] = useState('');
    const [email, setEmail] = useState('');
    const [cause, setCause] = useState(null);
    const [birth, setBirth] = useState(null);
    const [date, setDate] = useState(null);
    const [doc1, setDoc] = useState('');
    const [docAval, setAval] = useState([]);
    const [dis, setDis] = useState([]);




    const prob = [
        { name: 'Fever', code: 'FV' },
        { name: 'Allergic', code: 'AL' },
        { name: 'Diarrhea', code: 'DR' },
        { name: 'Headache', code: 'HD' },
        { name: 'Other', code: 'OT' },
        { name: 'Cough', code: 'CO' },
        { name: 'Cold', code: 'CLD' },
        { name: 'Flu', code: 'FLU' },
        { name: 'Sore Throat', code: 'ST' },
        { name: 'Sinusitis', code: 'SIN' },
        { name: 'Back Pain', code: 'BP' },
        { name: 'Joint Pain', code: 'JP' },
        { name: 'Muscle Strain', code: 'MS' },
        { name: 'Insomnia', code: 'IN' },
        { name: 'Anxiety', code: 'ANX' },
        { name: 'Depression', code: 'DEP' },
        { name: 'Stomachache', code: 'SA' },
        { name: 'Indigestion', code: 'IND' },
        { name: 'Constipation', code: 'CON' },
        { name: 'Heartburn', code: 'HB' },
        { name: 'Hypertension', code: 'HTN' },
        { name: 'Type 2 Diabetes', code: 'T2D' },
        { name: 'Migraine', code: 'MIG' },
        { name: 'Asthma', code: 'AS' },
        { name: 'Eczema', code: 'ECZ' },
        { name: 'Acne', code: 'ACN' },
        { name: 'Allergic Rhinitis', code: 'AR' },
        { name: 'Osteoarthritis', code: 'OA' },
        { name: 'Rheumatoid Arthritis', code: 'RA' },
        { name: 'Osteoporosis', code: 'OP' },
        { name: 'Hypothyroidism', code: 'HYT' },
        { name: 'Hyperthyroidism', code: 'HYP' },
        { name: 'Urinary Tract Infection', code: 'UTI' },
        { name: 'Kidney Stones', code: 'KS' },
        { name: 'Gout', code: 'GT' },
        { name: 'Chronic Obstructive Pulmonary Disease (COPD)', code: 'COPD' },
        { name: 'Irritable Bowel Syndrome (IBS)', code: 'IBS' },
        { name: 'Inflammatory Bowel Disease (IBD)', code: 'IBD' },
        { name: 'Multiple Sclerosis', code: 'MS' },
        { name: 'Parkinson\'s Disease', code: 'PD' },
        { name: 'Alzheimer\'s Disease', code: 'AD' },
        { name: 'Celiac Disease', code: 'CD' },
        { name: 'Chronic Fatigue Syndrome', code: 'CFS' },
        { name: 'Fibromyalgia', code: 'FM' },
        { name: 'Endometriosis', code: 'ENDO' },
        { name: 'Polycystic Ovary Syndrome (PCOS)', code: 'PCOS' },
        { name: 'Atrial Fibrillation', code: 'AF' },
        { name: 'Chronic Kidney Disease', code: 'CKD' },
        { name: 'Cirrhosis', code: 'CIR' },
        { name: 'Epilepsy', code: 'EP' },
        { name: 'Hernia', code: 'HER' },
        { name: 'Sciatica', code: 'SC' },
        { name: 'Hemorrhoids', code: 'HEM' },
        { name: 'Ovarian Cyst', code: 'OC' },
        { name: 'Gallstones', code: 'GS' },
        { name: 'Tinnitus', code: 'TIN' },
        { name: 'Vertigo', code: 'VER' },
        { name: 'Tonsillitis', code: 'TON' },
        { name: 'Plantar Fasciitis', code: 'PF' },
        { name: 'Bursitis', code: 'BUR' },
        { name: 'Shingles', code: 'SHI' },
        { name: 'Diverticulitis', code: 'DIV' },
        { name: 'Rotator Cuff Injury', code: 'RCI' },
        { name: 'Interstitial Cystitis', code: 'IC' },
        { name: 'Menopause', code: 'MEN' },
        { name: 'Erectile Dysfunction', code: 'ED' },
        { name: 'Varicose Veins', code: 'VV' },
        { name: 'Psoriasis', code: 'PSO' },
        { name: 'Lupus', code: 'LUP' },
        { name: 'Hemophilia', code: 'HEMO' },
    ];


    useEffect(() => {

    }, [app]);


    const sendAppointData = (appObj) => {
        axios.post('http://localhost:8080/appoint/add', appObj)
            .then((res) => {
                console.log("Successfully Added");


            })
            .catch((err) => {
                console.log("");
            });
        showSuccessMessage();
        setTimeout(() => {
            window.location.reload();
        }, 500);
        alert("Appointment Made Successfully");
    };


    const handleClickSubmit = () => {
        if (reqd.time && reqd.date) {
            const appObj = {
                ...app,
                name: name,
                dob: birth.toLocaleDateString(),
                phone: ph,
                email: email,
                cause: cause,
                date: date.toLocaleDateString(),
                time: selectedTime,
                doctor: doc1
            };




            setApp(appObj);

            sendAppointData(appObj);

            setShowPopup(false);
            setName('');
            setPh('');
            setEmail('');
            setCause(null);
            setBirth(null);
            setDate(null);
            setDoc('');
            setSelectedTime(new Date());
            setShowPopup(false);

            resetReqd();
        } else {
            setReqd((prev) => ({
                ...prev,
                handle: false
            }));
        }
    };

    const resetReqd = () => {
        setReqd((prev) => ({
            ...prev,
            name: false,
            dob: false,
            phone: false,
            email: false,
            cov: false,
            time: false,
            date: false,
            handle: true
        }));

        setCount(0);
    }


    const [selectedTime, setSelectedTime] = useState(new Date());

    const [showPopup, setShowPopup] = useState(false);

    const docOpt = [
        { speciality: 'General Practitioner', dis: ['DR', 'OT', 'CLD'] },
        { speciality: 'Allergist', dis: ['AL', 'AR'] },
        { speciality: 'Gastroenterologist', dis: ['DR', 'SA', 'IND', 'CON', 'HB', 'CD', 'CFS', 'DIV', 'HEM', 'GS'] },
        { speciality: 'Neurologist', dis: ['HD', 'MIG', 'MS', 'PD', 'AD', 'EP', 'VER'] },
        { speciality: 'Pulmonologist', dis: ['CO', 'CLD', 'AS', 'COPD', 'FV'] },
        { speciality: 'Orthopedic Specialist', dis: ['BP', 'SC', 'PF', 'BUR', 'RCI'] },
        { speciality: 'Rheumatologist', dis: ['JP', 'MS', 'RA', 'GT', 'OA', 'FM', 'LUP'] },
        { speciality: 'Sleep Specialist', dis: ['IN'] },
        { speciality: 'Psychiatrist', dis: ['ANX', 'DEP'] },
        { speciality: 'Cardiologist', dis: ['HTN', 'AF'] },
        { speciality: 'Endocrinologist', dis: ['T2D', 'OP', 'HYT', 'HYP'] },
        { speciality: 'Infectious Disease Specialist', dis: ['FLU'] },
        { speciality: 'Dermatologist', dis: ['ECZ', 'ACN', 'SHI', 'PSO'] },
        { speciality: 'Urologist', dis: ['UTI', 'KS', 'GT', 'ED', 'IC'] },
        { speciality: 'Nephrologist', dis: ['CKD'] },
        { speciality: 'Hepatologist', dis: ['CIR'] },
        { speciality: 'Gynecologist', dis: ['ENDO', 'PCOS', 'MEN'] },
        { speciality: 'ENT Specialist', dis: ['TIN', 'ST', 'SIN', 'TON'] },
        { speciality: 'Vascular Surgeon', dis: ['VV'] },
        { speciality: 'Hematologist', dis: ['HEMO'] },
    ];



    useEffect(() => {

        axios.get('http://localhost:8080/employee/fetch')

            .then((e) => {
                setDis(e.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [cause]);

    function sendSpl(speciality) {
        const filteredDoctors = dis.filter((doctor) => doctor.speciality === speciality);

        // Assuming you want to display the names of doctors with the selected specialty
        const doctorNames = filteredDoctors.map((doctor) => `${doctor.fname} ${doctor.lname}`);

        setAval(doctorNames);
        console.log(doctorNames); // Adjust this based on your requirement
    }



    const toast = useRef(null);

    const showSuccessMessage = () => {
        toast.current.show({ severity: 'success', summary: 'Signed-in', detail: 'Successfully', life: 3000 });

    };

    let maxDate = new Date();

    return (
        <div style={{ height: "800px" }}>

            <img src={doc} alt="none" width="100%" height="800px" />

            <div style={{ position: "relative", zIndex: "200px", backgroundColor: "rgba(20, 167, 142, 0.453)", width: "100%", height: "800px", top: "-805px" }}></div>



            <div style={{ fontSize: "15px", backgroundColor: "white", position: "absolute", top: "150px", left: "380px", width: "775px", height: "700px", padding: "70px", marginBottom: "0px" }}>
                <p style={{ fontFamily: "monospace", fontSize: "18px", color: "rgba(20, 167, 142)", marginTop: "20px" }}>APPOINTMENT</p>
                <p id="mons" style={{ fontSize: "35px", marginTop: "20px", marginBottom: "10px", marginLeft: "-4px" }}>Book Your Appointment</p>
                <p style={{ marginBottom: "50px" }}>We will provide you with the best medical service</p>

                <div style={{ display: "flex" }}>
                    <label style={{ width: "100px" }} htmlFor="name" className="font-bold block mb-2">Your Name
                        {
                            (!reqd.handle && !reqd.name) && (
                                <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                            )
                        }</label><br />
                    <InputText style={{ width: "300px", height: "30px", padding: "20px", marginTop: "30px", marginBottom: "20px", marginLeft: "-100px" }} value={name} onChange={(e) => {
                        setName(e.target.value);
                        setReqd((prev) => ({
                            ...prev,
                            name: true,
                        }));
                        setCount((prev) => prev + 1);
                    }} placeholder="John Doe" />
                    <label style={{ marginLeft: "30px", marginTop: "2px" }} htmlFor="email" className="font-bold block mb-2">Date of Birth{
                        (!reqd.handle && !reqd.dob) && (
                            <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                        )
                    }</label>
                    <Calendar style={{ width: "278px", height: "40px", marginTop: "31px", marginLeft: "-83px" }} value={birth} onChange={(e) => {
                        setBirth(e.value);
                        setReqd((prev) => ({
                            ...prev,
                            dob: true,
                        }));
                        setCount((prev) => prev + 1);
                    }} maxDate={maxDate} />
                </div>

                <div className="appFont" style={{ display: "flex", marginBottom: "10px" }}>
                    <label htmlFor="phone" className="font-bold block mb-2">Phone
                        {
                            (!reqd.handle && !reqd.phone) && (
                                <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                            )
                        }</label>
                    <InputMask style={{ width: "300px", height: "30px", padding: "20px", marginTop: "30px", marginBottom: "20px", marginLeft: "-42px" }} id="phone" value={ph} onChange={(e) => {
                        setPh(e.target.value);
                        setReqd((prev) => ({
                            ...prev,
                            phone: true,
                        }));
                        setCount((prev) => prev + 1);
                    }} mask="(999) 999-9999" placeholder="(999) 999-9999"></InputMask>

                    <label style={{ marginLeft: "30px", marginTop: "5px" }} htmlFor="email" className="font-bold block mb-2">Email
                        {
                            (!reqd.handle && !reqd.cov) && (
                                <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                            )
                        }</label>
                    <InputText style={{ width: "300px", height: "30px", padding: "20px", marginTop: "30px", marginBottom: "20px", marginLeft: "-36px" }} type="email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        setReqd((prev) => ({
                            ...prev,
                            email: true,
                        }));
                        setCount((prev) => prev + 1);
                    }} placeholder="johndoe@gmail.com" />
                </div>

                <div className="appFont" style={{ display: "flex", marginTop: "-10px" }}>
                    <div>
                        <label style={{ width: "90px" }} htmlFor="cause" className="font-bold block mb-2">Cause of Visit
                            {
                                (!reqd.handle && !reqd.cov) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <Dropdown id="ap1" style={{ width: "300px", height: "40px", marginTop: "10px", padding: "7px", zIndex: "0" }}
                            value={cause}
                            onChange={(e) => {
                                setCause(e.value);

                                setReqd((prev) => ({
                                    ...prev,
                                    cov: true,
                                }));
                                setCount((prev) => prev + 1);

                                const selectedOption = docOpt.find(option => option.dis.includes(e.value.code));

                                if (selectedOption) {
                                    const speciality = selectedOption.speciality;
                                    sendSpl(speciality);
                                }


                            }}
                            options={prob}
                            optionLabel="name"
                            placeholder="Select" className="w-full md:w-14rem " />

                    </div>

                    <div style={{ marginLeft: "-40px" }}>
                        <label style={{ width: "90px" }} htmlFor="doc1" className="font-bold block mb-2">Specialist</label>
                        <Dropdown style={{ width: "300px", height: "40px", marginTop: "10px", padding: "7px" }}
                            value={doc1}
                            onChange={(e) => {
                                setDoc(e.target.value);
                            }}
                            options={docAval}

                            placeholder="Select" className="w-full md:w-14rem" />

                    </div>

                </div>

                <button className="prcdBtn" onClick={() => {
                    if (reqd.name && reqd.dob && reqd.phone && reqd.email && reqd.cov) {
                        setShowPopup(true);
                        setReqd((prev) => ({
                            ...prev,
                            handle: true,
                        }));
                    } else {
                        setReqd((prev) => ({
                            ...prev,
                            handle: false,
                        }));
                    }
                }} id="barlow" >Proceed</button>




                {/* Pop up */}
                {showPopup && (
                    <div className="popup-container">

                        <div className="popup-background">
                            <div className="popup-content">
                                <button id="appClose" onClick={() => { setShowPopup(false) }}>x</button>
                                <div className="time-picker-container">

                                    <label style={{ marginBottom: "10px", display: "block", marginLeft: "110px" }} htmlFor="time-picker" className="font-bold block mb-2">
                                        Pick a Time
                                        {
                                            (!reqd.handle && !reqd.time) && (
                                                <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                            )
                                        }
                                    </label>

                                    <TimePicker
                                        id="time-picker"
                                        value={selectedTime}
                                        onChange={(newTime) => {
                                            setSelectedTime(newTime);
                                            setReqd((prev) => ({
                                                ...prev,
                                                time: true,
                                            }));
                                            setCount((prev) => prev + 1);
                                        }}
                                        clearIcon={null} // To hide the clear icon

                                    />

                                </div>


                                <label style={{ marginLeft: "-180px", marginBottom: "10px" }} htmlFor="cause" className="font-bold block mb-2">
                                    Date
                                    {
                                        (!reqd.handle && !reqd.date) && (
                                            <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                        )
                                    }
                                </label>
                                <Calendar style={{ height: "40px" }} value={date} onChange={(e) => {
                                    setDate(e.value);
                                    setReqd((prev) => ({
                                        ...prev,
                                        date: true,
                                    }));
                                    setCount((prev) => prev + 1);
                                }} showIcon iconclassname="calendar-icon" icon={(props) => (
                                    <i
                                        {...props}
                                        className="pi pi-calendar" // Assuming you are using PrimeReact icons
                                        style={{ backgroundColor: "rgb(0, 200, 124)", padding: "20px" }}
                                    />
                                )}  minDate={maxDate}/>
                            </div>



                            <Toast style={{ position: "relative", zIndex: "999" }} id="apToast" ref={toast} />

                            <button onClick={
                                () => {
                                    handleClickSubmit();

                                }

                            } id="timeBtn">Submit</button>


                        </div>
                    </div>
                )}




            </div >


        </div>
    )
}

export default AppCont;