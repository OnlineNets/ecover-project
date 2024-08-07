import React from "react";
import { useDispatch } from "react-redux";
import  {selectBackground}  from "../../../actions/background";

const BackgroundCard = ({url, setBgImageSelected, setBackgroundSelected, index}) => {
    
    const dispatch = useDispatch()
    const onClick = () => {
        setBackgroundSelected(false);
        setBgImageSelected(true)
        dispatch(selectBackground(url, index));
        console.log(url,index)
    }
    return (
    <div>
        <img src = {url} alt="testimg"  className="image-card" onClick={onClick}/>
    </div>
    )
}

export default BackgroundCard;