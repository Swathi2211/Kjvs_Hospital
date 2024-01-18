import React, { useEffect, useRef, useState } from "react";
import { MultiSelect } from 'primereact/multiselect';
import bglogo from '../../img/Venk_logo.png';
import "../doctor/dEntry.css";
import micro from "../../img/microscope.png";
import { Calendar } from 'primereact/calendar';
import axios from "axios";
import { useLocation } from "react-router-dom";
import Hmain from "../history/Hmain";
import { Toast } from "primereact/toast";
import "./printStyles.css";






function Dentry(props) {



    function handleEnterKeyPress(e) {
        if (e.key === 'Enter') {
            // Perform the API call or any other action
            fetchData();
        }
    }


    //Rendering with id
    const [pat, setPat] = useState([]);
    const [id, setId] = useState('');
    // const debouncedId = useDebounce(id, 3000);

    const [date, setDate] = useState(null);
    const [tests, setTests] = useState([]);


    const availableTests = [
        { name: 'Complete Blood Count (CBC)', code: 'CBC' },
        { name: 'Blood Glucose Fasting', code: 'BGF' },
        { name: 'Blood Glucose Postprandial', code: 'BGP' },
        { name: 'Lipid Profile', code: 'LP' },
        { name: 'Liver Function Tests (LFT)', code: 'LFT' },
        { name: 'Kidney Function Tests (KFT)', code: 'KFT' },
        { name: 'Thyroid Stimulating Hormone (TSH)', code: 'TSH' },
        { name: 'Urine Routine Examination', code: 'URE' },
        { name: 'Electrocardiogram (ECG)', code: 'ECG' },
        { name: 'X-Ray Chest', code: 'XRC' }
    ];

    const handleTest = (testCode) => {
        setTests(prevTests => {
            if (prevTests.includes(testCode)) {
                return prevTests.filter(code => code !== testCode);
            } else {
                return [...prevTests, testCode];
            }
        });
    };

    const [med, setMed] = useState(null);
    const medoptions = [
        { name: 'Crocin', code: 'CR' },
        { name: 'Benadryl', code: 'BN' },
        { name: 'Levocetirizine', code: 'LV' },
        { name: 'Meclizine', code: 'MC' },
        { name: 'Loperamide', code: 'LP' },
        { name: 'Aspirin', code: 'AS' },
        { name: 'Ibuprofen', code: 'IB' },
        { name: 'Paracetamol', code: 'PA' },
        { name: 'Omeprazole', code: 'OM' },
        { name: 'Simvastatin', code: 'SI' },
        { name: 'Atenolol', code: 'AT' },
        { name: 'Metformin', code: 'ME' },
        { name: 'Lisinopril', code: 'LI' },
        { name: 'Amlodipine', code: 'AM' },
        { name: 'Losartan', code: 'LO' },
        { name: 'Hydrochlorothiazide', code: 'HY' },
        { name: 'Clopidogrel', code: 'CL' },
        { name: 'Metoprolol', code: 'MT' },
        { name: 'Amitriptyline', code: 'AI' },
        { name: 'Fluoxetine', code: 'FL' },
        { name: 'Citalopram', code: 'CI' },
        { name: 'Sertraline', code: 'SE' },
        { name: 'Diazepam', code: 'DI' },
        { name: 'Alprazolam', code: 'AL' },
        { name: 'Warfarin', code: 'WA' },
        { name: 'Insulin', code: 'IN' },
        { name: 'Furosemide', code: 'FU' },
        { name: 'Amoxicillin', code: 'AMX' },
        { name: 'Cephalexin', code: 'CE' },
        { name: 'Diphenhydramine', code: 'DP' },
        { name: 'Hydrocodone', code: 'HD' },
        { name: 'Acetaminophen', code: 'ACT' },
        { name: 'Codeine', code: 'COD' },
        { name: 'Morphine', code: 'MO' },
        { name: 'Gabapentin', code: 'GA' },
        { name: 'Tramadol', code: 'TR' },
        { name: 'Zolpidem', code: 'ZO' },
        { name: 'Esomeprazole', code: 'ES' },
        { name: 'Ranitidine', code: 'RA' },
        { name: 'Ciprofloxacin', code: 'CI' },
        { name: 'Amoxicillin/Clavulanate', code: 'AMX/CLA' },
        { name: 'Doxycycline', code: 'DO' },
        { name: 'Prednisone', code: 'PR' },
        { name: 'Methylprednisolone', code: 'MP' },
        { name: 'Albuterol', code: 'ALB' },
        { name: 'Ipratropium', code: 'IP' },
    ];

    const [inp, setInp] = useState([]);
    const [curRec, setCurRec] = useState([]);

    const handleCheckboxChange = (timeOfDay, itemIndex) => {
        setCurRec(prevState => {
            const copy = [...prevState];
            copy[itemIndex] = {
                mname: inp[itemIndex],
                medicine: {
                    ...copy[itemIndex]?.medicine,
                    [timeOfDay]: !copy[itemIndex]?.medicine?.[timeOfDay],
                },
            };
            return copy;
        });
    };

    const handleTickClick = () => {
        let copy = [...inp];
        copy.push(...med.map(selectedMed => selectedMed.name));
        setInp(copy);
        setMed([]);
        setCurRec([...curRec, ...Array(copy.length).fill({})]);
    };

    const handleCrossClick = (index) => {
        let inpCopy = [...inp];
        let curRecCopy = [...curRec];

        inpCopy.splice(index, 1);
        curRecCopy.splice(index, 1);

        setInp(inpCopy);
        setCurRec(curRecCopy);
    };

    const location = useLocation();
    let params = new URLSearchParams(location.search);

    const fname = params.get('fname');
    const lname = params.get('lname');
    const docId = params.get('id');
    const spl = params.get('spl');
    const phone = params.get('phone');
    const email = params.get('email');

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();



    const [record, setRecord] = useState({
        id: "",
        name: "",
        dob: '',
        age: '',
        bp: null,
        bt: null,
        height: null,
        weight: null,
        bmi: null,
        prescription: curRec,
        test: tests,
        nextDate: date,
        doctor: fname + " " + lname,
        doctorId: docId,
        speciality: spl,
        dPh: phone,
        dEmail: email,
        todayDate: formattedDate
    });




    useEffect(() => {
        const copy = { ...record };
        copy.prescription = curRec;
        copy.test = tests;
        setRecord(copy);
    }, [inp, curRec, tests]);


    useEffect(() => {
        if (record.height && record.weight) {
            const heightInMeters = record.height / 100;
            const bmi = (record.weight / (heightInMeters * heightInMeters)).toFixed(2);
            const copy = { ...record, bmi };
            setRecord(copy);
        }
    }, [record.height, record.weight, record.bmi]);


    const sendPatient = (obj) => {
        axios.post('http://localhost:8080/patient/add', obj)
            .then((res) => {
                console.log("Successfully Added");
                showSuccessMessage();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((err) => {
                console.log("");
            });
    }



    const handleSubmit = () => {

        // Handle form submission here or pass the record state to a parent component for submission.
        const patientObj = { ...record };

        sendPatient(patientObj);



        patientObj.id = '';
        patientObj.bp = '';
        patientObj.bt = '';
        patientObj.bmi = '';
        patientObj.height = '';
        patientObj.weight = '';
        patientObj.prescription = '';
        patientObj.test = '';
        patientObj.nextDate = '';



        setRecord(patientObj);

        // Add logic to send the data to the server or perform other actions.
    };




    const calculateAge = (birth) => {
        if (!birth) {
            return "";
        }

        const today = new Date();
        const dobArray = birth.split('/'); // Assuming birth is in the format "DD/MM/YYYY"
        const dob = new Date(`${dobArray[2]}-${dobArray[1]}-${dobArray[0]}`); // Reformat to "YYYY-MM-DD"
        let calcAge = today.getFullYear() - dob.getFullYear();

        if (
            today.getMonth() < dob.getMonth() ||
            (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
        ) {
            calcAge--;
        }

        return calcAge;
    };


    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, record.name, record.dob, record.age]);

    const fetchData = () => {
        axios
            .get(`http://localhost:8080/appoint/unique/${id}`)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setPat(res.data);

                    setRecord((prevRecord) => ({
                        ...prevRecord,
                        id: res.data[0].patientId,
                        name: res.data[0].name,
                        dob: res.data[0].dob,
                        age: calculateAge(res.data[0].dob),
                    }));
                } else {
                    // Handle the case when no data is returned
                    console.error("No data found");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };


    const [his, setHis] = useState(false);



    const toast = useRef(null);

    const showSuccessMessage = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: 'Successfully', life: 3000 });

    };



    const handlePrint = () => {
        // Print the entire content
        document.getElementById("prescB").style.display = "none";
        window.print();
        // Show the submit button after printing
        document.getElementById("prescB").style.display = "block";
    };



    return (
        <>

            {

                window.addEventListener("scroll", function () {
                    var histElement = document.getElementById("hist");
                    var scrollHeight = window.scrollY;

                    // Set opacity based on scroll height
                    histElement.style.opacity = scrollHeight >= 500 ? 0 : 1;
                })

            }

            <div id="body">


                <div id="entire" style={{ width: "1000px", paddingBottom: "200px", backgroundColor: "white", marginLeft: "17%" }}>
                    <button onClick={(e) => {

                        if (record.id) {
                            setHis(true);
                        }

                    }} id="hist"><i class="fa-xs fa-solid fa-clock-rotate-left"></i></button>

                    {/* Pop up */}
                    {his && (
                        <div style={{ position: "relative", zIndex: "200" }} className="popup-container">

                            <div className="popup-background">
                                <div className="popup-content">


                                    <button id="crHis" style={{ marginLeft: "1060px", marginTop: "-47px", position: "absolute", padding: "8px", borderRadius: "100%", border: "none" }} onClick={(e) => setHis(false)}>x</button>

                                    <Hmain history={record.id} />

                                </div>
                            </div>
                        </div>
                    )}

                    <div style={{ display: "flex", alignItems: "center", height: "130px", justifyContent: "space-evenly", marginTop: "-50px" }}>
                        <div style={{ display: "flex" }}>
                            <div>
                                <img src={bglogo} width="70px" height="70px" alt="none" />
                            </div>
                            <div>
                                <h2 id="ppp" style={{ fontSize: "30px", marginLeft: "10px", marginTop: "15px" }}>Kjvs</h2>
                            </div>
                        </div>

                        <hr style={{ transform: "rotate(180deg)", height: "90px", marginLeft: "10px" }} />

                        <div id="kay" style={{ marginLeft: "40px" }}>
                            <p style={{ marginTop: "10px" }}>12-B, Hyung Road,</p>
                            <p>Nandanam,</p>
                            <p>Chennai - 600021</p>
                            <p>Ph : 044-5678 1212 / 5689 5689</p>
                        </div>

                        <hr style={{ transform: "rotate(180deg)", height: "90px", marginLeft: "10px" }} />

                        <div style={{ display: "flex" }}>
                            <div>
                                <img src={micro} alt="none" width="60px" />
                            </div>
                            <hr style={{ transform: "rotate(180deg)", height: "40px", marginTop: "10px", marginLeft: "10px" }} />
                            <div style={{ marginLeft: "15px" }}>
                                <p id="play" style={{ fontSize: "25px", color: "rgb(235, 64, 248)" }}>SK</p>
                                <p id="play" style={{ color: "rgb(67, 161, 250)" }}>Diagnostics</p>
                            </div>
                        </div>
                    </div>

                    <hr style={{ width: "90%", marginLeft: "5%" }} />

                    <div id="kay" className='presc' style={{ display: "flex", marginLeft: "11%", marginTop: "30px", width: "780px", justifyContent: "space-between", marginBottom: "30px" }}>
                        <div id="patInp">
                            <label>Patient ID</label>
                            <input
                                style={{ marginLeft: "45px" }}
                                type="text"
                                onChange={(e) => setId(e.target.value)}
                                onKeyDown={handleEnterKeyPress} />
                            <br />
                            <label>Patient Name</label>
                            <input value={record.name} style={{ marginLeft: "22px" }} disabled />
                        </div>
                        <div id="patInp">
                            <label>Date of Birth</label>
                            <input value={record.dob} style={{ marginLeft: "40px" }} disabled /><br />
                            <label>Age</label>
                            <input value={record.age} style={{ marginLeft: "107px" }} type="text" disabled />
                            <br />
                        </div>
                    </div>

                    <hr style={{ width: "80%", marginLeft: "9%" }} />

                    <div id="kay" className='presc' style={{ marginLeft: "11%", width: "780px", marginTop: "30px", marginBottom: "30px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div id="patInp">
                                <label>Blood Pressure</label>
                                <input style={{ marginLeft: "10px" }} type="text" onChange={(e) => {
                                    const copy = { ...record };
                                    copy.bp = e.target.value;
                                    setRecord(copy);
                                }} />
                                <br />
                                <label>Height</label>
                                <input style={{ marginLeft: "71px" }} onChange={(e) => {
                                    const copy = { ...record };
                                    copy.height = e.target.value;
                                    setRecord(copy);
                                }} />
                            </div>
                            <div id="patInp">
                                <label>Body Temperature</label>
                                <input style={{ marginLeft: "10px" }} onChange={(e) => {
                                    const copy = { ...record };
                                    copy.bt = e.target.value;
                                    setRecord(copy);
                                }} /><br />
                                <label>Weight</label>
                                <input style={{ marginLeft: "92px" }} type="text" onChange={(e) => {
                                    const copy = { ...record };
                                    copy.weight = e.target.value;
                                    setRecord(copy);
                                }} />
                                <br />
                            </div>

                        </div>
                        <div id="patInp">
                            <label>BMI</label>
                            <input style={{ marginLeft: "87px" }} value={record.bmi} disabled /><br />
                        </div>
                    </div>

                    <hr style={{ width: "80%", marginLeft: "9%" }} />

                    <div id="kay" style={{ marginLeft: "20%", marginTop: "30px", width: "700px", marginBottom: "20px" }}>
                        <label style={{ marginRight: "40px" }}>Prescription</label>
                        <MultiSelect id="kay" value={med} onChange={(e) => setMed(e.value)} options={medoptions} optionLabel="name"
                            filter placeholder="Select" maxSelectedLabels={5} style={{ width: "400px", height: "40px", padding: "10px" }} />

                        <button style={{ border: "none", marginLeft: "20px" }} onClick={handleTickClick}>
                            <i className="fa-solid fa-check" id="tickPresc"></i>
                        </button>
                    </div>

                    {inp.length > 0 && (
                        <hr style={{ width: "60%", marginLeft: "19%", marginTop: "30px" }} />
                    )}

                    <ol>
                        {inp.map((item, index) => (
                            <React.Fragment key={index}>
                                <li style={{ marginLeft: "250px", paddingTop: "10px" }}>
                                    <p>
                                        {item}
                                        <span style={{ fontSize: "14px", display: "flex", alignItems: "center", margin: "-35px", marginLeft: "200px", width: "150px", justifyContent: "space-evenly", marginTop: "-18px" }}>
                                            <input
                                                style={{ width: "15px" }}
                                                type="checkbox"
                                                id={`morn${index}`}
                                                name={`M${index}`}
                                                value="Morning"
                                                checked={curRec[index]?.medicine?.morning || false}
                                                onChange={() => handleCheckboxChange('morning', index)}
                                            />
                                            <label htmlFor={`morn${index}`}>M</label>


                                            <input
                                                style={{ width: "15px" }}
                                                type="checkbox"
                                                id={`aft${index}`}
                                                name={`A${index}`}
                                                value="Afternoon"
                                                checked={curRec[index]?.medicine?.afternoon || false}
                                                onChange={() => handleCheckboxChange('afternoon', index)} />
                                            <label htmlFor={`aft${index}`}>A</label><br />


                                            <input
                                                style={{ width: "15px" }}
                                                type="checkbox"
                                                id={`eve${index}`}
                                                name={`E${index}`}
                                                value="Evening"
                                                checked={curRec[index]?.medicine?.evening || false}
                                                onChange={() => handleCheckboxChange('evening', index)} />
                                            <label htmlFor={`eve${index}`}>E</label>

                                        </span>
                                    </p>
                                    <button
                                        onClick={() => handleCrossClick(index)}
                                    >
                                        <i className="fa-solid fa-xmark crossPresc"></i>
                                    </button>
                                </li>
                                <hr style={{ width: "60%", marginLeft: "19%", marginTop: "-5px" }} />
                            </React.Fragment>
                        ))}
                    </ol>

                    {
                        inp.length > 0 ? (
                            <hr style={{ width: "80%", marginLeft: "9%", marginTop: "50px" }} />
                        ) : (
                            <>
                                <p style={{ transform: "rotate(340deg)", fontSize: "20px", color: "rgba(0, 0, 0, 0.1)", marginLeft: "400px", marginTop: "-20px" }}>Medicines</p>
                                <p style={{ transform: "rotate(340deg)", fontSize: "20px", color: "rgba(0, 0, 0, 0.1)", marginLeft: "150px", marginTop: "40px" }}>Medicines</p>
                                <p style={{ transform: "rotate(340deg)", fontSize: "20px", color: "rgba(0, 0, 0, 0.1)", marginLeft: "750px", marginTop: "-30px" }}>Medicines</p>
                                <p style={{ transform: "rotate(340deg)", fontSize: "100px", color: "rgba(0, 0, 0, 0.1)", marginLeft: "250px", marginTop: "10px" }}>Medicines</p>
                                <p style={{ transform: "rotate(340deg)", fontSize: "20px", color: "rgba(0, 0, 0, 0.1)", marginLeft: "750px", marginTop: "-30px" }}>Medicines</p>
                                <p style={{ transform: "rotate(340deg)", fontSize: "20px", color: "rgba(0, 0, 0, 0.1)", marginLeft: "400px", marginTop: "50px" }}>Medicines</p>
                                <p style={{ transform: "rotate(340deg)", fontSize: "20px", color: "rgba(0, 0, 0, 0.1)", marginLeft: "150px", marginTop: "-40px" }}>Medicines</p>
                                <hr style={{ width: "80%", marginLeft: "9%", marginTop: "210px" }} />
                            </>
                        )
                    }


                    <div id="last" style={{ display: "flex", width: "800px", justifyContent: "space-between", marginLeft: "10%", marginTop: "70px" }}>

                        <div id="kay">
                            <label style={{ fontSize: "20px", fontWeight: "bold" }}>Test</label>
                            <div style={{ marginTop: "10px" }}>
                                {
                                    availableTests.map((test, index) => (
                                        <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                style={{ width: "20px" }}
                                                type="checkbox"
                                                id={`test${index}`}
                                                name={`Test${index}`} // Unique name for each checkbox
                                                value={test.code} // You might want to use the test code as the value
                                                checked={tests.includes(test.code)}
                                                onChange={() => handleTest(test.code)}
                                            />
                                            <label htmlFor={`test${index}`} style={{ marginLeft: "5px" }}>{test.name}</label>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                        <div id="kay">
                            <label style={{ fontSize: "15px" }}>Next Visit Date</label><br />
                            <Calendar style={{ marginTop: "20px" }} onChange={(e) => {
                                const copy = { ...record };
                                copy.nextDate = e.target.value;
                                setRecord(copy);
                            }} showIcon />
                        </div>


                    </div>

                    <Toast id="apToast" ref={toast} />
                    <button style={{ marginBottom: "-60px" }} id="prescB" onClick={() => { handleSubmit(); handlePrint(); }}>Submit</button>

                </div>




            </div>






        </>
    )
}

export default Dentry;