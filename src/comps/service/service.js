import Menu from "../main/Menu";
import Service from "../main/Service";

import cc from "../../img/child.jpg";
import pers from "../../img/pers.jpg";
import ct from "../../img/ct.jpg";
import joint from "../../img/joint.jpg";
import alz from "../../img/alzh.jpg";
import lab from "../../img/exam.jpg";
import InfoBox from "../main/InfoBox";
import SkeletService from "../skeleton/skeletService";
import { useEffect, useState } from "react";

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
];



function Services() {

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
                    <SkeletService />
                ) : (
                    <>
                        <Menu />
                        <div id="service" style={{ padding: "100px" }}>
                            <h1 id="frText" style={{ fontSize: "60px", marginBottom: "80px", textAlign: "center", color: "rgb(4, 146, 113)", marginTop: "-30px" }}>Our Services</h1>

                            <p  id="frText" style={{ textAlign: "justify", marginTop: "-30px", marginBottom: "100px" }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio corporis modi suscipit nisi est, ducimus iste! Quam laborum esse, dolores adipisci consequatur vitae consequuntur veniam earum accusantium? Qui suscipit iste illum id </p>

                            <p id="frText" style={{ textAlign: "justify", marginTop: "-80px" }}>error praesentium assumenda, rem ducimus sint magni nobis ab excepturi ad eum, sequi cupiditate architecto! Rem earum laborum sunt, sed corrupti architecto ex quia corporis expedita distinctio, itatibus earum unde, blanditiis recusandae eos exercitationem voluptate corrupti nam ad ut facilis et quos aliquam ex quasi. Aperiam doloribus fugiat expedita amet eaque autem quaerat consectetur velit repellendus illo perspiciatis ipsam nobis quisquam similique eos, fugit id perferendis vero, reiciendis eius? Repudiandae beatae perferendis facere vel, maiores nihil eaque amet sequi modi? Repellat?  </p>

                            <p id="frText" style={{ textAlign: "justify", marginTop: "20px" }}> nobis, est eaque enim voluptate voluptatum laboriosam laborum adipisci odit eveniet delectus veniam saepe ducimus eos rem omnis ullam molestiae ipsum recusandae officia voluptatibus corporis. Modi consequuntur, fuga iusto nobis sint sapiente veniam molestiae soluta dicta!</p>

                            <div style={{ marginBottom: "100px" }}></div>

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
                        <InfoBox />
                    </>
                )
            }
        </>
    )
}

export default Services;