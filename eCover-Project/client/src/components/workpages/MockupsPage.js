import React from "react";
import MockUpCard from './subtools/MockUpCard';
import {Divider} from '@mui/material';
import './MockupsPage.css';
import { useSelector } from "react-redux";
import { mockups } from "../../utils/Constant";

//// MockupsPage component connected with Mockups tab on create cover page
const MockupsPage = ({setMockupsSelected}) => {
    //const nr = [7981, 7944, 5868, 2328, 1980, 1899, 1665, 1503, 1438, 1404, 1215, 1191, 968, 964, 520, 479, 192, 25, 7];
    const mockUpData = useSelector(state=>state.mockUpData);
    
    // useEffect(()=>{
    //     console.log("object  ==== ")
    //     async function getMockup() {
    //         try{
    //             const res = await axios.post(`${backendUrl}/api/ag-psd/all-mockup`, {mockups});
    //             setMockupData(res.data);
    //             console.log(res.data)
    //         }catch(err){
    //             console.log(err);
    //         }
    //     } 
    //     // console.log(mockupData.length);
    //     getMockup();
    // },[]);
    
    return (
        <div className="p-1">
            <div className="background-page-header">
                Choose Mockup Page
            </div>
            <div className="bg-library-page-body p-1">
                { mockUpData.map((group, key) => {
                    return( 
                        <div style={{ marginTop: '20px' }}  key = {key}>
                        <Divider className="divider" textAlign="left">Mockup Group - {group.group}</Divider>
                        <div className="mockupGroup">
                        {group.mockups.map((mockup, key) => {
                            return (
                                <div  key = {key}>
                                    <MockUpCard 
                                        mockup={mockup}
                                        mockupData={group.data[key]} 
                                        setMockupsSelected={setMockupsSelected} />
                                </div>
                            )
                        })}
                        </div></div>
                    );
                    
                })}
            </div>
        </div>
    )
}

export default MockupsPage;