
import { useEffect, useState } from "react";
import Menu from "../main/Menu";
import SkeletApp from "../skeleton/skeletApp";
import AppCont from "./appCont";

function Appoint() {

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
                    <SkeletApp />
                ) : (
                    <>
                        <Menu />
                        <AppCont />
                    </>
                )
            }

        </>
    )
}

export default Appoint;