import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function BatchPop(props) {
  const { onClose, open, earnedBadges } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
      Congratulations
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* Display the images of earned badges */}
        {earnedBadges.map((badge) => (
          <div className='text-center' key={badge.id}>
            <img src={badge.image} alt={badge.name} style={{ width: '200px' }} />
            <p>{badge.description}</p>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
