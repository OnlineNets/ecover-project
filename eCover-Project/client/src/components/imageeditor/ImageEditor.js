import React, { useState, useEffect, useRef } from 'react';
import FilerobotImageEditor, { TABS, TOOLS} from '@dannyboy66/react-filerobot-image-editor';
import {getCurrentImgDataFnRef} from '@dannyboy66/react-filerobot-image-editor';
import './ImageEditor.css';

import logo from './logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setEditedImage, setCurrentState } from '../../actions/editedImage';

// image editor component 
function ImageEditor({loadPreDesign}) {
    const editedImage = useRef();
    //const refEditor = useRef();
 
    const {Selected, width, height} = useSelector(state=>state.workingMockup);
    const {edited, currentDesignState} = useSelector(state=>state.editedImage);
    const mockup = useSelector(state=>state.workingMockup);
    const Gallery = useSelector(state=>state.uploadImage.urls);

    const image = new Image();
    image.width = 200; // Set the desired width
    image.height = 150; // Set the desired height
    const [srcImage, setSrcImage] = useState(image);
    const [editorGallery, setEditorGallery] = useState([]);

    // const loadThumbnail = async (src) => {
    //   const image = new Image();
    //   image.src = src;
    //   await image.decode(); // Wait until image is fully loaded

    //   // Create a canvas element
    //   const canvas = document.createElement('canvas');
    //   canvas.width = 80; // Desired thumbnail width
    //   canvas.height = (image.height * canvas.width) / image.width; // Calculate height based on original aspect ratio

    //   // Resize original image to thumbnail size
    //   const ctx = canvas.getContext('2d');
    //   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
    //   // Convert canvas content to data URL of thumbnail
    //   console.log(image);
    //   const thumbnailDataUrl = canvas.toDataURL();
    //   return thumbnailDataUrl;
    // };
    
    useEffect(()=>{
      var gallery = [
        {
          originalUrl: "https://scaleflex.cloudimg.io/v7/demo/spencer-davis-unsplash.jpg",
          previewUrl: "https://scaleflex.cloudimg.io/v7/demo/spencer-davis-unsplash.jpg",
        },
        {
          originalUrl: "https://atomicecovers.s3.amazonaws.com/minion_celebrating_valentine%27s_day.png",
          previewUrl: "https://atomicecovers.s3.amazonaws.com/minion_celebrating_valentine%27s_day.png",
        }
        
      ];
      Gallery.map((image, key)=>{
        gallery = [
          ...gallery,
          {
            originalUrl: image.url, // The url of the image in original size to be added in canvas
            previewUrl: image.url, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
          }
        ];
      })
      setEditorGallery(gallery);
      //setEditorGallery([]);
    }, [Gallery]);

    useEffect(()=>{
      // console.log(loadPreDesign)
    }, [loadPreDesign])
    const dispatch = useDispatch();
  
    useEffect(()=>{
      //console.log("__________", edited);
      if(edited){
        if(editedImage != null && editedImage.current){
          const imageBase64 = editedImage?.current({}).imageData.imageBase64;
          const currentDesignState = editedImage?.current({}).designState;
          dispatch(setEditedImage(imageBase64));
          dispatch(setCurrentState(currentDesignState));
          //if(refEditor.current)  refEditor.current.setActiveTab(null);
        }
      }

    }, [edited]);

    const annotationsCommon = {
        fill: '#000000',
        stroke: '#999999',
        strokeWidth: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: '#999999',
        shadowOpacity: 1,
        opacity: 1,
    }

    // const  getModifiedState = (currentImageDesignState) =>{
    //   console.log(currentImageDesignState);
    //   dispatch(setCurrentState(currentImageDesignState));
    // }

    return (
      <div style = {{width: '80wh', height: '100%', margin: 'auto'}}>
        {/* {console.log(srcImage)} */}

        {(Selected  && mockup.editImage.length) ? (
          <FilerobotImageEditor
            loadableDesignState={loadPreDesign.designState}
            source={mockup.editImage}
            //ref={refEditor}
            useZoomPresetsMenu = {true}
            getCurrentImgDataFnRef={editedImage}
            // onModify = { (currentImageDesignState) =>{
            //   getModifiedState(currentImageDesignState);
            // }}
            disableZooming = {false}
            // loadableDesignState={loadState}
            onSave={(editedImageObject, designState) => console.log('saved', editedImageObject, designState)}
            annotationsCommon={{
              fill: '#000000'
            }}
            Image={{ 
              fill: undefined,
              disableUpload: false,
              gallery: editorGallery
            }}
            Text={{  ...annotationsCommon,
              text: 'Your text',
              fontFamily: 'Arial',
              fonts: [
                { label: 'Arial', value: 'Arial' },
                'Tahoma',
                'Sans-serif',
                'Caveat',
                'Courier',
                'Georgia',
                'Impact',
                'Verdana',
                { label: 'Comic Sans', value: 'Comic-sans' },
              ],
              fontSize: 25,
              letterSpacing: 0,
              lineHeight: 1,
              align: 'left',
              fontStyle: 'normal',
              onFontChange: (newFontFamily, reRenderCanvasFn) => undefined,
            }}
            Watermark={{
              Image, // depends on the added watermark type the config will be used
              gallery: [
                logo,
                logo,
                logo,
                logo,
              ],
              textScalingRatio: 0.33,
              imageScalingRatio: 0.33,
            }}
            Rotate={{ angle: 90, componentType: 'button' }}
            tabsIds={[TABS.WATERMARK, TABS.ANNOTATE]} // or {['Adjust', 'Annotate', 'Watermark']}
            defaultTabId={TABS.ANNOTATE} // or 'Annotate'
            defaultToolId={TOOLS.TEXT} // or 'Text'
            noCrossOrigin={true}
            translations={{
              watermarkTab: 'Background',
              uploadImage: 'Image from local',
              addWatermark: '+ Add background',
              uploadWatermark: 'From local',
              annotateTab: 'Draw',
            }}
          />
        ):<div></div>
        }
      </div>
    );
}
export default ImageEditor;