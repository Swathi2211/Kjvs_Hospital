import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Checkbox } from "primereact/checkbox";
import login from "../img/loginCut.jpg";
import "../comps/signIn.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useEffect } from "react";
import axios from "axios";
import Dmain from "./dashboard/Dmain";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import LoadingSkeleton from "./skeleton/skeletLogin";
import { Link } from "react-router-dom";

function SignIn() {

    const toast = useRef(null);

    const showSuccessMessage = () => {
        toast.current.show({ severity: 'success', summary: 'Signed-in', detail: 'Successfully', life: 3000 });

    };

    const [rem, setRem] = useState(false);
    const [dis, setDis] = useState([]);


    const [err, setErr] = useState({
        id: false,
        pass: false
    })

    const onRemChange = () => {
        setRem(!rem);
    };

    const [id, setId] = useState('');
    const [pass, setPass] = useState('');


    useEffect(() => {
        axios.get('http://localhost:8080/employee/fetch')
            .then((e) => {
                setDis(e.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    function handleLogin() {
        const user = dis.find((item) => item.userId === id);

        if (user) {
            if (user.password === pass) {
                // <Dmain id={id} />
                console.log("User Object:", user);
                setTimeout(() => {

                    window.location.href = `/dashboard?id=${user.userId}`;

                }, 1000);
                showSuccessMessage();

            } else {
                setErr({ pass: true });
            }
        } else {
            setErr({ id: true });
        }
    }


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API/data loading delay
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);


    return (
        <>

            {
                // loading ? (
                //     <LoadingSkeleton />
                // ) : (
                <>
                    <div id="sBody">
                        <div style={{ textAlign: "center" }}>
                            <img src={login} alt="none" width="1080px" height="746px" />
                        </div>

                        <div style={{ position: "relative", top: "-500px", marginLeft: "350px", height: "0px" }}>
                            <h2 style={{ marginTop: "-60px", color: "rgb(88, 88, 88)", marginBottom: "50px" }}>Login To Your Account!</h2>

                            <span className="p-float-label" style={{ marginBottom: "30px" }}>
                                <InputText style={{ height: "40px", width: "300px", paddingLeft: "20px" }} id="username" value={id} onChange={(e) => setId(e.target.value)} />
                                <label style={{ left: "20px", marginTop: "-10px" }} htmlFor="username">User ID</label>
                                {
                                    err.id && (
                                        <p style={{ color: "red", fontSize: "10px", marginLeft: "25px" }}>User Not Found</p>
                                    )
                                }
                            </span>


                            <span className="p-float-label" style={{ marginBottom: "30px" }}>
                                <Password id="spass" style={{ height: "40px" }} feedback={false} value={pass} onChange={(e) => setPass(e.target.value)} toggleMask />
                                <label style={{ marginTop: "-10px", backgroundColor: "white", paddingLeft: "15px" }} htmlFor="password">Password</label>
                                {
                                    err.pass && (
                                        <p style={{ color: "red", fontSize: "10px", marginLeft: "25px" }}>Invalid Password</p>
                                    )
                                }
                            </span>

                            <div >
                                <Checkbox style={{ backgroundColor: 'rgb(0, 180, 180)', marginRight: "15px", marginLeft: "0px" }} inputId="rem1" name="Remember" onChange={onRemChange} checked={rem} />
                                <label style={{ position: "absolute", marginTop: "15px" }} htmlFor="rem1" className="ml-2"> Remember me</label>
                            </div>
                            <br />

                            <Toast id="apToast" ref={toast} />

                            <button id="colabBtn" onClick={() => {
                                handleLogin();
                            }} style={{ width: "300px", borderTopRightRadius: "0px", borderBottomLeftRadius: "0px" }}>Login</button>

                        </div>
                    </div>
                </>
                // )
            }

        </>
    );
}

export default SignIn;
