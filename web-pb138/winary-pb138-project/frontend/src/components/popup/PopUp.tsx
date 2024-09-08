import { useState } from "react";
import "./popUp.css"

interface PopUpProps {
    message: string;
}

const PopUp = ({ message }: PopUpProps) => {
    const [showPopUp, setShowPopUp] = useState(true);

    const handleClose = () => {
        setShowPopUp(false);
    }

    return (
        <>
            { showPopUp && (
                <div className="popup">
                    <span className="popup__close-btn" onClick={handleClose}>X</span>
                    {message}
                </div>
            )
            }
        </>
    );
};

export default PopUp;