import React, { useEffect } from "react"
import "./profile.css"
import pfp from "../R.jpg"
import homeImg from "../home-button.svg"
import Popup from "./editPopup.js"
import { Link, useParams } from "react-router";

function Profile(){
    const {email} = useParams();
    console.log("email:::", email);
    const [username, setUsername] = React.useState("");
    const [toEdit, settoEdit] = React.useState(false);
    const [onHover, setOnHover] = React.useState(false);
    const [ownProfile, setOwnProfile] = React.useState(false);
    const [descriptionText, setDescriptionText] = React.useState("");
    // fetches biography text from server
    const handleDescriptionFetch = async (event) => {
        // event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({email})
        };
        const response = await fetch("/biography", requestOptions);
        console.log("Response status:", response.status);
        if (response.ok) {
            const desc = await response.json();
            console.log(desc);
            setDescriptionText(desc[0].biography);
            
        }
        else {
            alert("Error fetching biography");
        }
        }
    // sets state if logged-in user is viewing their own profile
    const handleSetUserProf = async() =>{
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({email})
        };
        const response = await fetch("/userSetOwnProf", requestOptions);
        if (response.ok) {
            const data = await response.json();
            if (data.selfProf){
                setOwnProfile(true);
                console.log("users prof");
            }
            else{
                setOwnProfile(false);
                console.log("not users prof");
            }
        }
        else {
            alert("Error changing usernameCheck");
        }
    }
    // sets default username if it hasn't been set yet
    const handleUserSetDef = async (event) =>{
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({email})
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
    // checks if user has a username set
    const handleUsernameCheck = async (event) => {
        console.log("on user check", email);
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({email})
        };
        const response = await fetch("/usernameCheckDefault", requestOptions);
        console.log("Response status:", response.status);
        if (response.ok) {
            const data = await response.json();
            if (data.userNull){
                await handleUserSetDef();
                console.log("data was null")
            }
            else{
                await handleUsernameFetch();
                console.log("data was not null")
            }
        }
        else {
            alert("Error changing usernameCheck");
        }
    }    
    // fetches username from backend
    const handleUsernameFetch = async (event) => {
        // event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({email})
        };
        console.log("handling fetch")
        const response = await fetch("/username", requestOptions);
        console.log("Response status:", response.status);
        if (response.ok) {
            const user = await response.json();
            console.log(user);
            setUsername(user[0].username);
        }
        else {
            alert("Error fetching username");
        }
        }
    // renders buttons 
    function HandleButton(ownProfile){
        console.log("in handle button");
        if (ownProfile === true){
            console.log("true button")
            return(
                <button className="Profile-edit-button"
                placeholder="Edit Profile"
                onMouseEnter={handleHover}
                onMouseLeave={handleNotHover}
                style={{backgroundColor: onHover ? toEdit ? "":"pink":""}}
                onMouseDown={() => handleEditClick()}
                >
                Edit Profile
            </button>  
            )
        }
        else{
            console.log("false button");
            return(
            <button className="Profile-edit-button"
                placeholder="Follow"
                onMouseEnter={handleHover}
                onMouseLeave={handleNotHover}
                style={{backgroundColor: onHover ? toEdit ? "":"pink":""}}
                >
                Follow
            </button>
            )
        }
    }
    // handles hover for edit/follow button
    const handleHover = () => {
        setOnHover(true);
    };
    const handleNotHover = () => {
        setOnHover(false);
    };
    // toggles the edit popup
    const handleEditClick = () => {
        settoEdit(true);
        console.log('clicked ?', toEdit);
    };
    // fetch profile data 
    useEffect(() => {
        handleUsernameCheck();
        handleDescriptionFetch();
      });
      useEffect(() => {
        handleSetUserProf();
      }, []);

    return(
        <div className="Profile">
            <div className="Profile-background"></div>
            <div className="Profile-page"
            style={{filter: toEdit ? 'blur(5px)':''}} >
                <div className="Nav-bar">
                    <Link to= "/home" >
                    <img src={homeImg} className="homeImage"></img>
                    </Link>
                    <div className="Rectangle">
                        <form className="Search-bar">
                            <input type="text" name="Search-bar" placeholder="Search..." className="Search" ></input>
                        </form>
                    </div>
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
                            {HandleButton(ownProfile)}
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

export default Profile;