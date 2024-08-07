import React, { useState, useEffect } from "react";
import InsertCard from "./subtools/InsertCard";

const InsertImagePage = () => {
    const [status, setStatus] = useState(1);

    const activeStatus = () => {
        if(status === 1) {
            document.getElementById('insert-image-page-header-graphics').style.backgroundColor = '#85ce00';
            document.getElementById('insert-image-page-header-shapes').style.backgroundColor = '#50abff';
        }
        if(status === 2) {
            document.getElementById('insert-image-page-header-graphics').style.backgroundColor = '#50abff';
            document.getElementById('insert-image-page-header-shapes').style.backgroundColor = '#85ce00';
        }
    }

    const graphicsClicked = () => {
        setStatus(1);
    }
    const shapesClicked = () => {
        setStatus(2);
    }

    useEffect(() => {
        activeStatus();
    }, [status]);

    // const graphics = [
    //     'https://m.aplus.io/app/images/library/graphics/553.png',
    //     'https://m.aplus.io/app/images/library/graphics/554.png'
    // ];
    const graphics = [];
    const shapes = [];
    // const shapes = ['https://m.aplus.io/app/images/library/shapes/927.png'];

    const graphicsPage = (
        graphics.map(graphic => <InsertCard insertImage={graphic} />)
    )
    const shapesPage = (
        shapes.map(shape => <InsertCard insertImage={shape} />)
    )
    return (
        <div className="insert-image-page">
            <div className="insert-image-page-header">
                {/* <div id="insert-image-page-header-graphics" onClick={graphicsClicked}>
                    Graphics
                </div>
                <div id="insert-image-page-header-shapes" onClick={shapesClicked}>
                    Shapes
                </div> */}
            </div>
            <div className="insert-image-page-body">
                {status === 1 ? graphicsPage : shapesPage}
            </div>
        </div>
    )
}

export default InsertImagePage;