import React, { useEffect, useState } from "react";

import './ImagePagesStyle.css';
import BackgroundCard from "./subtools/BackgroundCard";
import ColorCard from "./subtools/ColorCard";
import UploadImagesPage from "./UploadImagesPage"

const BackgroundPage = ({setBgImageSelected, setBackgroundSelected, setUploadImagesSelected}) => {
    const [bgFrom, setBgFrom] = useState(1);
    const [customColor, setCustomColor] = useState('#ffffff');

    const activeBgFrom = () => {
        if(bgFrom === 1) {
            document.getElementById('select-bg-class-library').style.backgroundColor = '#00baad';
            document.getElementById('select-bg-class-stock').style.backgroundColor = '#525454';
            document.getElementById('select-bg-class-upload').style.backgroundColor = '#525454';
        }
        if(bgFrom === 2) {
            document.getElementById('select-bg-class-library').style.backgroundColor = '#525454';
            document.getElementById('select-bg-class-stock').style.backgroundColor = '#00baad';
            document.getElementById('select-bg-class-upload').style.backgroundColor = '#525454';
        }
        if(bgFrom === 3) {
            document.getElementById('select-bg-class-library').style.backgroundColor = '#525454';
            document.getElementById('select-bg-class-stock').style.backgroundColor = '#525454';
            document.getElementById('select-bg-class-upload').style.backgroundColor = '#00baad';
        }
    }

    useEffect(() => {
        activeBgFrom();
    }, [bgFrom]);

    const bgFromLibrary = () => {
        setBgFrom(1);
    }
    const bgFromStock = () => {
        setBgFrom(2);
    }
    const bgFromUpload = () => {
        setBgFrom(3);
    }

    const libraries = [
        // 'https://m.aplus.io/app/backgrounds/colorful/024.jpg',
        // 'https://m.aplus.io/app/backgrounds/colorful/030.jpg',
        // 'https://img.freepik.com/free-photo/gelato-ice-cream-shop-logo-with-wrinkled-paper-texture-remixed-media_53876-126835.jpg?size=626&ext=jpg&uid=R110516327&ga=GA1.1.552866607.1689920344&semt=sph'
    ];
    const colors = [
        '#cacaca',
        '#2f2f2f',
        '#121212',
        '#c70039',
        '#ff5733',
        '#ff8d1a',
        '#ffc300',
        '#eddd53',
        '#add45c',
        '#57c785',
        '#00baad',
        '#2a7b9b',
        '#3d3d6b',
        '#511849',
        '#900c3f',
    ];

    const libraryPage = (
        <div className="background-page-body">
            <div className="bg-library-page-header">
                Click on an image to set as your background
            </div>
            <div className="bg-library-page-body">
                {/* {libraries.map((url, index) => {
                    return (<BackgroundCard url = {url} setBgImageSelected={setBgImageSelected} setBackgroundSelected={setBackgroundSelected} index={index} />)
                })} */}
            </div>
        </div>
    );
    const stockPage = (
        <div>
            TODO : STOCK
        </div>
    );
    const uploadPage = (
        <div className="background-page-body">
            {/* <UploadImagesPage setUploadImagesSelected={setUploadImagesSelected} setBackgroundSelected={setBackgroundSelected} setBgImageSelected={setBgImageSelected} /> */}
        </div>
    )
    
    return (
        <div style={{marginTop: '10px'}}>
            <div className="background-page-header">
                PICK A SOLID COLOR
            </div>
            <div id="pick-color-board">
                <input type="color" className="color-card-custom" onChange={e => setCustomColor(e.target.value)} />
                <ColorCard color={customColor} setBgImageSelected={setBgImageSelected} setBackgroundSelected={setBackgroundSelected} />
                {colors.map((color, key) => <ColorCard key={key} color={color} setBgImageSelected={setBgImageSelected} setBackgroundSelected={setBackgroundSelected} />)}
            </div>
            <div className="select-bg-class">
                <div id="select-bg-class-library" onClick={bgFromLibrary}>LIBRARY</div>
                <div id="select-bg-class-stock" onClick={bgFromStock}>STOCK IMAGE</div>
                <div id="select-bg-class-upload" onClick={bgFromUpload}>MY UPLOADS</div>
            </div>
            {bgFrom === 1 ? libraryPage :
             bgFrom === 2 ? stockPage :
             uploadPage}
        </div>
    )
}

export default BackgroundPage;