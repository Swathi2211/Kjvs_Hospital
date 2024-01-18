import { Link, useLocation } from "react-router-dom";
import logo from "../../img/Venk_logo.png";
import "../main/Menu.css";



function Menu() {

    const location = useLocation();

    return (
        <>


            <div id="pmenu">

                <div style={{ display: "flex" }}>
                    <img src={logo} alt="none" height={"70px"} width={"70px"} />
                    <h2 style={{ marginLeft: "10px", fontSize: "30px", marginTop: "20px" }} >Kjvs</h2>
                    <hr style={{ transform: "rotate(180deg)", height: "40px", marginTop: "20px", marginLeft: "40px" }} />
                </div>

                <div id="midText" style={{ marginTop: "30px" }}>
                    <Link style={{ color: location.pathname === '/' ? 'teal' : 'inherit', fontWeight: location.pathname === '/' ? "bold" : "inherit", textDecoration: location.pathname === '/' ? "underline" : "inherit" }} to="/">
                        <p>HOME</p>
                    </Link>
                    <Link style={{ color: location.pathname === '/about' ? 'teal' : 'inherit', fontWeight: location.pathname === '/about' ? "bold" : "inherit", textDecoration: location.pathname === '/about' ? "underline" : "inherit" }} to="/about">
                        <p>ABOUT</p>
                    </Link>
                    <Link style={{ color: location.pathname === '/service' ? 'teal' : 'inherit', fontWeight: location.pathname === '/service' ? "bold" : "inherit", textDecoration: location.pathname === '/service' ? "underline" : "inherit" }} to="/service">
                        <p>SERVICES</p>
                    </Link>
                    <Link style={{ color: location.pathname === '/contact' ? 'teal' : 'inherit', fontWeight: location.pathname === '/contact' ? "bold" : "inherit", textDecoration: location.pathname === '/contact' ? "underline" : "inherit" }} to="/contact">
                        <p>CONTACT</p>
                    </Link>
                </div>

                <div id="midText" style={{ justifyContent: "space-around", marginTop: "15px" }}>

                    <hr style={{ transform: "rotate(180deg)", height: "40px", marginTop: "5px" }} />

                    <Link style={{ color: location.pathname === '/appointment' ? 'teal' : 'inherit', fontWeight: location.pathname === '/appointment' ? "bold" : "inherit", textDecoration: location.pathname === '/appointment' ? "underline" : "inherit" }} to="/appointment">
                        <p><i className="fa-solid fa-phone-volume" style={{ color: "rgb(0, 140, 124)", marginRight: "10px", marginTop:"15px" }}></i>Emergency Call</p>
                    </Link>

                    <Link to="/sign-in">
                        <button style={{ marginTop: "5px", marginLeft: "20px" }}>Login</button>
                    </Link>
                </div>

            </div>
            <hr style={{ marginTop: "-90px" }} />

        </>
    )
}

export default Menu;