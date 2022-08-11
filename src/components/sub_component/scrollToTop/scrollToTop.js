
import React, { useState, useEffect } from "react";


const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div
            className="top-to-btm"
            style={{
                position: 'fixed',
                zIndex: '2',
                bottom: 0,
                left: 0,
                margin: '2rem',
                cursor: 'pointer',
                color: '#C93A87',
                fontSize: '30px'
            }}>
           
            {showTopBtn && (
                <i className="fa-solid fa-circle-arrow-up" onClick={goToTop}></i>
            )}
        </div>
    );
};
export default ScrollToTop;