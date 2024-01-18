import React, { useRef } from "react";
import Navi2 from "./nav2";
import { useState } from "react";

function Navi() {

  const [activeElement, setActiveElement] = useState(null);

  const jhgfRef = useRef(null);
  const swatRef = useRef(null);

  const scrollToElement = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveElement(ref);
  };

  return (
    <div >
      <div style={{ padding: "50px" }}>
        <p style={{ textDecoration: activeElement === jhgfRef ? "underline" : "none" }} onClick={() => scrollToElement(jhgfRef)}>jhgf</p>
        <br />
        <p style={{ textDecoration: activeElement === swatRef ? "underline" : "none" }} onClick={() => scrollToElement(swatRef)}>swat</p>
      </div>

      <Navi2 jhgfRef={jhgfRef} swatRef={swatRef} />

    </div>
  );
}



export default Navi;
