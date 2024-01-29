import axios from "axios";

const getGenData = async () => {
    try {
        const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/stats`);
        return data;
    } catch (error) {
        // alert("error occurred")
        return { error: "error"};
    }
}
const checkifadmin=async(mail,password)=>{
    try {
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/checkifadmin`,{
            mail:mail,
            password:password
        });
        return data;
    } catch (error) {
        if(error.response.data.error==="Not Verified"){
            alert("For admin access contact +919311450234 or +919810511869");
            return {}
        }
        alert(error.response.data.error)
        return { error: "error"};
    }
}
const getevenlist=async()=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/adoe`);
        return data;
    }
    catch(error){
        return { error: "error"};
    }
}
const geteventreg=async()=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/coer`);
        return data.data;
    }
    catch(error){
        // alert("error occurred")
        return { error: "error"};
    }
}
const addadmin=async(email,password)=>{
    try{
        const data=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/adminadd`,{mail:email,password:password});
        return data;
    }
    catch(error){

        if(error.response && error.response.status===403){
            alert(error.response.data.error);
        }
        // alert("error occurred")
        return { error: "error"};
    }
}
export {checkifadmin, getGenData, getevenlist,geteventreg, addadmin };