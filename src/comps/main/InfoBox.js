import "./InfoBox.css";
import bglogo from '../../img/Venk_logo.png';


function InfoBox() {



    return (
        <>

            <div id="endpar">

                <div className="endchild">
                    <div id="endflex1" style={{ marginLeft: "-10px" }}>
                        <div>
                            <img src={bglogo} width="70px" height="70px" alt="none" />
                        </div>
                        <div style={{ marginTop: "25px", marginLeft: "10px" }}>
                            <h2 id="ppp">Meddic</h2>
                        </div>
                    </div>




                    <p style={{ marginTop: "20px", marginBottom: "20px" }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat suscipit architecto quidem omnis tempora iusto optio reprehenderit impedit, doloribus sapiente!
                    </p>
                    <ul type="none" id="logos" style={{ marginLeft: "-8px" }}>
                        <li><button onClick={()=>{window.open("www.facebook.com","_blank")}}><i class="fa-brands fa-facebook-f fa-xl"></i></button></li>
                        <li><button onClick={()=>{window.open("www.twitter.com","_blank")}}><i class="fa-brands fa-twitter fa-xl" ></i></button></li>
                        <li><button onClick={()=>{window.open("www.linkedin.com","_blank")}}><i class="fa-brands fa-linkedin-in fa-xl"></i></button></li>
                    </ul>
                </div>

                <div className="endchild2" id="bbb">
                    <h3>Department</h3>
                    <hr id="hr" style={{ width: "32%" }} />
                    <ul type="none">
                        <li>Surgery</li>
                        <li>Women's Health</li>
                        <li>Radiology</li>
                        <li>Cardiac</li>
                        <li>Child's Health</li>
                        <li>Medicine</li>
                    </ul>
                </div>

                <div className="endchild3" id="bbb">
                    <h3>Support</h3>
                    <hr id="hr" style={{ width: "29%" }} />
                    <ul type="none">
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Company Support</li>
                        <li>FAQuestions</li>
                        <li>Company Licence</li>
                        <li>About Us</li>
                    </ul>
                </div>

                <div className="endchild3" id="bbb">
                    <h3>Get In Touch</h3>
                    <hr id="hr" />
                    <p><i class="fa-solid fa-envelope fa-xl" style={{ color: "#16926d", marginRight: "10px" }}></i>Suport Available for 24/7</p>
                    <h2>Support@email.com</h2>
                    <p><i class="fa-sharp fa-solid fa-user-nurse fa-xl" style={{ color: "rgb(10, 161, 126)", marginRight: "10px", }}></i>Mon to Fri : 08:30 - 18:00</p>
                    <h2>+23-567-8990</h2>
                </div>

            </div>

            <div id="copy">
                <h4>Copyright &copy; 2023</h4>
            </div>

        </>
    )
}

export default InfoBox;