import Front from "./Front";

import Menu from "./Menu";

import cc from "../../img/child.jpg";
import pers from "../../img/pers.jpg";
import ct from "../../img/ct.jpg";
import joint from "../../img/joint.jpg";
import alz from "../../img/alzh.jpg";
import lab from "../../img/exam.jpg";
import Service from "./Service";
import Dark from "./Dark";
import Collab from "./Collab";
import GetAppoint from "./GetAppoint";
import Doctors from "./Doctors";
import InfoBox from "./InfoBox";
import SkeletMain from "../skeleton/skeletMain";
import { useEffect } from "react";
import { useState } from "react";

const data = [
  {
    title: "Child care",
    img_path: cc
  },
  {
    title: "Personal Care",
    img_path: pers
  },
  {
    title: "CT Scan",
    img_path: ct
  },
  {
    title: "Joint replacement",
    img_path: joint
  },
  {
    title: "Examination & Diagnosis",
    img_path: lab
  },
  {
    title: "Alzheimer's disease",
    img_path: alz
  }
]


const dark_data = [
  {
    title: "Expert Doctors",
    icon: "fa-sharp fa-solid fa-user-doctor"
  },
  {
    title: "Emergency Care",
    icon: "fa-solid fa-hospital"
  },
  {
    title: "24/7 Full Support",
    icon: "fa-solid fa-phone-volume"
  }
]


function Main() {

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
          <SkeletMain />
        ) : (
          <>
            <Menu />
            <Front />

            {/* DARK */}

            <div id="dark" style={{ backgroundColor: "rgba(2, 150, 78, 0.848)", marginTop: "0px" }}>

              <div id="parent" style={{ display: "flex", padding: "20px", marginLeft: "40px" }}>
                {
                  dark_data.map((obj, ind) => {

                    return <Dark
                      key={ind}
                      title={obj.title}
                      icon={obj.icon}
                    />
                  })
                }
              </div>

            </div>

            {/* MY SERVICE */}

            <div id="service" style={{ marginTop: "100px", marginLeft: "100px" }}>
              <h1 style={{ fontSize: "60px", marginBottom: "80px", marginLeft: "475px", marginTop: "80px", color: "rgb(4, 146, 113)" }}>Our Services</h1>
              <div id="parent" style={{ display: "grid", gridTemplateColumns: "30% 30% 30%", marginLeft: "110px" }}>
                {
                  data.map((obj, ind) => {

                    return <Service
                      key={ind}
                      title={obj.title}
                      img_path={obj.img_path}
                    />
                  })
                }
              </div>
            </div>

            <Collab />

            <GetAppoint />

            <Doctors />

            <InfoBox />
          </>
        )
      }

    </>
  )

}

export default Main;