import React, { useEffect } from "react"
import "./profile.css"
import pfp from "../R.jpg"
import Popup from "./editPopup.js"
import { Link } from "react-router";

function Profile(){
    const [username, setUsername] = React.useState("");
    const [toEdit, settoEdit] = React.useState(false);
    const [onHover, setOnHover] = React.useState(false);
    const [descriptionText, setDescriptionText] = React.useState("");
    const handleDescriptionFetch = async (event) => {
        // event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        };
        const response = await fetch("/biography", requestOptions);
        console.log("Response status:", response.status);
        if (response.ok) {
            const desc = await response.json();
            console.log(desc[0].biography);
            setDescriptionText(desc[0].biography);
        }
        else {
            alert("Error fetching biography");
        }
        }
    const handleUserSetDef = async (event) =>{
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        };
        const response = await fetch("/userSetDef", requestOptions);
        console.log("Response status:", response.status);
        if (response.ok) {
            await handleUsernameFetch();
        }
        else {
            alert("Error setting default username");
        }
    }    
    const handleUsernameCheck = async (event) => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        };
        const response = await fetch("/usernameCheckDefault", requestOptions);
        console.log("Response status:", response.status);
        if (response.ok) {
            const data = await response.json();
            if (data.userNull){
                await handleUserSetDef();
            }
            else{
                await handleUsernameFetch();
            }
        }
        else {
            alert("Error changing usernameCheck");
        }
    }    
    const handleUsernameFetch = async (event) => {
        // event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        };
        const response = await fetch("/username", requestOptions);
        console.log("Response status:", response.status);
        if (response.ok) {
            const user = await response.json();
            console.log(user[0].username);
            setUsername(user[0].username);
        }
        else {
            alert("Error fetching username");
        }
        }
    const handleHover = () => {
        setOnHover(true);
    };
    const handleNotHover = () => {
        setOnHover(false);
    };
    const handleEditClick = () => {
        settoEdit(true);
        console.log('clicked ?', toEdit);
    };

    useEffect(() => {
        handleUsernameCheck();
        handleDescriptionFetch();
      });

    return(
        <div className="Profile">
            <div className="Profile-background"></div>
            <div className="Profile-page"
            style={{filter: toEdit ? 'blur(5px)':''}} >
                <div className="Rectangle">
                    <form className="Search-bar">
                        <input type="text" name="Search-bar" placeholder="Search..." className="Search" ></input>
                    </form>
                </div>
                <div className="Profile-top">
                    <div className="Profile-picture-square">
                        <div className="Profile-picture-back">
                            <div className="Profile-picture">
                                <img src={pfp} alt="profile-pic"></img>
                            </div>
                        </div>
                    </div>
                    <div className="Profile-info-square">
                        <div className="Profile-user-edit">
                            <div className="Profile-info-username">
                                <h1>{username}</h1>
                            </div>
                            <button className="Profile-edit-button"placeholder="Edit Profile"
                                onMouseEnter={handleHover}
                                onMouseLeave={handleNotHover}
                                style={{backgroundColor: onHover ? toEdit ? "":"pink":""}}
                                onMouseDown={() => handleEditClick()}
                                >
                                Edit Profile
                            </button>
                        </div>
                        <div>
                            <p className="Profile-info-description">{descriptionText}</p>
                        </div>
                    </div>
                </div>  
            </div>
            <Popup trigger={toEdit} setTrigger={settoEdit}></Popup>
        </div>
    );
}

export default Profile