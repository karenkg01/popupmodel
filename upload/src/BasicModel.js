import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FileUpload from './FileUpload';
import CloudUpload from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 3
};
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 9,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<CloudUpload />} sx={style2} onClick={handleOpen}>
        UPLOAD NEW DOCUMENT
      </Button>
      
    </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <FileUpload handleClose={handleClose} />
        </Box>
      </Modal>
      
    </div>
  );
}