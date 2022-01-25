// Main import need
import React, {forwardRef, useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
  Button, Slide, Divider,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, Typography, IconButton, Toolbar
} from '@material-ui/core';
import {setAppOpenDialogAddNew, setAppOpenDialogDetail, setAppOpenDialogEdit} from "../../store/action";
import CloseIcon from "@material-ui/icons/Close";

// PLT Solution

// Make styles
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

// Utils mores

// Main this component
const DialogContainerDetail = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store


  // Methods
  const handleClickOpen = () => {
  };

  const handleClose = () => {
    dispatch(setAppOpenDialogDetail(false));
  };
  // End methods *******************

  // Return content this component
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      fullScreen={props.fullScreen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" className={"py-1"}>
        <Toolbar className={"p-0"}>
          <Typography variant="h6" style={{flexGrow: 1}}>
            { props.title }
          </Typography>

          <IconButton edge="start" color="inherit" aria-label="menu"
                      onClick={handleClose}
          >
            <CloseIcon/>
          </IconButton>
        </Toolbar>

      </DialogTitle>
      <Divider/>
      <DialogContent className={"p-0"}>
        {props.children}
      </DialogContent>
    </Dialog>
  )
};

export default DialogContainerDetail;
