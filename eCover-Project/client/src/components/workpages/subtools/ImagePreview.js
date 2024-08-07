import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ImagePreview = ({ imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box position="relative" display="inline-block">
      <img
        src={imageUrl}
        alt="Image"
        style={{ maxWidth: '400px', maxHeight: '250px', width: 'auto', height: 'auto', objectFit: 'cover', cursor: 'pointer' }}
        onClick={handleClick}
      />
      {isHovered && (
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '8px 16px',
          }}
        >
          Preview
        </Typography>
      )}
      <Modal
        open={isModalOpen}
        onClick={handleCloseModal}
        aria-labelledby="image-preview"
        aria-describedby="image-preview-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            backgroundColor: '#000000cc',
            textAlign: 'center',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src={imageUrl} alt="Preview" style={{ maxWidth: '93%', maxHeight: '800px', width: 'auto', height: 'auto', margin: 'auto' }} />
          <Button variant="outlined"
            style={{
                position: 'absolute',
                fontWeight: 'bold',
                color: 'white',
                borderColor: 'white',
                top: '40px',
                right: '20px',
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ImagePreview;