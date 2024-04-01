import axios from "axios"
// const url = `https://gmail-clone-backend-qrqi.onrender.com`;
const url=`http://localhost:8005`

export const login=async(user)=>{
try {
    const response= await axios.post(url,user);
    console.log(response)
        
 } catch (error) {
    console.log(error);
 }
}