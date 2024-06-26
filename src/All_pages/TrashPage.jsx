import React, { useEffect } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { MailContainer,Row,Message,Icons } from './SendPage';
import { Checkbox, IconButton } from '@mui/material';
import useApi from '../hook/UseApi.jsx';
import { API_URLS } from '../service/centralUrl';
import { useDispatch, useSelector } from 'react-redux';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { setTrash, setDelete } from '../components/redux-container/slices/emailSlice';

function Trash() {

  const state=useSelector((state)=>state.email);
  const {trash}=state;
  const token=useSelector((state)=>state.email.user.token);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  //calling end point from central url
  const getTrashEmail=useApi(API_URLS.getTrashMsg);
  const mailDelete=useApi(API_URLS.getTrashMsg);
  
  const fetchdata=async()=>{  
    try {
      const res=await getTrashEmail.call({},token);
      if(res.status){
        const data=res.data.message;
        dispatch(setTrash(data));
      }      
     } catch (error) {
        console.log(error);
      }  
    }
  
  useEffect(()=>{
  fetchdata();
  },[]);
  
  const handleClick=(event)=>{
  let msgId=event.target.id;
  if(msgId){
     navigate(`/trash/${msgId}`)
  }else{
     msgId=event.target.parentElement.id
     navigate(`/trash/${msgId}`);
  }}

  //function for delete message
  const handleDelete=async(event)=>{
    try {  
      let msgId=event.target.closest('.row').children[1].id;
      const params=msgId;
      dispatch(setDelete(msgId));
      const res= await mailDelete.call({},token,params);
   
     if(res.status){
      const update=await getTrashEmail.call({},token);
     
      if(update.status){
      const data = update.data.message;
      dispatch(setTrash(data));
      }
     }
    } catch (error) { 
      console.log(error);
     }
    }
return (
   <Layout >
    <MailContainer>
       {trash?.map((message)=>(
         <Row key={message._id} className='row' onClick={handleClick} > 
           <Icons>
            <IconButton>
              <Checkbox size='small'/>
               </IconButton>
               {message.important?(
                 <IconButton >
                  <LabelImportantIcon className='Star'/>
                    </IconButton>
                     ):(
                     <IconButton>
                     <LabelImportantOutlinedIcon/>
                    </IconButton>
                    )}
                  </Icons>
                 <Message  id={message._id}  >
                <div>{message.sender_name||message.receiver_name}</div>
                <div>{message.subject}</div>
                <div>{message.date.slice(0,10)}</div>
                <div>
              <IconButton onClick={handleDelete} className='delete'>
             <DeleteIcon/>
            </IconButton>
          </div>
         </Message>
       </Row>
      ))}
    </MailContainer>
 </Layout>
  )
}
export default Trash