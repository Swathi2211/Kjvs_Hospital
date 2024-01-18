import React, { useEffect, useState } from 'react';
import InfoBox from '../main/InfoBox';
import Menu from '../main/Menu';
import SkeletCont from '../skeleton/skeletCont';

function Contact() {
    const copyToClipboard = () => {
        const phoneNumber = document.getElementById('phoneNumber');
        const textArea = document.createElement('textarea');

        textArea.value = phoneNumber.innerText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // You can add a visual indication or a notification that the text has been copied
        alert('Phone number copied to clipboard!');
    };


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
                    <SkeletCont />
                ) : (
                    <>
                        <Menu />

                        <div style={{ width: "600px", height: "200px", border: "2px solid rgb(0, 169, 124)", margin: "200px", marginLeft: "450px", borderRadius: "10px", display: "flex" }}>
                            <div>
                                <i style={{ fontSize: "100px", marginTop: "65px", marginLeft: "100px", color: "rgb(0, 169, 124)" }} className="fa-solid fa-phone-volume fa-bounce"></i>
                            </div>
                            <div>
                                <a href="#" onClick={copyToClipboard}>
                                    <p id="phoneNumber" style={{ fontSize: "30px", marginTop: "75px", marginLeft: "70px" }}>+23-567-8990</p>
                                </a>
                            </div>
                        </div>

                        <InfoBox />
                    </>
                )
            }
        </>
    );
}

export default Contact;
