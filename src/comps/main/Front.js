import grey from "../../img/greyHair.png";
import brown from "../../img/brownHair.png";
import long from "../../img/longHair.png";
import short from "../../img/shortHair.png";

import "./Front.css";
import { Link } from "react-router-dom";

function Front() {
    return (
        <div style={{ backgroundColor: "azure", height: "650px" }}>

            <div style={{ display: "grid", gridTemplateColumns: "60% 40%", margin: "200px", marginTop: "0px", height: "500px" }}>

                <div id="frText" style={{ marginTop: "150px" }} >
                    <p style={{ fontSize: "30px", color: "rgb(0, 160, 144)" }}>your health our care</p>
                    <h2 style={{ fontSize: "50px", marginTop: "40px" }}>Provide <span style={{ color: "rgb(0, 169, 124)" }}>comprehensive</span> healthcare services</h2>
                    <p style={{ fontSize: "20px", marginTop: "40px" }}>We offer a wide range of medical and healthcare services</p>
                    <Link to="/appointment">
                        <button id="bookBtn" ><i class="fa-solid fa-user-pen" ></i> Book an Appointment</button>
                    </Link>
                </div>

                <div id="photo-ani">
                    <img className="photo" src={grey} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={short} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={long} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={brown} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />

                    <img className="photo" src={grey} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={short} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={long} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={brown} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />

                    <img className="photo" src={grey} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={short} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={long} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={brown} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />

                    <img className="photo" src={grey} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={short} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={long} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                    <img className="photo" src={brown} alt="none" width={"100px"} height={"100px"} style={{ backgroundColor: "azure" }} />
                </div>

            </div>

        </div>
    )
}

export default Front;