import React, { useEffect, useState } from "react"
import './editPopup.css'
import Profile from './profile.js'

function Popup(props){
    const [onHoverX, setOnHoverX] = React.useState(false);
    const [onHoverSave, setOnHoverSave] = React.useState(false);
    const [toEdit, settoEdit] = React.useState(true);
    const [userEdit, setUserEdit] = React.useState("");
    const [biographyEdit, setBiographyEdit] = React.useState("");
    //sets hover on x out to true
    const handleHoverX = () => {
        setOnHoverX(true);
    };
    //sets hover on x out to false
    const handleNotHoverX = () => {
        setOnHoverX(false);
    };
    //sets hover on save to true
    const handleHoverSave = () => {
        setOnHoverSave(true);
    };
    //sets hover on save to false
    const handleNotHoverSave = () => {
        setOnHoverSave(false);
    };
    //removes any saved text from biography section
    const handleBioClear = () => {
        setBiographyEdit("");
    }
    //removes any saved text from username section
    const handleUserClear = () => {
        setUserEdit("");
    }
    //sets edit variable to false
    const handleClickOut = () => {
        settoEdit(false);
        console.log('clicked ?', toEdit)
    }
    //changes userEdit variable to whatever is typed
    const handleUserEdit = (event) => {
        setUserEdit(event.target.value);
        console.log('new name', userEdit);

    }
    //changes biographyEdit variable to whatever is typed
    const handleBioEdit = (event) => {
        setBiographyEdit(event.target.value);
        console.log('new bio', biographyEdit);

    }
    //checks whether new chose username is already taken, if not goes to change it
    const handleUsernameCheck = async (event) => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({userEdit})
        };
        const response = await fetch("/usernameCheckMultiple", requestOptions);
        console.log("Response status check:", response.status);
        if (response.ok) {
            await handleUsernameChange();
        }
        else {
            alert("Error changing usernameCheck");
        }
    }
    //changes username 
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
        }
        else {
            alert("Error changing usernameChange");
        }
    }
    //changes biography
    const handleBioChange = async (event) => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({biographyEdit})
        };
        const response = await fetch("/biographyChange", requestOptions);
        console.log("Response status:", response.status);
        if (response.ok) {
            const biography = await response.json();
            console.log(userEdit);
        }
        else {
            alert("Error changing bioChange");
        }
    }
    //whenever the prop is triggered to true it resets the variables
    useEffect(() => {
        handleBioClear();
        handleUserClear();
      }, [props.trigger]);

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
                        <input type="text" name="Edit-name" placeholder="Username" className="Username" onChange={handleUserEdit} maxLength={32}></input>
                </form>
            </div>
            <div className="Description-edit-section">
                <div className="Description-text-box-back">
                    <textarea className="Edit-description-area" placeholder="Biography" onChange={handleBioEdit} maxLength={255}>
                        {/* <input type="text" name="Edit-description" placeholder="Description" className="Description"></input> */}
                    </textarea>
                </div>
            </div>   
            <button className="Profile-save-button"
                            onMouseEnter={handleHoverSave}
                            onMouseLeave={handleNotHoverSave}
                            style={{backgroundColor: onHoverSave ? 'pink':''}}
                            onMouseDown={() => {props.setTrigger(false); handleNotHoverSave();handleClickOut(); 
                                if (userEdit !== '') {
                                handleUsernameCheck(); 
                                console.log('ttttrrue'); 
                                console.log(userEdit);
                                }
                                if (biographyEdit !== ''){ 
                                    handleBioChange();
                                    console.log('truddcd');
                                    console.log(biographyEdit);
                                }
                            }}
                            >
                            Save Changes
            </button>
        </div>
    </div>
) : "";
}

export default Popup;