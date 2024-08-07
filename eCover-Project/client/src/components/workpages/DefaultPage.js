import React, { useEffect, useState } from "react";
import './ImagePagesStyle.css';
import { useSelector } from "react-redux";
import Spinner from '../layout/Spinner';

import ImageEditor from "../imageeditor/ImageEditor";

//// Mycovers component connected with Mycovers tab on create cover main page
const DefaultPage = ({bgImageSelected, loadPreDesign, setFinalizeSelected}) => {
    const [muWidth, setMuWidth] = useState(0);
    const [muHeight, setMuHeight] = useState(0);
    let bgWidth;
    let bgHeight;
    let dx;
    let dy;
    const {loading} = useSelector(state => state.workingMockup);
    const bgInfo = useSelector(state => state.selectBackground);
    const bg_loading = bgInfo.loading;
    useEffect(() => {
            // console.log(data);
            // console.log(bgInfo.color + "+++++++++++++")
          
                setMuWidth(0);
                setMuHeight(0);

    }, [bgInfo]);
    
    bgWidth = 600;
    bgHeight = 600 / bgInfo.width * bgInfo.height;
    if(loading === false) {
        dx = (muWidth - bgWidth) / 2;
        dy = (muHeight - bgHeight) /2;
    }
    
    
    const noImage = (
        <>
            {loading === true ? (
                <div className="loading-spinner">
                    <Spinner />
                </div>
            ) : (
                (
                    <div style={{width: `${muWidth}px`, height: `${muHeight}px`, backgroundColor: 'white'}}></div>
                )
            )}
        </>
    )

    const image = (
        bgInfo.color === null ? 
            (
                <div style={{zIndex: '100', position: 'absolute', top: `${dy}px`, left: `${dx}px`, width: `${bgWidth}px`, height: `${bgHeight}px`, opacity: '0.5'}}>
                    <img src={bgInfo.url} alt="result" style={{zIndex: '100', position: 'absolute', width: `${bgWidth}px`, height: `${bgHeight}px`}} />
                </div>
            ) :
        bgInfo.url === null ?
            (
                <div style={{zIndex: '100', position: 'absolute', top: `-20px`, left: `-20px`, width: `${bgWidth}px`, height: `${bgHeight}px`, opacity: '0.5'}}>
                    <div style={{zIndex: '100', position: 'absolute', width: `${muWidth+40}px`, height: `${muHeight+40}px`, backgroundColor: bgInfo.color}}></div>
                </div>
                
            ) :
            <></>
    )
    const loadedPage = (
        <div style={{alignItems: "center", justifyContent: "center", zIndex: '0'}}>
            {
                bgImageSelected === true ? (
                    <div style={{position: 'relative'}}>
                      <div style={{zIndex: '0', position: "relative", top: '0', left: '0'}}>
                        {noImage}
                      </div>
                      {bg_loading === true ? (   
                            <div  className="loading-spinner" style={{zIndex: '100', position: 'absolute'}}>
                                <Spinner />
                            </div>
                        ) : (
                                image
                        )}
                      
                    </div>
                ) : 
                bgImageSelected === false ? (
                    <h1>Please Choose your Mock Up</h1>
                ) : noImage
            }
            
        </div>
    );

    const clickPage = () =>{
        setFinalizeSelected(false);
    }

    return (
        <div className="default-page" onMouseUp={clickPage}>
            
            {/* {loadedPage} */}
            <ImageEditor loadPreDesign={loadPreDesign}/>
        </div>
    )
}
export default DefaultPage;