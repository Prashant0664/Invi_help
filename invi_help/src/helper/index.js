import axios from "axios";

const getGenData = async () => {
    try {
        const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/stats`);
        return data;
    } catch (error) {
        console.log(error)
        // alert("error occurred")
        return { error: "error"};
    }
}
const getevenlist=async()=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/adoe`);
        return data;
    }
    catch(error){
        console.log(error)
        // alert("error occurred")
        return { error: "error"};
    }
}
const geteventreg=async()=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/coer`);
        return data.data;
    }
    catch(error){
        console.log(error)
        // alert("error occurred")
        return { error: "error"};
    }
}
export { getGenData, getevenlist,geteventreg };