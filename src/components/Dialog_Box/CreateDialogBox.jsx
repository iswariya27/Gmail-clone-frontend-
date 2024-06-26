import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MailForm from '../MsgBodyPage/MailForm';
import { useState } from 'react';
import { API_URLS } from '../../service/centralUrl';
import useApi from '../../hook/UseApi.jsx';


export default function CustomizedDialogs(props) {
  const [datafromChild,setdatafromChild]=useState({
     to:'',
     subject:'',
     content:'',
     attachments:'',
  });

  const handlex=()=>{
  props.handleClose();
  }  
  const Save=useApi(API_URLS.saveDraftMsg);
  const saveDraft = async(mail)=>{ 
    try {
      const token=localStorage.getItem('token');
      const res = await Save.call({...mail},token);

       if(res.status){
        console.log(res)
       }
    } catch (error) {
      console.log(error);
   }
  }
  const check=()=>{
    handlex();
    saveDraft(datafromChild);
  }
return (
    <div >
      <BootstrapDialog
        onClose={handlex}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        onClick={(e)=>e.stopPropagation()}>

        <DialogTitle sx={{ m: 0, p: 2,background:'#d4e0f1' }} id="customized-dialog-title">
          New Message
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={check}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }} >  
          <CloseIcon/>
        </IconButton>
          <DialogContent dividers>

            <MailForm handlex={handlex} 
            setdatafromChild={setdatafromChild} 
            value={props.value} 
            setClicked={props.setClicked}/>

          </DialogContent>
          <DialogActions>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    justifyContent:'space-between'
  },
}));