import express from 'express';
const router = express.Router();
//import axios from 'axios';
//import sharp from 'sharp';
import multer from 'multer';
// import AWS from 'aws-sdk';
import fs from 'fs';
import auth from '../../middleware/auth.js';
import User from '../../models/User.js';
//import path from 'path';
//import request from 'request';
import replacedImage from '../../mockupfiles/change-smart-layer.js';
import { readPsd } from 'ag-psd';
//import { createCanvas, Image } from 'canvas';
//import imageminJpegtran from 'imagemin-jpegtran';
import imagemin  from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import MockupData from '../../models/MockupData.js';
import uploadFileS3 from '../../functions/uploadImage2AWS-S3.js';
// import imagemin =  require('imagemin');
// import imageminPngquant from 'imagemin-pngquant');


//import CircularJSON from 'circular-json';

import initializeCanvas from "ag-psd/initialize-canvas.js";
import { CLIENT_RENEG_WINDOW } from 'tls';
//import { group } from 'console';

// AWS.config.update({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: 'us-east-1'
// });
// const s3Content = new AWS.S3();
const uploadImage = multer({ dest: "upload/image/" });


//  Not use now
//  @route  POST api/ag-psd/bg-info
//  @desc   get background image info
//  @access Public
router.post('/bg-info', async (req, res) => {
  // const url = req.body.imageSource;
  // console.log(url)
  //   const response = await axios.get(url, { responseType: 'arraybuffer' });
  //   const buffer = Buffer.from(response.data, 'binary');
  //   const metadata = await sharp(buffer).metadata();
  //   const { width, height } = metadata;
  //   console.log(width, height);
  //   res.json({width: width, height: height});
});

//  Not use now
//  @route  POST api/ag-psd/all-mockup
//  @desc   get all mockup data
//  @access Public
// router.post('/all-mockup', async(req, res)=>{
//   //console.log(req.body);
//   //res.json({d:'dd'});
//   let resData = [];
//   req.body.mockups.map((group, key) =>{
//     group.mockups.map(async (filename, key1)=>{
//       resData = [
//         ...resData,
//         await getMockupData(filename)
//       ];
//     })
//   })

//   console.log(resData)
// });


//  @route  POST api/ag-psd/all-mockup
//  @desc   get all mockup infor
//  @access Public
router.post('/all-mockup', async(req, res)=>{ 
  // let resData = []; 
  // for (let group of req.body.mockups) {
  //   let group1 = {
  //     group: group.group,
  //     mockups: group.mockups,
  //     data: []
  //   };
  //   let data1 = [];
  //   for (let filename of group.mockups) { 
  //     data1.push(await getMockupData(filename));
  //     //resData.push(await getMockupData(filename)); 
  //   }
  //   group1.data = data1;
  //   resData.push(group1);
  // } 
  const resData = await MockupData.find({});
  res.json(resData);
});

//  @route  GET api/ag-psd/mockup/:mockup
//  @desc   get a mockup data
//  @access Public
router.get('/mockup/:mockup', async (req, res) => {
  const filename = req.params.mockup;
  //console.log(filename);

  try{
    const buffer_data = await fs.readFileSync(`mockupfiles/psd/${filename}.psd`);
    const psd_data = await readPsd(buffer_data, {skipThumbnail: false});
    //console.log("get psd image --- ", psd_data.imageResources)

    const psdWidth = psd_data.width;
    const psdHeight = psd_data.height;

    let width, height, spin_width=0, ifSpin = false;
    if(psd_data.linkedFiles) {
      let psb_data;
      let psb_spine;
      //console.log(psd_data.linkedFiles)
      psd_data.linkedFiles.map((linked, index)=>{
        if(typeof linked.name === 'string' && linked.name.includes('Rectangle')) 
          psb_data = linked.data;
        if(typeof linked.name === 'string' && linked.name.includes('Spine')) 
          psb_spine = linked.data;
      })
      if(psb_data){
        const psb = readPsd(psb_data);
        width = psb.width;
        height = psb.height;
      }
      if(psb_spine){
        const spine = readPsd(psb_spine);
        spin_width = spine.width;
        ifSpin = true;
      }
    }

    console.log(width, spin_width);
    const resData = {
      success: true,
      width: width+spin_width,
      height: height,
      psdWidth: psdWidth,
      psdHeight: psdHeight,
      ifSpin: ifSpin,
      spinWidth: spin_width,
      // thumbnail: psd_data.canvas.toDataURL(),
      //thumbnail: Buffer.from(imageData).toString('base64')                              
    };

    //console.log("----   ", resData);
    res.json(resData);
  } catch (err){
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }

  // //const absolutePath = path.resolve('./output.png');
  // const imagePath = path.join(__dirname, '../../mockupfiles/image', `${filename}.png`);
  // res.sendFile(imagePath);

  // console.log(imagePath);
  // // res.json({ image: data});
  
});

//  @route  POST api/ag-psd/upload-image
//  @desc   upload image to aws s3
//  @access Public
router.post('/upload-image', auth , uploadImage.single('file'), async (req, res) => {
  const userID = req.user.id;
  const file = req.file;
  const user = await User.findById(userID);

  if(!user) return res.status(404).send('User not found');

  // Read the image file and retrieve its data
  const data = fs.createReadStream(file.path);

  //const imageData = data.toString('base64');
  //const imageSrc = `data:image/jpeg;base64,${imageData}`;

  const imageSrc = await uploadFileS3(file.originalname, data);


  if(imageSrc == null) return res.status(500).send('Server error');
  
  try{
    if(user.images === null){
      user.images = [
        {url: imageSrc}
      ]
    }
    else  user.images.push({url: imageSrc});
    await user.save();

    res.json({ message: 'Uploaded successfully', url: imageSrc });

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });

  }catch(err){
    console.log(err);
    res.status(500).send('Server error');
  }


  
  // const fileStream = fs.createReadStream(image.path);
  // console.log(fileStream );
  // const s3params = {
  //   Bucket: BUCKET,
  //   Key: image.layeralname,
  //   Body: fileStream,
  // };
  // s3Content.upload(s3params, async function(err, data) {
  //   let image;

  //   if (err) {
  //       console.log('Error uploading file:', err);
  //   } else {
  //       console.log('File uploaded successfully. Location:', data.Location);
  //       image = data.Location;
  //       const user = await User.findById(userID);
  //       console.log(user.id);
  //       user.images.push({url: image});
  //       await user.save();
  //   }
  //   res.json({ message: 'Registration successful', url: data.Location });
  // });
});

