
import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import "./main.css";

export default function SkeletService() {
    return (
        <div className="card">
            <div style={{ display: "flex" }} className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton id="fCir" shape="circle" size="4.5rem" className="mt-2"></Skeleton>
                <Skeleton id="fHeading" size="1.5rem"></Skeleton>

            </div>
            <hr style={{ transform: "rotate(90deg)", width: "40px", marginTop: "-55px", marginLeft: "340px", color: "grey" }} />
            <div style={{ display: "flex", marginTop: "-60px", marginLeft: "450px" }} className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton id="fHeading1" size="1.5rem"></Skeleton>
                <Skeleton id="fHeading1" size="1.5rem"></Skeleton>
                <Skeleton id="fHeading1" size="1.5rem"></Skeleton>
                <Skeleton id="fHeading1" size="1.5rem"></Skeleton>
            </div>
            <hr style={{ transform: "rotate(90deg)", width: "40px", marginTop: "-10px", marginLeft: "1010px", color: "grey" }} />
            <div style={{ display: "flex", marginTop: "-60px", marginLeft: "1070px" }} className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton id="fHeading3" size="1.5rem"></Skeleton>
                <Skeleton id="fHeading" size="2rem"></Skeleton>
            </div>

            <hr style={{ marginTop: "50px" }} />

            <div style={{ display: "flex", marginTop: "0px", marginLeft: "250px" }} className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton id="serv1" size="4rem"></Skeleton>
            </div>

            <div style={{ marginTop: "0px", marginLeft: "20px" }} className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton id="serv2" size="1rem"></Skeleton>
                <Skeleton id="serv3" size="5rem"></Skeleton>
                <Skeleton id="serv4" size="3rem"></Skeleton>

            </div>
            <div style={{ display: "flex", marginTop: "40px", marginLeft: "140px" }}>

                <Skeleton id="serv5" size="7rem"></Skeleton>
                <Skeleton id="serv6" size="7rem"></Skeleton>
                <Skeleton id="serv7" size="7rem"></Skeleton>

            </div>




        </div>
    );
}
