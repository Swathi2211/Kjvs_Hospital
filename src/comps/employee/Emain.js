import bglogo from '../../img/Venk_logo.png';
import Econt from './Econt';
import PassportPhotoUploader from './PassportPhotoUploader';


function Emain() {

    

    return (
        <>

            <div style={{ display: "grid", gridTemplateColumns: "20% 60% 20%" }}>
                <div style={{ backgroundColor: "rgba(250,250,250,0.6)" }}>
                </div>


                <div style={{backgroundColor:"white"}}>

                    <div style={{ display: "flex", padding: "30px", paddingTop: "50px" }}>
                        <div style={{}}>
                            <img src={bglogo} width="70px" height="70px" alt="none" />
                        </div>
                        <div style={{}}>
                            <h2 id="ppp" style={{ fontSize: "35px", marginLeft: "10px", marginTop: "15px" }}>Kjvs</h2>
                        </div>
                    </div>

                    <hr style={{ width: "92.5%", height: "2px", marginLeft: "30px", marginTop: "-25px", border: "none", backgroundColor: "rgba(255, 35, 32, 0.568)" }} />

                    <div id="barlow" style={{ marginLeft: "40px" }}>
                        <p style={{ marginTop: "10px" }}>12-B, Hyung Road, Nandanam, Chennai - 600021</p>
                        <p style={{ marginTop: "20px" }}>Ph : 044-5678 1212</p>
                        <p>Ph : 044-5689 5689</p>
                    </div>



                    <div style={{ marginLeft: "40px", marginTop: "-45px" }}>


                        <Econt />

                    </div>

                </div>

                <div style={{ backgroundColor: "rgba(250,250,250,0.6)" }}>

                </div>

            </div>


        </>
    )
}

export default Emain;