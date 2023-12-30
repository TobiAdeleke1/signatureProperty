import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../api-client';

export default function SignIn () {
    const navigate = useNavigate();
    const [error, setError] = useState('o');
    const { register,  handleSubmit, formState:{ errors } } = useForm();

    function handleSetErr(err){
        setError(err.message);
        console.log(error);
    } 
    // State is built to the mutation hook, so no need to manage useHook
    const mutation = useMutation(apiClient.signinClient, {
        onSuccess: () =>{
            console.log("Login Successful!");
            navigate("/");
        },
        onError: (err) =>{
            console.log(err);
            setError(err.message); 
            
        },
    });
   
    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data); // pass data to use mutate and then to our server
        
    });
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>
            Sign In
            </h1>
            <form className='flex flex-col gap-4' onSubmit={onSubmit}>
             
              <label className='text-slate-700 text-sm font-bold'>
                    Email
                    <input type='email' className='border p-3 rounded-lg w-full'
                     id='email' {...register("email", {required: "This field is required"})}/>
                     {errors.email && (
                        <span className='text-red-500'> {errors.email.message }</span>
                    ) }
            </label>
                <label className='text-slate-700 text-sm font-bold'>
                    Password
                    <input type='password'
                     className='border p-3 rounded-lg w-full'
                     id='password'
                     {...register("password", {
                        required: "This field is required", 
                        minLength:{
                            value:6,
                            message: "Password must be at least 6 Characters",
                        },
                    })}/>
                     {errors.password && (
                        <span className='text-red-500'> {errors.password.message }</span>
                    ) }
                </label>
              
              <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 
              disabled:opacity-80' > 
               SIGN In 
              </button>
              {/* {error && <p className='text-red-500 mt-5'>{error}</p>}   */}
            </form>
           
            <div className='flex gap-2 mt-5'>
                <p>Do not have an account?</p>
                <Link to={"/sign-up"}>
                    <span className='text-blue-700'> Sign Up</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}