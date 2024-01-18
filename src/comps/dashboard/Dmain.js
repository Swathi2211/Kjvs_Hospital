import axios from "axios";
import Dcont from "./Dcont";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import KjvsLoader from "../skeleton/skeletKJVS";

// const now = {
//     name: "Nora Watson",
//     job: "Front Desk Officer"
// }

function Dmain(props) {

    const [dis, setDis] = useState([]);
    const location = useLocation();
    const user = new URLSearchParams(location.search).get('id');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API/data loading delay
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        axios.get(`http://localhost:8080/employee/unique/${user}`)
            .then((e) => {
                setDis(e.data);
                console.log(e.data);
            })
            .catch((err) => {
                console.log(err);
            });

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>

            {
                loading ? (
                    <KjvsLoader />
                ) : (
                    <>
                        <Dcont info={dis[0]} />
                    </>
                )
            }

        </>
    )
}

export default Dmain;