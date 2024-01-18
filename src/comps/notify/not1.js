import axios from "axios";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Not1() {

    const [user, setProps1] = useState([]);
    let [lst, setLst] = useState([]);

    const location = useLocation();
    const info = new URLSearchParams(location.search).get('info');

    let [fdu, setfdu] = useState([]);
    let [fdo, setfdo] = useState([]);
    let [dru, setdru] = useState([]);
    let [dro, setdro] = useState([]);
    let [hru, sethru] = useState([]);
    let [hro, sethro] = useState([]);
    let [fda, setfda] = useState([]);
    let [dra, setdra] = useState([]);

    let [val, setVal] = useState({
        du: false,
        do: false,
        da: false,
        fu: false,
        fo: false,
        fa: false,
        ho: false,
        hu: false
    });

    useEffect(() => {

        axios.get(`http://localhost:8080/employee/unique/${info}`)
            .then((e) => {
                setProps1(e.data[0]);
                console.log(e.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get('http://localhost:8080/leave/fetch')
            .then((response) => {
                setLst(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    


    function fdufunc() {
        setfdu(lst.filter((e, k) => {
            return e.id == user.userId && e.id.startsWith("FD");
        }));
        setVal((prev) => ({
            du: false,
            do: false,
            da: false,
            fu: true,
            fo: false,
            fa: false,
            ho: false,
            hu: false
        }));
        console.log(fdu);
    }
    function fdofunc() {
        setfdo(lst.filter((e, k) => {
            return e.id != user.userId && e.id.startsWith("FD");
        }));
        setVal((prev) => ({
            du: false,
            do: false,
            da: false,
            fu: false,
            fo: true,
            fa: false,
            ho: false,
            hu: false
        }));
        console.log(fdo);
    }

    function hrufunc() {
        sethru(lst.filter((e, k) => {
            return e.id == user.userId && e.id.startsWith("HR");
        }));
        setVal((prev) => ({
            du: false,
            do: false,
            da: false,
            fu: false,
            fo: false,
            fa: false,
            ho: false,
            hu: true
        }));
        console.log(hru);
    }
    function hrofunc() {
        sethro(lst.filter((e, k) => {
            return e.id != user.userId && e.id.startsWith("HR");
        }));
        setVal((prev) => ({
            du: false,
            do: false,
            da: false,
            fu: false,
            fo: false,
            fa: false,
            ho: true,
            hu: false
        }));
        console.log(hro);
    }

    function drufunc() {
        setdru(lst.filter((e, k) => {
            return e.id == user.userId && e.id.startsWith("DR");
        }));
        setVal((prev) => ({
            du: true,
            do: false,
            da: false,
            fu: false,
            fo: false,
            fa: false,
            ho: false,
            hu: false
        }));
        console.log(dru);
    }
    function drofunc() {
        setdro(lst.filter((e, k) => {
            return e.id != user.userId && e.id.startsWith("DR");
        }));
        setVal((prev) => ({
            du: false,
            do: true,
            da: false,
            fu: false,
            fo: false,
            fa: false,
            ho: false,
            hu: false
        }));
        console.log(dro);
    }

    function fdafunc() {
        setfda(lst.filter((e, k) => {
            return e.id.startsWith("FD");
        }));
        setVal((prev) => ({
            du: false,
            do: false,
            da: false,
            fu: false,
            fo: false,
            fa: true,
            ho: false,
            hu: false
        }));
        console.log(fda);
    }
    function drafunc() {
        setdra(lst.filter((e, k) => {
            return e.id.startsWith("DR");
        }));
        setVal((prev) => ({
            du: false,
            do: false,
            da: true,
            fu: false,
            fo: false,
            fa: false,
            ho: false,
            hu: false
        }));
        console.log(dra);

    }


    const [filterText, setFilterText] = useState("");
    const filterData = (data) => {
        return data.filter(e => e.name.toLowerCase().includes(filterText.toLowerCase()));
    }

    const [visibleMap, setVisibleMap] = useState({});


    return (
        <div>

            <div id="bgGray" style={{ position: "absolute" }}>
            </div>


            <div style={{ position: "relative" }}>

                <div>
                    <i class="fa-regular fa-paper-plane" style={{ color: "#f3ff47", fontSize: "25px", marginTop: "20px", marginLeft: "10px" }}><span style={{ fontSize: "10px", marginLeft: "10px" }}> Notification</span></i>
                    <i style={{ color: "white", marginLeft: "400px", position: "absolute", marginTop: "38px", fontSize: "13px" }} class="fa-solid fa-magnifying-glass"></i>
                    <input value={filterText}
                        onChange={(e) => setFilterText(e.target.value)} style={{ width: "500px", backgroundColor: "rgba(255,255,255,0.4)", color: "white", borderRadius: "10px", border: "none", paddingLeft: "60px", paddingRight: "20px", position: "absolute", top: "20px", left: "500px", height: "50px" }} />
                </div>



                <div style={{ height: "600px", backgroundColor: "rgba(255,255,255,0.3)", width: "1300px", borderRadius: "20px", textAlign: "center", marginLeft: "110px", marginTop: "80px" }}>

                    {
                        info.startsWith("FD") && (
                            <div>
                                <button id="fhd" onClick={() => fdufunc()}>You</button>
                                <button id="fhd" onClick={() => fdofunc()}>Other FDs</button>
                            </div>
                        )
                    }





                    {
                        info.startsWith("DR") && (
                            <div>
                                <button id="fhd" onClick={() => drufunc()}>You</button>
                                <button id="fhd" onClick={() => drofunc()}>Other DRs</button>
                            </div>
                        )
                    }

                    {
                        info.startsWith("HR") && (
                            <div>
                                <button id="fhd" onClick={() => hrufunc()}>You</button>
                                <button id="fhd" onClick={() => hrofunc()}>Other HRs</button>
                                <button id="fhd" onClick={() => drafunc()}>DRs</button>
                                <button id="fhd" onClick={() => fdafunc()}>FDs</button>
                            </div>
                        )
                    }


                    <div style={{ height: "500px", overflowY: "scroll", scrollbarWidth: "none", overflowX: "hidden" }}>


                        {
                            val.da && (
                                filterData(dra).map((e, k) => (

                                    <>
                                        <div className="boxFil" key={k} style={{ display: "flex" }} onClick={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: !prevVisibleMap[k] }))} >

                                            {e.name.toLowerCase().includes(filterText.toLowerCase()) && <>
                                                <div style={{ display: "flex", width: "300px" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <input id="chk" type="checkbox" style={{ width: "18px", height: "18px", marginRight: "15px" }} />
                                                        </div>
                                                        <div style={{ marginTop: "6px" }}>
                                                            <i style={{ color: "black", fontSize: "14px", marginRight: "15px" }} class="fa-regular fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: "8px" }}>
                                                        <p style={{ fontWeight: "bold" }}>{e.name}</p>
                                                    </div>

                                                </div>


                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.reason}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.email}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "200px" }}>
                                                    <p>{e.phone}</p>
                                                </div>

                                                <div style={{ marginLeft: "50px", marginTop: "7px" }}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </div>
                                            </>}


                                        </div>

                                        <Dialog style={{ backgroundColor: "white", width: "150px" }} visible={visibleMap[k]} onHide={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: false }))}>
                                            <table border={"1px"} style={{ textAlign: "center", margin: "25px" }}>
                                                <thead>
                                                    <tr>
                                                        <td style={{ padding: "15px" }}>Dates</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        e.date.map((ele, id) => {
                                                            return (
                                                                <tr>
                                                                    <td style={{ padding: "5px" }}>{ele}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Dialog>
                                    </>

                                ))
                            )
                        }



                        {
                            val.du && (
                                filterData(dru).map((e, k) => (

                                    <>
                                        <div className="boxFil" key={k} style={{ display: "flex" }} onClick={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: !prevVisibleMap[k] }))} >

                                            {e.name.toLowerCase().includes(filterText.toLowerCase()) && <>
                                                <div style={{ display: "flex", width: "300px" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <input id="chk" type="checkbox" style={{ width: "18px", height: "18px", marginRight: "15px" }} />
                                                        </div>
                                                        <div style={{ marginTop: "6px" }}>
                                                            <i style={{ color: "black", fontSize: "14px", marginRight: "15px" }} class="fa-regular fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: "8px" }}>
                                                        <p style={{ fontWeight: "bold" }}>{e.name}</p>
                                                    </div>

                                                </div>


                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.reason}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.email}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "200px" }}>
                                                    <p>{e.phone}</p>
                                                </div>

                                                <div style={{ marginLeft: "50px", marginTop: "7px" }}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </div>
                                            </>}


                                        </div>

                                        <Dialog style={{ backgroundColor: "white", width: "150px" }} visible={visibleMap[k]} onHide={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: false }))}>
                                            <table border={"1px"} style={{ textAlign: "center", margin: "25px" }}>
                                                <thead>
                                                    <tr>
                                                        <td style={{ padding: "15px" }}>Dates</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        e.date.map((ele, id) => {
                                                            return (
                                                                <tr>
                                                                    <td style={{ padding: "5px" }}>{ele}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Dialog>
                                    </>

                                ))
                            )
                        }




                        {
                            val.do && (
                                filterData(dro).map((e, k) => (

                                    <>
                                        <div className="boxFil" key={k} style={{ display: "flex" }} onClick={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: !prevVisibleMap[k] }))} >

                                            {e.name.toLowerCase().includes(filterText.toLowerCase()) && <>
                                                <div style={{ display: "flex", width: "300px" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <input id="chk" type="checkbox" style={{ width: "18px", height: "18px", marginRight: "15px" }} />
                                                        </div>
                                                        <div style={{ marginTop: "6px" }}>
                                                            <i style={{ color: "black", fontSize: "14px", marginRight: "15px" }} class="fa-regular fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: "8px" }}>
                                                        <p style={{ fontWeight: "bold" }}>{e.name}</p>
                                                    </div>

                                                </div>


                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.reason}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.email}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "200px" }}>
                                                    <p>{e.phone}</p>
                                                </div>

                                                <div style={{ marginLeft: "50px", marginTop: "7px" }}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </div>
                                            </>}








                                        </div>

                                        <Dialog style={{ backgroundColor: "white", width: "150px" }} visible={visibleMap[k]} onHide={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: false }))}>
                                            <table border={"1px"} style={{ textAlign: "center", margin: "25px" }}>
                                                <thead>
                                                    <tr>
                                                        <td style={{ padding: "15px" }}>Dates</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        e.date.map((ele, id) => {
                                                            return (
                                                                <tr>
                                                                    <td style={{ padding: "5px" }}>{ele}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Dialog>
                                    </>

                                ))
                            )
                        }





                        {
                            val.fo && (
                                filterData(fdo).map((e, k) => (

                                    <>
                                        <div className="boxFil" key={k} style={{ display: "flex" }} onClick={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: !prevVisibleMap[k] }))} >

                                            {e.name.toLowerCase().includes(filterText.toLowerCase()) && <>
                                                <div style={{ display: "flex", width: "300px" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <input id="chk" type="checkbox" style={{ width: "18px", height: "18px", marginRight: "15px" }} />
                                                        </div>
                                                        <div style={{ marginTop: "6px" }}>
                                                            <i style={{ color: "black", fontSize: "14px", marginRight: "15px" }} class="fa-regular fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: "8px" }}>
                                                        <p style={{ fontWeight: "bold" }}>{e.name}</p>
                                                    </div>

                                                </div>


                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.reason}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.email}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "200px" }}>
                                                    <p>{e.phone}</p>
                                                </div>

                                                <div style={{ marginLeft: "50px", marginTop: "7px" }}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </div>
                                            </>}








                                        </div>

                                        <Dialog style={{ backgroundColor: "white", width: "150px" }} visible={visibleMap[k]} onHide={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: false }))}>
                                            <table border={"1px"} style={{ textAlign: "center", margin: "25px" }}>
                                                <thead>
                                                    <tr>
                                                        <td style={{ padding: "15px" }}>Dates</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        e.date.map((ele, id) => {
                                                            return (
                                                                <tr>
                                                                    <td style={{ padding: "5px" }}>{ele}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Dialog>
                                    </>

                                ))
                            )
                        }




                        {
                            val.fu && (
                                filterData(fdu).map((e, k) => (

                                    <>
                                        <div className="boxFil" key={k} style={{ display: "flex" }} onClick={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: !prevVisibleMap[k] }))} >

                                            {e.name.toLowerCase().includes(filterText.toLowerCase()) && <>
                                                <div style={{ display: "flex", width: "300px" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <input id="chk" type="checkbox" style={{ width: "18px", height: "18px", marginRight: "15px" }} />
                                                        </div>
                                                        <div style={{ marginTop: "6px" }}>
                                                            <i style={{ color: "black", fontSize: "14px", marginRight: "15px" }} class="fa-regular fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: "8px" }}>
                                                        <p style={{ fontWeight: "bold" }}>{e.name}</p>
                                                    </div>

                                                </div>


                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.reason}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.email}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "200px" }}>
                                                    <p>{e.phone}</p>
                                                </div>

                                                <div style={{ marginLeft: "50px", marginTop: "7px" }}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </div>
                                            </>}








                                        </div>

                                        <Dialog style={{ backgroundColor: "white", width: "150px" }} visible={visibleMap[k]} onHide={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: false }))}>
                                            <table border={"1px"} style={{ textAlign: "center", margin: "25px" }}>
                                                <thead>
                                                    <tr>
                                                        <td style={{ padding: "15px" }}>Dates</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        e.date.map((ele, id) => {
                                                            return (
                                                                <tr>
                                                                    <td style={{ padding: "5px" }}>{ele}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Dialog>
                                    </>

                                ))
                            )
                        }




                        {
                            val.fa && (
                                filterData(fda).map((e, k) => (

                                    <>
                                        <div className="boxFil" key={k} style={{ display: "flex" }} onClick={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: !prevVisibleMap[k] }))} >

                                            {e.name.toLowerCase().includes(filterText.toLowerCase()) && <>
                                                <div style={{ display: "flex", width: "300px" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <input id="chk" type="checkbox" style={{ width: "18px", height: "18px", marginRight: "15px" }} />
                                                        </div>
                                                        <div style={{ marginTop: "6px" }}>
                                                            <i style={{ color: "black", fontSize: "14px", marginRight: "15px" }} class="fa-regular fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: "8px" }}>
                                                        <p style={{ fontWeight: "bold" }}>{e.name}</p>
                                                    </div>

                                                </div>


                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.reason}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.email}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "200px" }}>
                                                    <p>{e.phone}</p>
                                                </div>

                                                <div style={{ marginLeft: "50px", marginTop: "7px" }}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </div>
                                            </>}








                                        </div>

                                        <Dialog style={{ backgroundColor: "white", width: "150px" }} visible={visibleMap[k]} onHide={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: false }))}>
                                            <table border={"1px"} style={{ textAlign: "center", margin: "25px" }}>
                                                <thead>
                                                    <tr>
                                                        <td style={{ padding: "15px" }}>Dates</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        e.date.map((ele, id) => {
                                                            return (
                                                                <tr>
                                                                    <td style={{ padding: "5px" }}>{ele}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Dialog>
                                    </>

                                ))
                            )
                        }



                        {
                            val.hu && (
                                filterData(hru).map((e, k) => (

                                    <>
                                        <div className="boxFil" key={k} style={{ display: "flex" }} onClick={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: !prevVisibleMap[k] }))} >

                                            {e.name.toLowerCase().includes(filterText.toLowerCase()) && <>
                                                <div style={{ display: "flex", width: "300px" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <input id="chk" type="checkbox" style={{ width: "18px", height: "18px", marginRight: "15px" }} />
                                                        </div>
                                                        <div style={{ marginTop: "6px" }}>
                                                            <i style={{ color: "black", fontSize: "14px", marginRight: "15px" }} class="fa-regular fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: "8px" }}>
                                                        <p style={{ fontWeight: "bold" }}>{e.name}</p>
                                                    </div>

                                                </div>


                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.reason}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.email}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "200px" }}>
                                                    <p>{e.phone}</p>
                                                </div>

                                                <div style={{ marginLeft: "50px", marginTop: "7px" }}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </div>
                                            </>}








                                        </div>

                                        <Dialog style={{ backgroundColor: "white", width: "150px" }} visible={visibleMap[k]} onHide={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: false }))}>
                                            <table border={"1px"} style={{ textAlign: "center", margin: "25px" }}>
                                                <thead>
                                                    <tr>
                                                        <td style={{ padding: "15px" }}>Dates</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        e.date.map((ele, id) => {
                                                            return (
                                                                <tr>
                                                                    <td style={{ padding: "5px" }}>{ele}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Dialog>
                                    </>

                                ))
                            )
                        }





                        {
                            val.ho && (
                                filterData(hro).map((e, k) => (

                                    <>
                                        <div className="boxFil" key={k} style={{ display: "flex" }} onClick={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: !prevVisibleMap[k] }))} >

                                            {e.name.toLowerCase().includes(filterText.toLowerCase()) && <>
                                                <div style={{ display: "flex", width: "300px" }}>
                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <input id="chk" type="checkbox" style={{ width: "18px", height: "18px", marginRight: "15px" }} />
                                                        </div>
                                                        <div style={{ marginTop: "6px" }}>
                                                            <i style={{ color: "black", fontSize: "14px", marginRight: "15px" }} class="fa-regular fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: "8px" }}>
                                                        <p style={{ fontWeight: "bold" }}>{e.name}</p>
                                                    </div>

                                                </div>


                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.reason}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "300px" }}>
                                                    <p>{e.email}</p>
                                                </div>

                                                <div style={{ marginTop: "7px", width: "200px" }}>
                                                    <p>{e.phone}</p>
                                                </div>

                                                <div style={{ marginLeft: "50px", marginTop: "7px" }}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </div>
                                            </>}







                                        </div>

                                        <Dialog style={{ backgroundColor: "white", width: "150px" }} visible={visibleMap[k]} onHide={() => setVisibleMap((prevVisibleMap) => ({ ...prevVisibleMap, [k]: false }))}>
                                            <table border={"1px"} style={{ textAlign: "center", margin: "25px" }}>
                                                <thead>
                                                    <tr>
                                                        <td style={{ padding: "15px" }}>Dates</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        e.date.map((ele, id) => {
                                                            return (
                                                                <tr>
                                                                    <td style={{ padding: "5px" }}>{ele}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Dialog>
                                    </>

                                ))
                            )
                        }








                    </div>
                </div>




            </div>



        </div>
    )
}

export default Not1;