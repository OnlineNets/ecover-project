import React from "react";

const InsertCard = ({insertImage}) => {
    return (
        <img src={insertImage} className="image-card" alt="insert" style={{width: '110px', height: '110px', textAlign: 'center'}} />
    )
}

export default InsertCard;