import fs from 'fs';
import { readPsd } from 'ag-psd';

import initializeCanvas from "ag-psd/initialize-canvas.js";


const getAllMockupdata = async(mockups) => { 
  let resData = []; 
  for (let group of mockups) {
    let group1 = {
      group: group.group,
      mockups: group.mockups,
      data: []
    };
    let data1 = [];
    for (let filename of group.mockups) { 
      data1.push(await getMockupData(filename));
      //resData.push(await getMockupData(filename)); 
    }
    group1.data = data1;
    resData.push(group1);
  }


  const sss = JSON.stringify(resData);
  
  // console.log(sss)
   
   fs.writeFile('MockupData.txt', sss, (err) => {
     if (err) {
       console.error(err);
       return;
     }
     console.log('File saved successfully.');
   });
};

const getMockupData = async (filename) => {
  try{
    const buffer_data = await fs.readFileSync(`New PSDs/${filename}.psd`);
    const psd_data = await readPsd(buffer_data, {skipThumbnail: false});
    //console.log("get psd image --- ", psd_data.imageResources)

    const psdWidth = psd_data.width;
    const psdHeight = psd_data.height;

    let width, height, spin_width=0, ifMug = false, ifSpin = false, spin_splite_width=0, spin_splite_height=0, ifSpinSplite=false, rect_splite_width=0, rect_splite_height=0, ifRectSplite=false;
    //console.log(psd_data.linkedFiles)
    let spine, rect = [], spine_splite, rect_splite, rectTransform = [], spineTransform, rectSpliteTransform, spinSpliteTransform;
    if(psd_data.children){
      psd_data.children.map((child, index)=>{
        // if(child.name && child.name==='mm_img:Your Image')  {rect = child;}
        // if(child.name && child.name==='mm_img:Mug')  {rect = child; ifMug = true;}
        if(child.name && child.name==='mm_img:Your Image')  {rect.push(child);}
        if(child.name && child.name==='mm_img:Mug')  {rect.push(child); ifMug = true;}
        if(child.name && child.name==='mm_img:Spine')  {spine = child;}
        if(child.name && child.name==='mm_img:Spine_Splite')  {spine_splite = child;}
        if(child.name && child.name==='mm_img:Rect_Splite')  {rect_splite = child;}
        //console.log('each_child ===== ', index, child)
        if(child.children) child.children.map((subchild) => {
          // if(subchild.name && subchild.name==='mm_img:Your Image')  {rect = subchild;}
          // if(subchild.name && subchild.name==='mm_img:Mug')  {rect = subchild; ifMug = true;}
          if(subchild.name && subchild.name==='mm_img:Your Image')  {rect.push(subchild);}
          if(subchild.name && subchild.name==='mm_img:Mug')  {rect.push(subchild); ifMug = true;}
          if(subchild.name && subchild.name==='mm_img:Spine')  {spine = subchild;}
          if(subchild.name && subchild.name==='mm_img:Spine_Splite')  {spine_splite = subchild;}
          if(subchild.name && subchild.name==='mm_img:Rect_Splite')  {rect_splite = subchild;}
        })
      })
    }
    if(rect){
      // width = rect[0].placedLayer.width;
      // height = rect[0].placedLayer.height;
      // rectTransform = {
      //   transform: rect.placedLayer.transform,
      //   perTransform: rect.placedLayer.nonAffineTransform,
      //   layerWidth: rect.right - rect.left,
      //   layerHeight: rect.bottom - rect.top
      // };
      width = rect[0].placedLayer.width;
      height = rect[0].placedLayer.height;
      rect.map((item, index)=>{
        rectTransform.push({
          transform: item.placedLayer.transform,
          perTransform: item.placedLayer.nonAffineTransform,
          layerWidth: item.right - item.left,
          layerHeight: item.bottom - item.top
        });
      })
    }
    if(spine){
      spin_width = spine.placedLayer.width;
      ifSpin = true;
      spineTransform = {
        transform: spine.placedLayer.transform,
        perTransform: spine.placedLayer.nonAffineTransform,
        layerWidth: spine.right - spine.left,
        layerHeight: spine.bottom - spine.top
      };
    }
    
    if(spine_splite){
      spin_splite_width = spine_splite.placedLayer.width;
      spin_splite_height = spine_splite.placedLayer.height;
      ifSpinSplite = true;
      spinSpliteTransform = {
        transform: spine_splite.placedLayer.transform,
        perTransform: spine_splite.placedLayer.nonAffineTransform,
        layerWidth: spine_splite.right - spine_splite.left,
        layerHeight: spine_splite.bottom - spine_splite.top
      };
    }

    if(rect_splite){
      rect_splite_width = rect_splite.placedLayer.width;
      rect_splite_height = rect_splite.placedLayer.height;
      ifRectSplite = true;
      rectSpliteTransform = {
        transform: rect_splite.placedLayer.transform,
        perTransform: rect_splite.placedLayer.nonAffineTransform,
        layerWidth: rect_splite.right - rect_splite.left,
        layerHeight: rect_splite.bottom - rect_splite.top
      };
    }

    const resData = {
      success: true,
      width: width+spin_width,
      height: height,
      psdWidth: psdWidth,
      psdHeight: psdHeight,
      ifMug,
      ifSpin: ifSpin,
      spinWidth: spin_width,
      ifSpinSplite,
      ifRectSplite,
      spinSpliteWidth: spin_splite_width,
      spinSpliteHeight: spin_splite_height,
      rectSpliteWidth: rect_splite_width,
      rectSpliteHeight: rect_splite_height,
      rectTransform,
      spineTransform,
      rectSpliteTransform,
      spinSpliteTransform,
      // thumbnail: psd_data.canvas.toDataURL(),
      //thumbnail: Buffer.from(imageData).toString('base64')                              
    };

    //console.log("----   ", resData);
    return resData;
  } catch (err){
    console.log("error ------", err.message);
    return null;
  }
}




