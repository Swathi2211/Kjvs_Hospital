
import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import "./main.css";

export default function SkeletMain() {
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

            <div style={{  marginTop: "0px", marginLeft: "20px" }} className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton id="fHeading4" size="10rem"></Skeleton>
                <Skeleton id="fHeading5" size="2rem"></Skeleton>
                <Skeleton id="fHeading6" size="6rem"></Skeleton>
                <Skeleton id="fHeading7" size="2rem"></Skeleton>
                <Skeleton id="fHeading8" size="2.5rem"></Skeleton>  
            </div>

            <div style={{  marginTop: "0px", marginLeft: "20px" }} className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton id="fHeading9" size="10rem"></Skeleton> 
            </div>



        </div>
    );
}
