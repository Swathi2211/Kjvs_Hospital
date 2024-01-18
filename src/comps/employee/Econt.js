import React, { useEffect, useRef, useState } from "react";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import "./Econt.css";
import axios from "axios";
import { Toast } from "primereact/toast";


function Econt() {
    const [emp, setEmp] = useState({});
    const [fname, setFname] = useState('');
    const [ph, setPh] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState(null);
    const [age, setAge] = useState('');
    const [currAddr, setCurrAdd] = useState('');
    const [permAddr, setPermAddr] = useState('');
    const [gender, setGender] = useState('');
    const [job, setJob] = useState('');
    const [bld, setBld] = useState('');
    const [exp, setExp] = useState('');
    const [shift, setShift] = useState('');
    const [lname, setLname] = useState('');
    const [spl, setSpl] = useState(null);





    // Photos

    const [image, setImage] = useState(null);


    const onInputChange = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];

        if (file) {
            const photoUrl = URL.createObjectURL(file);
            setPhoto(photoUrl);
            setReqd((prevReqd) => ({
                ...prevReqd,
                photo: true,
            }));
            setReqdCount((prevCount) => prevCount + 1);
        }

        setImage(e.target.files[0]);
    };



    const handleIconClick = () => {
        document.getElementById('fileInput').click();
    };


    const [photo, setPhoto] = useState(null);



    const [reqdCount, setReqdCount] = useState(0);


    const [reqd, setReqd] = useState({
        fname: false,
        lname: false,
        dob: false,
        gender: false,
        bld: false,
        curr: false,
        perm: false,
        email: false,
        phn: false,
        job: false,
        exp: false,
        photo: false,
        handle: true
    })



    const resetRequiredFields = () => {
        setReqd({
            fname: false,
            lname: false,
            dob: false,
            gender: false,
            bld: false,
            curr: false,
            perm: false,
            email: false,
            phn: false,
            job: false,
            exp: false,
            photo: false,
            handle: true,
        });
        setReqdCount(0);
    };




    //Problem
    const prob = [
        { name: 'Fever', code: 'FV' },
        { name: 'Allergic', code: 'AL' },
        { name: 'Diarrhea', code: 'DR' },
        { name: 'Headache', code: 'HD' },
        { name: 'Other', code: 'OT' }
    ];


    const blood = [
        { name: 'O+', code: 'O+' },
        { name: 'O-', code: 'O-' },
        { name: 'A+', code: 'A+' },
        { name: 'A-', code: 'A-' },
        { name: 'B+', code: 'B+' },
        { name: 'B-', code: 'B-' },
        { name: 'AB+', code: 'AB+' },
        { name: 'AB-', code: 'AB-' }
    ];


    const jobRole = [
        { name: 'HR', code: 'HR' },
        { name: 'Doctor', code: 'DR' },
        { name: 'Front Desk Officer', code: 'FD' }
    ];


    const sft = [
        { name: 'General', code: 'GN' },
        { name: 'Night', code: 'NT' }
    ];

    function calculateAge() {
        if (!birth) {
            setAge('');
            return;
        }

        const today = new Date();
        const dob = new Date(birth);
        let calcAge = today.getFullYear() - dob.getFullYear();

        if (
            today.getMonth() < dob.getMonth() ||
            (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
        ) {
            calcAge--;
        }

        setAge(calcAge);

    }

    useEffect(() => {
        calculateAge();
        if (shift === undefined || shift === '') {
            setShift({ name: 'General', code: 'GN' });
        }

        let copy = { ...emp };         //photo
        copy.currAddr = currAddr;
        copy.permAddr = permAddr;
        setEmp(copy);
    }, [birth, shift, photo, currAddr, permAddr, job]);



    const sendEmployeeData = (employeeData) => {
        axios.post('http://localhost:8080/employee/add', employeeData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(employeeData);
                console.log("Successfully Added");
                showSuccessMessage();
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            })
            .catch((err) => {
                console.log("");
            });
    };

    const docOpt = [
        { speciality: 'General Practitioner', dis: ['DR', 'OT', 'CLD'] },
        { speciality: 'Allergist', dis: ['AL', 'AR'] },
        { speciality: 'Gastroenterologist', dis: ['DR', 'SA', 'IND', 'CON', 'HB', 'CD', 'CFS', 'DIV', 'HEM', 'GS'] },
        { speciality: 'Neurologist', dis: ['HD', 'MIG', 'MS', 'PD', 'AD', 'EP', 'VER'] },
        { speciality: 'Pulmonologist', dis: ['CO', 'CLD', 'AS', 'COPD', 'FV'] },
        { speciality: 'Otolaryngologist (ENT)', dis: ['ST', 'SIN', 'TON'] },
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
        { speciality: 'ENT Specialist', dis: ['TIN'] },
        { speciality: 'Vascular Surgeon', dis: ['VV'] },
        { speciality: 'Hematologist', dis: ['HEMO'] },
    ];



    const handleClickAdd = (e) => {

        e.preventDefault();

        if (reqdCount >= 12) {

            const employeeData = {
                ...emp,

                fname: fname,
                lname: lname,
                dob: birth,
                phone: ph,
                email: email,
                age: age,
                blood: bld,
                gender: gender,
                currentAddress: currAddr,
                permanentAddress: permAddr,
                shift: shift,
                experience: exp,
                job: job,
                photo: image,
                speciality: spl ? spl.speciality : null
            };

            setEmp(employeeData);


            const formData = new FormData();
            formData.append("photo", image);
            formData.append("fname", employeeData.fname);
            formData.append("lname", employeeData.lname);
            formData.append("dob", employeeData.dob);
            formData.append("phone", employeeData.phone);
            formData.append("email", employeeData.email);
            formData.append("age", employeeData.age);
            formData.append("blood", JSON.stringify(employeeData.blood));
            formData.append("gender", employeeData.gender);
            formData.append("currentAddress", employeeData.currentAddress);
            formData.append("permanentAddress", employeeData.permanentAddress);
            formData.append("shift", JSON.stringify(employeeData.shift));
            formData.append("experience", employeeData.experience);
            formData.append("job", JSON.stringify(employeeData.job));
            if (employeeData.speciality) {
                formData.append("speciality", employeeData.speciality);
            } else {
                formData.append("speciality", null);
            }

            // Call the function to send data to the server
            // sendEmployeeData(employeeData);




            sendEmployeeData(formData);

            setFname('');
            setLname('');
            setPh('');
            setEmail('');
            setBirth(null);
            setAge('');
            setCurrAdd('');
            setPermAddr('');
            setShift('');
            setJob('');
            setGender('');
            setExp('');
            setSpl(null);
            setPhoto(null);

            resetRequiredFields();

        } else {
            setReqd((prevReqd) => ({
                ...prevReqd,
                handle: false,
            }));
        }



    };

    const handleBirthdateChange = (e) => {
        const selectedDate = e.value; // Assuming e.value gives you the selected date
        setBirth(selectedDate);
        setReqd((prevReqd) => ({
            ...prevReqd,
            dob: true,
        }));
        setReqdCount((prevCount) => prevCount + 1);

        // Calculate age when the birthdate changes
        calculateAge();
    };


    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        // Calculate 30 years from the current date
        const now = new Date();
        const maxDate = new Date(now.getFullYear() + 30, now.getMonth(), now.getDate());

        // Set the maximum time to be 30 years from now
        setSelectedTime(maxDate);
    }, []);


    const toast = useRef(null);

    const showSuccessMessage = () => {
        toast.current.show({ severity: 'success', summary: 'Employee Added', detail: 'Successfully', life: 500 });

    };




    return (
        <div style={{ height: "950px" }}>


            <div style={{ position: "absolute", marginLeft: "620px", marginTop: "-70px" }}>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={onInputChange}
                />
                <div
                    style={{
                        width: '180px',
                        height: '200px',
                        border: '2px solid #ccc',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    {!photo ? (
                        <div>
                            <i
                                className="fa-solid fa-upload"
                                onClick={handleIconClick}
                                style={{ cursor: 'pointer', position: 'absolute', marginLeft: "60px", fontSize: "20px", marginTop: "70px" }}
                            >{
                                    (!reqd.handle && !reqd.photo) && (
                                        <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                    )
                                }</i>
                            <p id="barlow" style={{ marginTop: "140px", marginLeft: "10px" }}>Upload your photo</p>
                        </div>
                    ) : (
                        <img
                            src={photo}
                            alt={`uploaded-passport`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    )}
                </div>

            </div>





            <div style={{ fontSize: "15px", backgroundColor: "white", width: "770px", height: "700px", padding: "40px", marginLeft: "-40px", marginTop: "70px" }}>
                <p style={{ fontFamily: "monospace", fontSize: "18px", color: "rgba(20, 167, 142)", marginTop: "20px" }}>EMPLOYEE</p>
                <p id="mons" style={{ fontSize: "35px", marginTop: "20px", marginBottom: "10px", marginLeft: "-4px" }}>Add Employee</p>
                <p style={{ marginBottom: "50px" }}>We expect you to work with your heart out</p>


                {/* Name And Email */}
                <div style={{ display: "flex", width: "785px", justifyContent: "space-between", marginBottom: "25px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>First Name
                            {
                                (!reqd.handle && !reqd.fname) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>

                        <InputText style={{ width: "300px" }} value={fname} onChange={(e) => {
                            setFname(e.target.value);
                            setReqd((prevReqd) => ({
                                ...prevReqd,
                                fname: true,
                            }));
                            setReqdCount((prevCount) => prevCount + 1);
                        }} placeholder="John" />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Last Name
                            {
                                (!reqd.handle && !reqd.lname) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <InputText style={{ width: "300px" }} value={lname} onChange={(e) => {
                            setLname(e.target.value); setReqd((prevReqd) => ({
                                ...prevReqd,
                                lname: true,
                            }));
                            setReqdCount((prevCount) => prevCount + 1);
                        }} placeholder="Doe" />
                    </div>
                </div>


                {/* <div style={{ display: "flex", width: "820px", justifyContent: "space-between", marginLeft: "-30px" }}>
                    <label style={{ width: "100px", position: "absolute", left: "340px" }} htmlFor="fname" className="font-bold">First Name</label><br />
                    <InputText style={{ width: "300px", height: "30px", padding: "20px", marginTop: "30px", marginBottom: "20px" }} value={fname} onChange={(e) => setFname(e.target.value)} placeholder="John" />

                    <label style={{ width: "100px", marginLeft: "100px" }} htmlFor="lname" className="font-bold block mb-2">Last Name</label><br />
                    <InputText style={{ width: "300px", height: "30px", padding: "20px", marginTop: "30px", marginBottom: "20px" }} value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Doe" />


                </div> */}


                {/* DOB and Age */}
                <div style={{ display: "flex", width: "785px", justifyContent: "space-between", marginBottom: "25px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Date of Birth
                            {
                                (!reqd.handle && !reqd.dob) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <Calendar style={{ width: "285px" }} value={birth} onChange={handleBirthdateChange} maxDate={new Date()} />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Age</label>
                        <InputText style={{ width: "300px" }} id="age" value={age} readOnly></InputText>
                    </div>
                </div>


                {/* Gender and Blood Group */}
                <div style={{ display: "flex", width: "805px", justifyContent: "space-between", marginBottom: "25px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Gender
                            {
                                (!reqd.handle && !reqd.gender) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <div style={{ display: "flex", marginTop: "20px", marginLeft: "-5px" }}>
                            <div className="flex align-items-center" style={{ marginLeft: "5px", width: "80px" }}>
                                <RadioButton inputId="gen1" name="gender" value="Male" onChange={(e) => {
                                    setGender(e.value);
                                    setReqd((prevReqd) => ({
                                        ...prevReqd,
                                        gender: true,
                                    }));
                                    setReqdCount((prevCount) => prevCount + 1);
                                }} checked={gender === 'Male'} />
                                <label style={{ marginLeft: "15px" }} htmlFor="gen1" className="ml-2">Male</label>
                            </div>
                            <div className="flex align-items-center" style={{ marginLeft: "50px", width: "90px" }}>
                                <RadioButton inputId="gen2" name="gender" value="Female" onChange={(e) => {
                                    setGender(e.value);
                                    setReqd((prevReqd) => ({
                                        ...prevReqd,
                                        gender: true,
                                    }));
                                    setReqdCount((prevCount) => prevCount + 1);
                                }} checked={gender === 'Female'} />
                                <label style={{ marginLeft: "20px" }} htmlFor="gen2" className="ml-2">Female</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Blood Group
                            {
                                (!reqd.handle && !reqd.bld) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <Dropdown style={{ width: "300px", height: "45px", padding: "10px" }} value={bld} onChange={(e) => {
                            setBld(e.value); setReqd((prevReqd) => ({
                                ...prevReqd,
                                bld: true,
                            }));
                            setReqdCount((prevCount) => prevCount + 1);
                        }} options={blood} optionLabel="name" placeholder="Select" className="w-full md:w-14rem" />
                    </div>
                </div>

                {/* <div style={{ display: "flex", marginTop: "-10px" }}>

                    <div>
                        <label style={{ width: "100px" }} htmlFor="name" className="font-bold block mb-2">Gender</label><br />
                        <div style={{ display: "flex", marginTop: "20px", marginLeft: "-5px" }}>
                            <div className="flex align-items-center" style={{ marginLeft: "5px", width: "80px" }}>
                                <RadioButton inputId="gen1" name="gender" value="Male" onChange={(e) => setGender(e.value)} checked={gender === 'Male'} />
                                <label style={{ marginLeft: "15px" }} htmlFor="gen1" className="ml-2">Male</label>
                            </div>
                            <div className="flex align-items-center" style={{ marginLeft: "50px", width: "90px" }}>
                                <RadioButton inputId="gen2" name="gender" value="Female" onChange={(e) => setGender(e.value)} checked={gender === 'Female'} />
                                <label style={{ marginLeft: "20px" }} htmlFor="gen2" className="ml-2">Female</label>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "-0px", marginLeft: "166px" }}>
                        <label htmlFor="bld" className="font-bold block mb-2">Blood Group</label>
                        <Dropdown style={{ width: "300px", height: "40px", padding: "7px", paddingLeft: "8px", marginTop: "25px" }} value={bld} onChange={(e) => setBld(e.value)} options={blood} optionLabel="name" placeholder="Select" className="w-full md:w-14rem" />
                    </div>


                </div> */}



                {/* CUrr and Temp Address*/}
                <div style={{ display: "flex", width: "785px", justifyContent: "space-between", marginBottom: "25px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Current Address
                            {
                                (!reqd.handle && !reqd.curr) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <InputTextarea style={{ width: "300px", height: "40px", padding: "10px" }} type="curr" value={currAddr} onChange={(e) => {
                            setCurrAdd(e.target.value); setReqd((prevReqd) => ({
                                ...prevReqd,
                                curr: true,
                            }));
                            setReqdCount((prevCount) => prevCount + 1);
                        }} />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Permanent Address
                            {
                                (!reqd.handle && !reqd.perm) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <InputTextarea style={{ width: "300px", height: "40px", padding: "10px" }} type="perm" value={permAddr} onChange={(e) => {
                            setPermAddr(e.target.value);
                            setReqd((prevReqd) => ({
                                ...prevReqd,
                                perm: true,
                            }));
                            setReqdCount((prevCount) => prevCount + 1);
                        }} />
                    </div>
                </div>

                {/* <div style={{ display: "flex", marginBottom: "10px", marginTop: "30px" }}>
                    <div style={{ marginRight: "110px" }}>
                        <label style={{ marginTop: "2px", width: "150px" }} htmlFor="currAddr" className="font-bold block mb-2">Current Address</label>
                        <InputTextarea style={{ width: "290px", height: "40px", padding: "10px", marginTop: "15px", marginBottom: "20px" }} type="curr" value={currAddr} onChange={(e) => setCurrAdd(e.target.value)} />
                    </div>

                    <div >
                        <label htmlFor="permAddr" className="font-bold block mb-2" style={{ marginTop: "-10px" }}>Permanent Address</label>
                        <InputTextarea style={{ width: "300px", height: "40px", padding: "10px", marginTop: "15px", marginBottom: "20px" }} type="perm" value={permAddr} onChange={(e) => setPermAddr(e.target.value)} />
                    </div>
                </div> */}



                {/* Phone And Email */}

                <div style={{ display: "flex", width: "785px", justifyContent: "space-between", marginBottom: "25px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Email
                            {
                                (!reqd.handle && !reqd.email) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <InputText style={{ width: "300px", height: "30px", padding: "20px" }} type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value); setReqd((prevReqd) => ({
                                ...prevReqd,
                                email: true,
                            }));
                            setReqdCount((prevCount) => prevCount + 1);
                        }} placeholder="johndoe@gmail.com" />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Phone
                            {
                                (!reqd.handle && !reqd.phn) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <InputMask style={{ width: "300px", height: "30px", padding: "20px" }} id="phone" value={ph} onChange={(e) => {
                            setPh(e.target.value);
                            setReqd((prevReqd) => ({
                                ...prevReqd,
                                phn: true,
                            }));
                            setReqdCount((prevCount) => prevCount + 1);
                        }} mask="(999) 999-9999" placeholder="(999) 999-9999"></InputMask>
                    </div>
                </div>


                {/* <div style={{ display: "flex", marginLeft: "-28px", marginTop: "-20px" }}>

                    <label style={{ marginLeft: "30px", marginTop: "5px" }} htmlFor="email" className="font-bold block mb-2">Email</label>
                    <InputText style={{ width: "300px", height: "30px", padding: "20px", marginTop: "40px", marginBottom: "20px", marginLeft: "-36px" }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="johndoe@gmail.com" />


                    <label style={{ marginLeft: "108px", marginTop: "5px" }} htmlFor="phone" className="font-bold block mb-2">Phone</label>
                    <InputMask style={{ width: "300px", height: "30px", padding: "20px", marginTop: "40px", marginBottom: "20px", marginLeft: "-42px" }} id="phone" value={ph} onChange={(e) => setPh(e.target.value)} mask="(999) 999-9999" placeholder="(999) 999-9999"></InputMask>

                </div> */}


                {/* Job And Experience ANd SHift */}
                <div style={{ display: "flex", width: "805px", justifyContent: "space-between", marginBottom: "25px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Job Role
                            {
                                (!reqd.handle && !reqd.job) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <Dropdown style={{ width: "300px", height: "40px", padding: "8px", paddingLeft: "20px" }} value={job} onChange={(e) => {
                            setJob(e.value); setReqd((prevReqd) => ({
                                ...prevReqd,
                                job: true,
                            }));
                            setReqdCount((prevCount) => prevCount + 1);
                        }} options={jobRole} optionLabel="name" placeholder="Select" className="w-full md:w-14rem" />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Specialist</label>
                        <Dropdown style={{ width: "300px", height: "40px", padding: "8px", paddingLeft: "20px" }} value={spl} onChange={(e) => setSpl(e.value)} options={docOpt} optionLabel="speciality" placeholder="Select" className="w-full md:w-14rem" disabled={job.name !== "Doctor"} />
                    </div>
                </div>

                {/* <div style={{ display: "flex", marginLeft: "2px", marginTop: "-5px" }}>


                    <div>
                        <label style={{ width: "80px", marginLeft: "0px", marginTop: "5px" }} htmlFor="job" className="font-bold block mb-2">Job Role</label>
                        <Dropdown style={{ width: "300px", height: "40px", padding: "8px", marginTop: "15px", marginBottom: "20px", paddingLeft: "20px" }} value={job} onChange={(e) => setJob(e.value)} options={jobRole} optionLabel="name" placeholder="Select" className="w-full md:w-14rem" />
                    </div>


                    <div style={{ marginLeft: "90px" }}>
                        <label style={{ marginTop: "5px" }} htmlFor="doc" className="font-bold block mb-2">Specialist</label>
                        <Dropdown style={{ width: "300px", height: "40px", padding: "8px", marginTop: "15px", marginBottom: "20px", paddingLeft: "20px" }} value={spl} onChange={(e) => setSpl(e.value)} options={docOpt} optionLabel="speciality" placeholder="Select" className="w-full md:w-14rem" disabled={job.name !== "Doctor"} />
                    </div>

                </div> */}


                {/* Experience & Shift */}
                <div style={{ display: "flex", width: "805px", justifyContent: "space-between", marginBottom: "25px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Experience
                            {
                                (!reqd.handle && !reqd.exp) && (
                                    <span style={{ color: "red", fontSize: "17px", marginLeft: "5px" }}>*</span>
                                )
                            }</label>
                        <InputText style={{ width: "300px", height: "40px", padding: "20px", marginBottom: "20px", paddingLeft: "20px" }} id="exp" value={exp} onChange={(e) => {
                            setExp(e.target.value);
                            setReqd((prevReqd) => ({
                                ...prevReqd,
                                exp: true,
                            }));
                            setReqdCount((prevCount) => prevCount + 1);
                        }} placeholder="10"></InputText>
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "15px" }}>Shift</label>
                        <Dropdown style={{ width: "300px", height: "40px", padding: "8px", marginBottom: "20px", paddingLeft: "20px" }} value={shift} onChange={(e) =>
                            setShift(e.value)} options={sft} optionLabel="name" placeholder="General" className="w-full md:w-14rem" />
                    </div>
                </div>

                {/* <div style={{ display: "flex", marginLeft: "2px", marginTop: "-5px" }}>

                    <div>
                        <label style={{ width: "80px", marginLeft: "2px", marginTop: "5px" }} htmlFor="phone" className="font-bold block mb-2">Experience</label>
                        <InputText style={{ width: "300px", height: "40px", padding: "20px", marginTop: "15px", marginBottom: "20px", paddingLeft: "20px" }} id="exp" value={exp} onChange={(e) => setExp(e.target.value)} placeholder="10"></InputText>
                    </div>

                    <div style={{ marginLeft: "90px" }}>

                        <label style={{ marginTop: "5px" }} htmlFor="shift" className="font-bold block mb-2">Shift</label>
                        <Dropdown style={{ width: "300px", height: "40px", padding: "8px", marginTop: "15px", marginBottom: "20px", paddingLeft: "20px" }} value={shift} onChange={(e) =>
                            setShift(e.value)} options={sft} optionLabel="name" placeholder="General" className="w-full md:w-14rem" />

                    </div>
                </div> */}



                <Toast id="apToast" ref={toast} />


                <button onClick={handleClickAdd} id="barlow" className="empbBtn" style={{ fontSize: "15px", width: "200px", height: "50px", borderTopRightRadius: "20px", borderBottomLeftRadius: "20px", fontWeight: "bold", marginTop: "45px", marginBottom: "50px", marginLeft: "600px" }}>Add</button>
            </div>
        </div>
    );
}

export default Econt;