const mockups = [
  {
      group: "Laptop",
      mockups: [
          "Laptop (1)",
          "Laptop (2)",
          "Laptop (3)",
          "Laptop (4)",
      ] 
  },
  {
      group: "Book",
      mockups: [
          "Book (1)",
          "Book (2)",
          "Book (3)",
          "Book (4)",
          "Book (5)",
          "Book (6)",
          "Book (7)",
          "Book (8)",
          "Book (9)",
          "Book (10)",
          "Book (11)",
          "Book (12)",
          "Book (13)",
          "Book (14)",
          "Book (15)",
          "Book (16)",
          "Book (17)",
          "Book (18)",
          "Book (19)",
          "Book (20)",
          "Book (21)",
          "Book (22)",
          "Book (23)"
      ] 
  },
  {
      group: "Mug",
      mockups: [
        "Mug (1)",
        "Mug (2)",
        "Mug (3)",
        "Mug (4)",
        "Mug (5)",
        "Mug (6)"
      ] 
  },
  {
      group: "Ipad",
      mockups: [
          "Ipad (1)",
          "Ipad (2)",
          "Ipad (3)",
          "Ipad (4)",
          "Ipad (5)",
          "Ipad (6)",
      ] 
  },
  {
      group: "Phone",
      mockups: [
          "Phone (1)",
          "Phone (2)",
          "Phone (3)",
          "Phone (4)", 
          "Phone (5)"
      ] 
  },
  {
      group: "Box",
      mockups: [
          "Box (1)",
          "Box (2)",
          "Box (3)",
          "Box (4)",
          "Box (5)",
          "Box (6)",
          "Box (7)",
          "Box (8)"
      ] 
  },
  {
      group: "Mac",
      mockups: [
          "Mac (1)",
          "Mac (2)",
          "Mac (3)"
      ] 
  },
  {
      group: "Media Player",
      mockups: [
          "Media Player (1)",
          "Media Player (2)",
          "Media Player (3)"
      ] 
  },
  {
    group: "CD",
    mockups: [
        "CD (1)",
        "CD (2)",
        "CD (3)"
    ] 
  },
  {
    group: "T-Shirt",
    mockups: [
        "T-Shirt (1)",
        "T-Shirt (2)",
        "T-Shirt (3)",
        "T-Shirt (4)"
    ] 
  }
];


getAllMockupdata(mockups);
