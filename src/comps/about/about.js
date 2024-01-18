import { useEffect, useState } from "react";
import Collab from "../main/Collab";
import Doctors from "../main/Doctors";
import InfoBox from "../main/InfoBox";
import Menu from "../main/Menu";
import SkeletAbout from "../skeleton/skeletAbout";

function About() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API/data loading delay
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {
                loading ? (
                    <SkeletAbout />
                ) : (
                    <>
                        <Menu />
                        <Collab />
                        <p style={{ marginBottom: "100px" }}></p>
                        <Doctors />
                        <p style={{ marginBottom: "200px" }}></p>
                        <InfoBox />
                    </>
                )
            }



        </>
    )
}

export default About;