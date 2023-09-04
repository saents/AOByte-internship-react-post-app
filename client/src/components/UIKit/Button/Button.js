import React from "react";
import "./Button.css";


function Button({
                    className, disabled, onClick, children,
                }) {
    return (
        <button disabled={disabled} className={` ${className} button`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
