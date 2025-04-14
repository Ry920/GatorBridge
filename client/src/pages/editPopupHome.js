import React, { useState } from "react"
import './editPopupHome.css'

function Popup(props){
    const [postText, setPostText] = React.useState("");
    const [textSize, setTextSize] = React.useState(255);
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (textSize < 0) return;
        const requestOptions = {
          method: "6",
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
          body: JSON.stringify({ postText })
        };
        const response = await fetch('/userpost', requestOptions);
        if (!response.ok) {
          alert('Error posting');
        }
        else {
          alert('Posted!');
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
            <div className="Title-edit-section">
                <form className="Edit-username-form">
                        <input type="text" name="Edit-name" placeholder="Title of Post" className="Title"></input>
                </form>
            </div>
            <div className="Description-edit-section">
                <div className="Description-text-box-back">
                    <textarea placeholder="What do you want to discuss?" class="Edit-description-area"
                    onChange={(e) => {setPostText(e.target.value); setTextSize(255 - e.target.value.length)}}>
                    </textarea>
                </div>
            </div>   
            <button className="create-post-button"
                            onMouseEnter={handleHoverSave}
                            onMouseLeave={handleNotHoverSave}
                            style={{backgroundColor: onHoverSave ? 'pink':''}}
                            onMouseDown={(e) => {props.setTrigger(false); handleNotHoverSave();handleClickOut();handleSubmit(e);}}
                            >
                            CREATE POST
            </button>
        </div>
    </div>
) : "";
}

export default Popup;