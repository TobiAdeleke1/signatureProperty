
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from '../api-client';


export default function SignOutButton(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.logoutClient, {
        onSuccess: async() =>{
            await queryClient.invalidateQueries("validateToken"); 
            navigate("/sign-in");

        },
        onError: (error)=>{
            console.log(error.message);
        }
    });

    const handleClick = () =>{
        mutation.mutate();
    }

    return (
        <button onClick={handleClick} className="text-slate-700 px-3 font-bold hover:underline ">
            Sign out
        </button>
    )

};