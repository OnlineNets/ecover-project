import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/uploadImage";
import UploadImageCard from "./subtools/UploadImageCard";
import Spinner from "../layout/Spinner";
import Resizer from 'react-image-file-resizer';
import { backendUrl } from "../../utils/Constant";

import { DEFAULT_IMAGE_HEIGHT } from "../../utils/Constant";
import { header } from "express-validator";

//// UploadImagesPage component connected with UploadImages tab on create cover page
const UploadImagesPage = ({setBgImageSelected, setUploadImagesSelected, setBackgroundSelected}) => {
    const dispatch = useDispatch();
    const [warningMaxSize, setMaxSize] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errUpload, setErrUpload] = useState(null);
    const selectImage = async (e) => {
        
        // const urls = [
        //   "https://fadaimageupload.s3.amazonaws.com/MockupImage%20%281%29.png",
        //   "https://atomicecovers.s3.amazonaws.com/ai-rabbit.JPEG",
        //   "https://atomicecovers.s3.amazonaws.com/dog-made-by-artist.JPEG",
        // ];
        // const fetchPromises = urls.map((url) => {
        //   return fetch(url)
        //     .then((response) => response.blob())
        //     .then((blob) => new File([blob], 'filename.extension'))
        //     .catch((error) => {
        //       console.log('Error fetching file:', error);
        //       return null;
        //     });
        // });
      
        // return Promise.all(fetchPromises);

        setMaxSize(false);
        const file = e.target.files[0];
        
        if (file.type.startsWith('image/')) {
            const img = new Image();
            img.onload = () => {
              if (img.height > DEFAULT_IMAGE_HEIGHT) {
                Resizer.imageFileResizer(
                  file,
                  img.width * DEFAULT_IMAGE_HEIGHT / img.height,
                  DEFAULT_IMAGE_HEIGHT,
                  'JPEG',
                  100,
                  0,
                  (resizedFile) => {
                    // Handle the resized file
                    uploadImageFile(resizedFile);
                  },
                  'file'
                );
              } else {
                uploadImageFile(file);
              }
            };
  
            img.onerror = () => {
                setMaxSize(true);
            };
            img.src = URL.createObjectURL(file);
        } else {
            setMaxSize(true);
        }        
    };
    // const selectUploadedImage = () => {

    // }

    const uploadImageFile = async (image) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', image);
        try{
          const res = await axios.post(`${backendUrl}/api/ag-psd/upload-image`, formData);
          //console.log(res.data.url);
          dispatch(uploadImage(res.data.url));
        } catch(err){
          setErrUpload(err.response.data);
          setTimeout(() => setErrUpload(null), 3000);
        }
        setLoading(false);
    }

    const {urls} = useSelector(state => state.uploadImage);
       
    return (
        <div className="upload-page">
            <div className="upload-page-header">
                <label htmlFor="choose-file" className="upload-page-header-select">Select Image to Upload</label>
                <input type="file" style={{display: 'none'}} id="choose-file" onChange={selectImage} />
                <div className="upload-page-header-drag">
                    or Drag & Drop file here to Upload
                </div>
            </div>
            {warningMaxSize ? <p style={{color: 'red'}}>Please choose a valid image file.</p> : ''}
            {errUpload != null ? <p style={{color: 'red'}}>{errUpload}</p> : ''}
            <div className="upload-page-body">
                {loading === true ? <div className="loading-spinner"><Spinner /></div> : (
                    urls.map((image, index) => <UploadImageCard url={image.url} key={index} setBackgroundSelected={setBackgroundSelected} setBgImageSelected={setBgImageSelected} setUploadImagesSelected={setUploadImagesSelected} />)
                )}
                
            </div>
        </div>
    )
}

export default UploadImagesPage;