import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const LikeButton = () => {

    const [liked, setLiked] = useState(false);

    return (
        <div>
            <button className="like-button" onClick={() => setLiked(!liked)}>
                {!liked && <FaRegHeart size={36} />}
                {liked && <FaHeart size={36} />}
            </button>
        </div>
    )
}

export default LikeButton;