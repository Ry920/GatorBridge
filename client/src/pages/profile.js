import React from "react"
import "./profile.css"
import pfp from "../R.jpg"
import Popup from "./editPopup.js"

function Profile(){
    const [toEdit, settoEdit] = React.useState(false);
    const [onHover, setOnHover] = React.useState(false);
    const handleHover = () => {
        setOnHover(true);
    };
    const handleNotHover = () => {
        setOnHover(false);
    };
    const handleEditClick = () => {
        settoEdit(!toEdit);
        console.log('clicked ?', toEdit)
    }
    return(
        <div className="Profile">
            <div className="Profile-background"></div>
            <div className="Profile-page"
            style={{filter: toEdit ? "none":"inherit"}}
            >
            <div className="Rectangle">
                <form className="Search-bar">
                    <input type="text" name="Search-bar" placeholder="Search..." className="Search"></input>
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
                            <h1>Username</h1>
                        </div>
                        <button className="Profile-edit-button"placeholder="Edit Profile"
                            onMouseEnter={handleHover}
                            onMouseLeave={handleNotHover}
                            style={{backgroundColor: onHover ? 'pink':''}}
                            onMouseDown={handleEditClick}
                            >
                            Edit Profile
                        </button>
                    </div>
                    <div>
                        <p className="Profile-info-description">Insert description her. Auto generate text is a feature in Microsoft Word that allows you to create reusable snippets of text that can be inserted into your document by typing a few characters. To use this feature, you need to select the text that you want to make into an AutoText entry, press Alt+F3, and give it a name </p>
                    </div>
                </div>
            </div>  
            </div>
            <Popup trigger={toEdit} setTrigger={settoEdit}></Popup>
        </div>
    );
}

export default Profile