import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const StarButton = () => {

    const [starred, setStarred] = useState(false);

    return (
        <div>
            <button className="like-button" onClick={() => setStarred(!starred)}>
                {!starred && <FaRegStar size={40} />}
                {starred && <FaStar size={40} />}
            </button>
        </div>
    )
}

export default StarButton;