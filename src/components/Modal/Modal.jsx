import * as React from 'react';
import Box from '@mui/material/Box';
//import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Account from "../Account"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  opacity: 1,
  border: '2px solid green',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, handleClose, session}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Account key={session.user.id} session={session} />
          </Box>
        
      </Modal>
    </div>
  );
}
