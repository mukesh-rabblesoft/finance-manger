import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = (props) => {
  const [open, setOpen] = React.useState(false);
  useEffect(()=>{
    setOpen(props.open);
  },[open])

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Loader;
