import React, { useState } from "react"
import './editPopup.css'

function Popup(props){
    const [onHoverX, setOnHoverX] = React.useState(false);
    const [onHoverSave, setOnHoverSave] = React.useState(false);
    const [toEdit, settoEdit] = React.useState(true);
    const handleHoverX = () => {
        setOnHoverX(true);
    };
    const handleNotHoverX = () => {
        setOnHoverX(false);
    };
    const handleHoverSave = () => {
        setOnHoverSave(true);
    };
    const handleNotHoverSave = () => {
        setOnHoverSave(false);
    };
    const handleClickOut = () => {
        settoEdit(false);
        console.log('clicked ?', toEdit)
    }
return(props.trigger) ? (
    <div className="edit-popup">
        <div className="edit-inner">
            <button className="close-button"
            onMouseDown={() => {props.setTrigger(false); handleNotHoverX(); handleClickOut();}}
            onMouseEnter={handleHoverX}
            onMouseLeave={handleNotHoverX}
            style={{backgroundColor: onHoverX ? "pink":"inherit", color: onHoverX ? "white":"black"}}
            >X</button>
            {props.children}
            <div className="User-edit-section">
                <form className="Edit-username-form">
                        <input type="text" name="Edit-name" placeholder="Username" className="Username"></input>
                </form>
            </div>
            <div className="Description-edit-section">
                <div className="Description-text-box-back">
                    <textarea className="Edit-description-area" placeholder="Biography">
                        {/* <input type="text" name="Edit-description" placeholder="Description" className="Description"></input> */}
                    </textarea>
                </div>
            </div>   
            <button className="Profile-save-button"
                            onMouseEnter={handleHoverSave}
                            onMouseLeave={handleNotHoverSave}
                            style={{backgroundColor: onHoverSave ? 'pink':''}}
                            onMouseDown={() => {props.setTrigger(false); handleNotHoverSave();handleClickOut();}}
                            >
                            Save Changes
            </button>
        </div>
    </div>
) : "";
}

export default Popup;