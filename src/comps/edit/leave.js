import React, { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import "../dashboard/Dcont.css"
import { useRef } from 'react';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';


function Leave(props) {
    const [date, setDates] = useState([]);
    const [reason, setReason] = useState('');

    const location = useLocation();
    const info = new URLSearchParams(location.search).get('info');
    const user = info ? JSON.parse(info) : null;

    const handleButtonClick = () => {
        // Go back to the previous page or route
        window.history.back();
    };

    const handleSubmit = () => {
        // Assuming you have user information in the location state
        const userInfo = user;
        const localizedDates = date.map((selectedDate) => selectedDate.toLocaleDateString());
        // Prepare the data to be sent to the server
        const leaveData = {
            date: localizedDates,
            reason,
            id: userInfo.userId,
            name: userInfo.fname + ' ' + userInfo.lname,
            phone: userInfo.phone,
            email: userInfo.email,
        };

        // Send the data to the server
        axios.post('http://localhost:8080/leave/add', leaveData)
            .then((res) => {
                console.log('Successfully Added');
                // You can handle success, e.g., show a success message or redirect to another page.
            })
            .catch((err) => {
                console.log(err);
                // Handle error, e.g., show an error message to the user.
            });

        showSuccessMessage();
        setTimeout(() => {
            handleButtonClick();
        }, 500);

    };

    const toast = useRef(null);

    const showSuccessMessage = () => {
        toast.current.show({ severity: 'success', summary: 'Leave Applied', detail: 'Successfully', life: 3000 });

    };


    return (
        <>
            <div className="popup-container">
                <div className="popup-background">
                    <div className="popup-content">
                        <div className="time-picker-container">
                            <button id="cros" onClick={handleButtonClick}><i style={{ color: "white" }} class='fa-solid fa-xmark'></i></button>

                            <label style={{ marginBottom: '10px', display: 'block', marginLeft: '97px' }} htmlFor="time-picker" className="font-bold block">
                                Reason
                            </label>
                            <InputTextarea style={{ width: '235px', height: '100px', padding: '10px', marginLeft: "85px" }} type="reason" onChange={(e) => setReason(e.target.value)} />

                        </div>

                        <label style={{ marginLeft: '-180px', marginBottom: '10px' }} htmlFor="cause" className="font-bold block mb-2">
                            Date
                        </label>

                        <Calendar value={date} onChange={(e) => setDates(e.value)} style={{ height: '40px' }} showIcon iconClassName="calendar-icon" icon={(props) => (
                            <i
                                {...props}
                                className="pi pi-calendar"
                                style={{ backgroundColor: 'rgb(0, 200, 124)', padding: '20px' }}
                            />
                        )} selectionMode="multiple" readOnlyInput />
                    </div>
                    <Toast id="apToast" ref={toast} />

                    <button id="lbtn" style={{ fontSize: '15px', width: '200px', height: '50px', borderTopRightRadius: '20px', borderBottomLeftRadius: '20px', border: 'none', fontWeight: 'bold', marginTop: '45px', marginLeft: '-10px' }} onClick={() => {
                        handleSubmit();
                    }}>Submit</button>
                </div>
            </div>
        </>
    );
}

export default Leave;