//  @route  GET api/ag-psd/all-upload-image
//  @desc   get all upload image url
//  @access Public
router.get('/all-upload-image', auth, async (req, res) => {
  try{  
    const userID = req.user.id;
    const user = await User.findById(userID);
    res.json(user.images);
  }catch(err){
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }
  //  const imagesData = [];
  // user.images.forEach( async (image, index) => {
  //   await request({ url: image.url, encoding: null }, (error, response, body) => {
  //     if (!error && response.statusCode === 200) {
  //       const imageData = body.toString('base64');
  //       // Add the base64 image data to the array
  //       imagesData.push(imageData);
  //     }
      
  //     console.log("ddddd    ", index);
  //     // After all the requests have completed
  //     if (index === user.images.length - 1) {
  //       res.json(imagesData);
  //       //console.log(imagesData)
  //     }
  //   });
  // });
})

//  @route  POST api/ag-psd/render-image
//  @desc   change and re-render psd file, get re-rendered image
//  @access Public
router.post('/render-image', auth , async (req, res) => {
  try {
    // const {imageData, group, filename} = req.body;
    const {rectImage, spineImage, name, ifSpin, ifMug, ifRectSplite, ifSpinSplite, spineSpliteImage, rectSpliteImage} = req.body;

    console.log(" ----- ", name);
    const result = await replacedImage(rectImage, spineImage, name, ifSpin, ifMug, ifRectSplite, ifSpinSplite, spineSpliteImage, rectSpliteImage);
    //console.log(result, "-----")
    if(!(await result).ifSuccess) {
      res.json({ result: false, message: (await result).reason });
      console.log(result.reason)
      return;
    }
    const changedMockup = await getImageFromPSD();
    
    //console.log(changedMockup);
    if(changedMockup.success){
      res.json(changedMockup);
      console.log("send imageData")
    }else{
      res.status(500).send('Server error');
      console.log("cannot send")
    }
  } catch(err) {
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }
  //console.log(user.id);
});

const getImageFromPSD = async () =>{
  try{
    const files = await imagemin(['mockupfiles/result_origin.png'], {
      plugins: [
        // imageminJpegtran(),
        imageminPngquant({
          quality: [0.9, 1]
        })
      ]
    });
    
    //console.log(buffer_data);
    //const psd_data = await readPsd(buffer_data, {skipThumbnail: false});
    //console.log("get psd image --- ", psd_data.imageResources)
    return({
      success: true,
      imageData: `data:image/png;base64,${Buffer.from(files[0].data).toString('base64')}`
      //imageData: Buffer.from(buffer_data).toString('base64')
    })
  } catch (err){
    console.log("------- ", err.message);
    return({
      success: false,
      message: err.message
    })
  }
}


//  @route  POST api/ag-psd/save-cover
//  @desc   save cover infor
//  @access Public
router.post('/save-cover', auth , async (req, res) => {
  try {

    let {userId, renderedImage, designState, mockup} = req.body;
   
    const user = await User.findById(userId);
    
    if (user.covers === null) {
      user.covers = [];
    } else if (user.covers.length >= 10) {
      user.covers.shift(); // Remove the first element
    }

   
    // mockup.editImage = "data:image/png;base64,iV";
    
    const stringState = JSON.stringify(designState);
    const stringMockup = JSON.stringify(mockup);

    const bufferData = Buffer.from(renderedImage, 'base64');

    const imageSrc = await uploadFileS3("renderedImage.png", bufferData);


    user.covers.push({ renderedImage: imageSrc, designState: stringState, mockup: stringMockup, });
  
    await user.save();
   

    res.json({ message: 'Save successful'});

  } catch(err) {
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }
  //console.log(user.id);
});


//  @route  GET api/ag-psd/get-covers/:userid
//  @desc   get all saved covers
//  @access Public
router.get('/get-covers/:userid', auth, async (req, res) => {
  try{  
    const userID = req.params.userid;
    const user = await User.findById(userID);
    const covers = [];
    user.covers.map((cover, index) => {
      covers.push({
          _id: cover._id,
          renderedImage: cover.renderedImage,
          designState: JSON.parse(cover.designState),
          mockup: JSON.parse(cover.mockup),
      });
    })
    res.json(covers);
  }catch(err){
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }
});


//  @route  DELETE api/ag-psd/cover/:userId
//  @desc   delete cover
//  @access Public
router.delete('/cover/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { coverId } = req.body;
    
    // Find the user by userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the cover item with the given coverId
    const coverIndex = user.covers.findIndex(
      (cover) => cover._id.toString() === coverId
    );

    // Check if the cover item exists
    if (coverIndex === -1) {
      return res.status(404).json({ message: 'Cover item not found' });
    }

    // Remove the cover item from the user's schema
    user.covers.splice(coverIndex, 1);

    // Save the updated user
    await user.save();

    res.json({ message: 'Cover item deleted successfully' });

  } catch (err) {
    console.error('Error deleting cover item:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//module.exports = router;
export default router;
