import React from "react";
import { addUploadedImage } from "../../../actions/editedImage";
import { useDispatch } from "react-redux";

const UploadImageCard = ({url, setBgImageSelected, setUploadImagesSelected, setBackgroundSelected}) => {
    const dispatch = useDispatch();

    const onClick = (url) => {
        setUploadImagesSelected(false);
        dispatch(addUploadedImage(url));
        const div = document.querySelector('.FIE_image-tool-button');

        //console.log(div); 
        // Trigger the click event
        const event = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        if(div) div.dispatchEvent(event); 
    }
    return (
        <div >
            <img 
                src = {url} 
                alt="Uploaded"  
                className="image-card" 
                onClick={()=>onClick(url)} 
                crossOrigin="anonymous"    
            />
        </div>
    )
}

export default UploadImageCard;