import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { backendUrl } from '../../utils/Constant';
import CoverCard from '../workpages/subtools/CoverCard';
import '../workpages/MockupsPage.css';

//// Mycovers component connected with Mycovers  page
const Mycovers = ({setLoadPreDesign}) => {
  const [covers, setCovers] = useState([]);
  const { user, isAuthenticated } = useSelector(state => state.auth)|| {};
  const {plugGetCovers} = useSelector(state=>state.editedImage) || {};

  useEffect(()=>{
    async function fetchData() {
        try{
            const res = await axios.get(`${backendUrl}/api/ag-psd/get-covers/${user._id}`);
            setCovers(res.data);
            console.log(res.data)
        }catch(err){
            console.log(err);
        }
    }
    fetchData();
  },[plugGetCovers]);

  const navigate = useNavigate();

  if (!isAuthenticated) {
    // return <Navigate to="/login" />;
    return <Navigate to='/' />;
  }

  const go2CreateCover = () =>{
    console.log("go to create cover")
    navigate("/create-cover");
  } 

  const nullFunction = () => {

  }

  return (
    <Fragment>
      <div className="container">
        <h1 className="large text-primary">My covers</h1>
        <p className="lead">
          <i className="fas fa-user">Welcome {user && user.name}</i>
        </p>
        <Fragment>
          { !covers.length ? 
            <p>You don't have a cover, please create one</p> :
            <div className="mockupGroup" style={{paddingTop: '20px', paddingBottom: '30px'}}>
                {covers.map((cover, key) => {
                    return (
                        <div  key = {key} style={{padding:'10px'}}>
                            <CoverCard 
                                coverId={cover._id}
                                mockup={cover.mockup}
                                renderedImage={cover.renderedImage} 
                                designState={cover.designState} 
                                go2CreateCover={go2CreateCover}
                                setLoadPreDesign={setLoadPreDesign}
                                setMyCoversSelected={nullFunction}
                            />
                        </div>
                    )
                })}
            </div>
          }
          <Link to="/create-cover" className="btn btn-primary my-1">
            Create Cover
          </Link>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Mycovers;