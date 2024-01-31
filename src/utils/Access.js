import toast from "react-hot-toast";

export function accessValidation(accessToken){
    if(accessToken===undefined || accessToken===null || accessToken===""){
        toast.error('Something went wrong!');
        window.location.href="/"
    }
}