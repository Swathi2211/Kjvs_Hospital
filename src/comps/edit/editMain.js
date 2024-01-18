import React, { useEffect, useRef, useState } from "react";
import "./editMain.css";
import photo from "../../img/africa.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";

function EditMain(props) {
  const [editMode, setEditMode] = useState(false);

  const location = useLocation();
  const info = new URLSearchParams(location.search).get('info');
  const user = info ? JSON.parse(info) : null;

  const [obj, setObj] = useState({ ...user });

  const [passwordValid, setPasswordValid] = useState(true);

  // useEffect(() => {
  //   setObj({ ...user });
  // }, []);

  const [save, setSave] = useState(true);

  const changeHandler = (e) => {
    setObj((prevObj) => ({ ...prevObj, [e.target.name]: e.target.value }));
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    console.log(obj);
    axios.put(`http://localhost:8080/employee/update/${obj._id}`, obj)
      .then((res) => {
        console.log("Successfully Updated");
      })
      .catch((err) => {
        console.log(err);
      });
    showSuccessMessage();
    back();
  };

  function back() {
    setTimeout(() => {
      window.history.back();
    }, 500);
  }

  const date = user.dob;
  const dObj = new Date(date);


  useEffect(() => {
    const timerId = setTimeout(() => {
      validPw(obj.password);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [obj.password]);

  function validPw(pw) {
    const uAlp = /[A-Z]/;
    const Num = /[0-9]/;
    const sChar = /[!@#$%^&*()]/;

    if (pw === "" || !uAlp.test(pw) || !Num.test(pw) || !sChar.test(pw) || !(pw.length >= 8 && pw.length <= 12)) {
      setPasswordValid(false);
      setSave(true);
    } else {
      setPasswordValid(true);
      setSave(false);
    }
  }

  const toast = useRef(null);

  const showSuccessMessage = () => {
    toast.current.show({ severity: 'success', summary: 'Changed', detail: 'Successfully', life: 3000 });
  };


  return (
    <>


      <div style={{ backgroundColor: "rgba(210, 210, 210, 0.216)", height: "750px", display: "grid", gridTemplateColumns: "15% 20% 50% 15%", paddingTop: "130px" }}>
        <div></div>

        <div style={{ width: "250px", height: "300px", backgroundColor: "white", textAlign: "center", border: "1px solid rgb(26, 180, 118)" }}>
          <h3>{user.fname} {user.lname}</h3>
          <p>{user.job.name}</p>
          <div>
            <img src={require(`../../profile/${user.photos}`)} alt="none" height="100px" width="100px" style={{ backgroundColor: "black", borderRadius: "100%", margin: "20px" }} /><br />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>ID</label>
            <label></label>
            <input style={{ width: "120px", marginLeft: "45px" }} value={`${obj.userId}`} disabled /><br />

            <label style={{ fontWeight: "bold" }}>DOB</label>
            <label></label>
            <input style={{ width: "120px", marginLeft: "30px" }} value={new Date(obj.dob).toLocaleDateString()} disabled /><br />

            <label style={{ fontWeight: "bold" }}>Gender</label>
            <label></label>
            <input style={{ width: "120px", marginLeft: "10px" }} value={obj.gender} disabled /><br />
          </div>
        </div>

        <div style={{ border: "1px solid rgb(26, 180, 118)", height: "505px" }}>
          <div style={{ backgroundColor: "rgb(26, 180, 118)", height: "100px", padding: "25px" }}>
            <h1 style={{ color: "white" }}>Edit Profile</h1>
          </div>
          <div style={{ backgroundColor: "white", height: "400px", padding: "25px" }}>
            <label style={{ fontWeight: "bold" }} className="label" >Current Address</label>
            <textarea id="input" style={{ marginLeft: "183px", height: "50px" }} name="tempAddr" value={obj.currAddr} onChange={changeHandler} disabled={!editMode} /><br />

            <label style={{ fontWeight: "bold" }} className="label" >Permanent Address</label>
            <textarea id="input" style={{ marginLeft: "183px", height: "50px" }} name="permAddr" value={obj.permAddr} onChange={changeHandler} disabled={!editMode} /><br />

            <label style={{ fontWeight: "bold" }} className="label">Email</label>
            <label className="colon"> </label>
            <input id="input" name="email" value={obj.email} onChange={changeHandler} disabled={!editMode} /><br />

            <label style={{ fontWeight: "bold" }} className="label">Password</label>
            <label className="colon"> </label>
            <input id="input" name="password" value={obj.password} onChange={changeHandler} disabled={!editMode} /><br />

            {!passwordValid && (
              <>
                <i class="fa-solid fa-arrow-turn-up fa-rotate-270" style={{ color: "rgba(243, 8, 8)", marginLeft:"717px", position:"absolute", marginTop:"-40px", fontSize:"25px" }}></i>
                <div style={{ position: "absolute", width: "200px", backgroundColor: "rgba(243, 8, 8, 0.2)", padding: "10px", left: "1280px", top: "465px" }}>

                  <p style={{ color: "red", fontSize: "12px" }}>**Password must have at least 1 Uppercase, 1 Number, 1 Special Character, and be 8-12 characters long.</p>
                </div>
              </>
            )}<br />

            <div style={{ marginTop: "-20px" }}>
              <label style={{ fontWeight: "bold" }} className="label">Phone Number</label>
              <label className="colon"> </label>
              <input id="input" style={{}} name="phone" value={obj.phone} onChange={changeHandler} disabled={!editMode} /><br />
            </div>

            <Toast id="apToast" ref={toast} />
            <button id="edit1Btn" onClick={editMode ? handleSaveClick : handleToggleEditMode} disabled={save}>
              {editMode ? "Save" : "Edit"}
            </button>
          </div>
        </div>
        <div>
          <button onClick={() => back()} id="cros" style={{ marginLeft: "-27px", borderTopRightRadius: "0px", marginTop: "0px", color: "white" }}>
            x
          </button>
        </div>
      </div>



    </>
  );
}

export default EditMain;
