import React, { useState } from "react"
import './editPopup.css'
import Profile from './profile.js'

function Popup(props){
    const [onHoverX, setOnHoverX] = React.useState(false);
    const [onHoverSave, setOnHoverSave] = React.useState(false);
    const [toEdit, settoEdit] = React.useState(true);
    const [userEdit, setUserEdit] = React.useState("");
    const [biographyEdit, setBiographyEdit] = React.useState("");

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
    const handleUserEdit = (event) => {
        setUserEdit(event.target.value);
        console.log('new name', userEdit);

    }
    const handleUsernameCheck = async (event) => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({userEdit})
        };
        const response = await fetch("/usernameCheckMultiple", requestOptions);
        console.log("Response status:", response.status);
        if (response.ok) {
            await handleUsernameChange();
        }
        else {
            alert("Error changing usernameCheck");
        }
    }
    const handleUsernameChange = async (event) => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({userEdit})
        };
        const response = await fetch("/usernameChange", requestOptions);
        console.log("Response status:", response.status);
        if (response.ok) {
            const user = await response.json();
            console.log(userEdit);
            //Profile.setUsername(userEdit);
        }
        else {
            alert("Error changing usernameChange");
        }
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
                        <input type="text" name="Edit-name" placeholder="Username" className="Username" onChange={handleUserEdit}></input>
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
                            onMouseDown={() => {props.setTrigger(false); handleNotHoverSave();handleClickOut(); handleUsernameCheck();}}
                            >
                            Save Changes
            </button>
        </div>
    </div>
) : "";
}

export default Popup;