import axios from "axios"
const API_URL = `https://gmail-clone-backend-2ovm.onrender.com`;
// const API_URL = `http://localhost:8005`;

export const login=async(user)=>{
try {
    const response= await axios.post(url,user);
    console.log(response)
        
 } catch (error) {
    console.log(error);
 }
}
