import { useEffect, useState } from "react";
import "../history/Hmain.css";
import axios from "axios";

function Hmain(props) {
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        console.log(props.history)
        axios.get(`http://localhost:8080/patient/unique/${props.history}`)
            .then((res) => {
                setHistoryData(res.data); // Set the fetched data to state
            })
            .catch((err) => {
                console.log("");
            });
    }, [props.history]);

    return (
        <>
            <div className="example" style={{ height: "550px", width: "1000px", overflowY: "scroll"}}>
                <p style={{ textAlign: "center", fontSize: "20px", fontFamily: "monospace" , fontWeight:"bolder"}}>History Record</p>
                <table className="histTable" id="kay" border="1px" style={{ borderCollapse: "collapse" }}>
                    <thead id="head">
                        <tr className="history" style={{ fontWeight: "500", fontFamily:"monospace", fontWeight:"bold", fontSize:"15px", border:"1px solid black" }}>
                            <td>Last Visit</td>
                            <td>Height</td>
                            <td>Weight</td>
                            <td>BMI</td>
                            <td>Prescription</td>
                            <td>Test Taken</td>
                        </tr>
                    </thead>
                    <tbody id="tabHis">
                        {historyData.map((record, index) => (
                            <tr key={index}>
                                <td>{record.todayDate}</td>
                                <td>{record.height}</td>
                                <td>{record.weight}</td>
                                <td>{record.bmi}</td>
                                <td style={{textAlign:"center"}}>
                                    <ol style={{textAlign:"left"}}>
                                        {
                                            record.prescription.map((e) => (
                                                <li>{e.mname}</li>
                                            ))
                                        }
                                    </ol>
                                </td>
                                <td>
                                    <ol style={{textAlign:"left"}}>
                                        {
                                            record.test.map((e, i) => (
                                                <li>{e}</li>
                                            ))
                                        }
                                    </ol>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Hmain;
