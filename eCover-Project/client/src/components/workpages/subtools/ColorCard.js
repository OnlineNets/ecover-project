import React from "react";
import { selectColor } from "../../../actions/background";
import { useDispatch } from "react-redux";

const ColorCard = ({color, setBgImageSelected, setBackgroundSelected}) => {
    const dispatch = useDispatch();
    const colorSelected = () => {
        setBgImageSelected(true);
        setBackgroundSelected(false);
        dispatch(selectColor(color));
    }
    return (
        <div className="color-card" style={{backgroundColor: color}} onClick={colorSelected}>
        </div>
    )
}

export default ColorCard;