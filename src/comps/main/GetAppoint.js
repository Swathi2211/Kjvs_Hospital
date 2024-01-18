import { Link, useLocation } from "react-router-dom";
import "./GetAppoint.css";
import { useEffect } from "react";


function GetAppoint() {

    const location = useLocation();

    useEffect(() => {
        // Scroll to the top when the route changes
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>

            <div id="appimg" style={{ marginTop: "150px" }}></div>

            <div id="appwri">
                <hr />
                <h1>We are pleased to offer you the chance to have the healhty</h1>
                <Link to="/service"><button id="colabBtn">Learn More</button></Link>
            </div>


        </>
    )
}

export default GetAppoint;