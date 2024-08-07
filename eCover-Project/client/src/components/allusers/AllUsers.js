import React, { Fragment, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { backendUrl } from '../../utils/Constant';
import axios from 'axios';
import { Button } from '@mui/material';

// AllUsers component connected to allusers page

const AllUsers
 = ({
  auth: { user },
  isAuthenticated
}) => {


  const [users, setUsers] = useState([]);
  const [Message, setMessage] = useState(false);
  const [ErrMessage, setErrMessage] = useState(false);

  useEffect(()=>{
    //get all users from database
    async function fetchData() { 
      try{
        const res = await axios.get(`${backendUrl}/api/users/all-users`);
        //console.log(res.data.url);
        setUsers(res.data);
        console.log(res.data)
      } catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[])
  
  //delete images that uploaded from user id
  const deleteImages = async (id) =>{
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ id });
  
    try {
      const res = await axios.post(`${backendUrl}/api/users/del-images`, body, config);
      console.log(res.data)
      setMessage(true);
      setTimeout(() => setMessage(false), 3000);
    }catch (err) {
      console.log(err);
      setErrMessage(true);
      setTimeout(() => setErrMessage(false), 3000);
    }
  }

    //delete images that uploaded from user id
  const deleteCovers = async (id) =>{
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ id });
  
    try {
      const res = await axios.post(`${backendUrl}/api/users/del-covers`, body, config);
      console.log(res.data);
      setMessage(true);
      setTimeout(() => setMessage(false), 3000);
    }catch (err) {
      console.log(err);
      setErrMessage(true);
      setTimeout(() => setErrMessage(false), 3000);
    }
  }
    
  if (!isAuthenticated) {
    // return <Navigate to='/login' />;
    return <Navigate to='/' />;
  }

  return (
    <Fragment>
      <div className='container'>
      <h1 className='large text-primary'>All Users
      </h1>
      <p className='lead'>
        <i className='fas fa-user'>Welcome {user && user.name}</i>
      </p>
      <Fragment>
        {Message ? <p style={{color: 'red'}}>Deleted succussfully.</p> : ''}
        {ErrMessage ? <p style={{color: 'red'}}>Cannot delete, please check your network and try again.</p> : ''}
        <div>
        {
          users.map((user, index)=>{
            return  <div style={{float: 'left', margin: '20px', padding: '20px'}} key={index}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <Button 
                  variant="contained" 
                  color="success"
                  className="del-images"
                  style={{
                      padding: '2px 15px',
                      fontSize: "14px",
                      color: 'white',
                      borderRadius: '8px',
                      margin: '5px'
                  }}
                  onClick={()=>deleteImages(user._id)}
              >Delete Images</Button>
              <Button 
                  variant="contained" 
                  color="success"
                  className="del-images"
                  style={{
                      padding: '2px 15px',
                      fontSize: "14px",
                      color: 'white',
                      borderRadius: '8px',
                  }}
                  onClick={()=>deleteCovers(user._id)}
              >Delete Covers</Button>
            </div>
          })
        }
        </div>
      </Fragment>
      </div>
    </Fragment>
  );
};

AllUsers
.propTypes = {
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { })(
  AllUsers

);
