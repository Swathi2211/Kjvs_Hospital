import { Link } from "react-router-dom";
import lady from "../../img/lefteyeCopy.jpg";
import gents from "../../img/threeCut.jpg";

import "./Collab.css";

function Collab() {
    return (
        <>

            <div style={{display:"flex", justifyContent:"space-evenly", marginTop:"100px"}}>
                <div>
                    <img src={lady} alt="none" width="300px" height="550px" style={{borderRadius:"20px"}}/>
                </div>
                <div>
                    <img src={gents} alt="none"  width="300px" height="550px" style={{borderRadius:"20px", marginTop:"40px", marginLeft:"-100px"}} />
                </div>
                <div style={{width:"500px", marginTop:"90px"}}>
                    <p id="colab" style={{marginBottom:"20px"}}>ABOUT MEDDIC</p>
                    <p style={{fontSize:"40px"}}>We Collaborate for Better Healthcare</p>
                    <p style={{marginTop:"20px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque maiores cumque mollitia perspiciatis. Ipsa delectus libero esse ad illum cupiditate!</p>
                    <div style={{display:"flex", marginLeft:"-20px"}}>
                        <div style={{padding:"20px"}}>
                            <p  style={{fontSize:"20px"}}>Our Vision</p>
                            <p>We never get behind of the lastest medical trends. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div style={{padding:"20px"}}>
                            <p style={{fontSize:"20px"}}>Our Mission</p>
                            <p>The most interesting hospital in the world. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    
                    <Link to="/service"><button id="colabBtn" >Learn More</button></Link>
                
                </div>
            </div>

        </>
    )
}

export default Collab;