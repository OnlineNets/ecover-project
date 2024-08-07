import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { backendUrl } from "../../utils/Constant";
import CoverCard from "./subtools/CoverCard";

//// MyCoverPage component connected with MyCover tab on create cover page
const MyCoverPage = ({setMyCoversSelected, setLoadPreDesign}) => {
    const [covers, setCovers] = useState([]);
    const {plugGetCovers} = useSelector(state=>state.editedImage);
    const {_id} = useSelector(state=>state.auth.user) || {};

    useEffect(()=>{
        async function fetchData() {
            try{
                const res = await axios.get(`${backendUrl}/api/ag-psd/get-covers/${_id}`);
                setCovers(res.data);
                //console.log(res.data)
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[plugGetCovers]);

    const nullFunction = () =>{
        
    }
    
    return (
        <div className="p-1">
            <div className="background-page-header">
                My Covers
            </div>
            <div className="mockupGroup">
                {covers.map((cover, key) => {
                    return (
                        <div  key = {key}>
                            <CoverCard 
                                coverId={cover._id}
                                mockup={cover.mockup}
                                renderedImage={cover.renderedImage} 
                                designState={cover.designState} 
                                setMyCoversSelected={setMyCoversSelected}
                                setLoadPreDesign={setLoadPreDesign}
                                go2CreateCover={nullFunction}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyCoverPage;