import React, { useState } from "react"
import './editPopup.css'

function Popup(props){
    const [onHover, setOnHover] = React.useState(false);
    const [toEdit, settoEdit] = React.useState(true);
    const handleHover = () => {
        setOnHover(true);
    };
    const handleNotHover = () => {
        setOnHover(false);
    };
    const handleClickOut = () => {
        settoEdit(false);
        console.log('clicked ?', toEdit)
    }
return(props.trigger) ? (
    <div className="edit-popup">
        <div className="edit-inner">
            <button className="close-button"
            onMouseDown={() => {props.setTrigger(false); handleNotHover();}}
            onMouseEnter={handleHover}
            onMouseLeave={handleNotHover}
            style={{backgroundColor: onHover ? "pink":"inherit", color: onHover ? "white":"black"}}
            >X</button>
            {props.children}
        </div>
    </div>
) : "";
}

export default Popup;