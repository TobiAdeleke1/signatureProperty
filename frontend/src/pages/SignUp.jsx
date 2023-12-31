import React , { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../api-client';

export default function SignUp () {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { register, watch, handleSubmit, formState:{ errors } } = useForm();


    // State is built to the mutation hook, so no need to manage useHook
    const mutation = useMutation(apiClient.signupClient, {
        onSuccess: () =>{
            console.log("Registration Successful!");
            navigate("/sign-in");
        },
        onError: (error) =>{
            console.log(error.message);
            setError(err.message); 
        },
    });


    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data); // pass data to use mutate and then to our server
    });
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>
            Create An Account
            </h1>
            <form className='flex flex-col gap-4' onSubmit={onSubmit}>
             
              <div className='flex flex-col md:flex-row gap-3'>
                <label className='text-slate-700 text-sm font-bold'>
                    First Name
                <input type='text' className='border p-3 rounded-lg w-full'
                  id='firstName' {...register("firstName", {required: "This field is required"})}/>
                  {errors.firstName && (
                        <span className='text-red-500'> {errors.firstName.message }</span>
                    ) }
                </label>
                <label className='text-slate-700 text-sm font-bold'>
                    Last Name
                    <input type='text' className='border p-3 rounded-lg w-full'
                     id='lastName' {...register("lastName", {required: "This field is required"})}/>
                    {errors.lastName && (
                        <span className='text-red-500'> {errors.lastName.message }</span>
                    ) }
                    
                </label>
                
              </div>
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
                <label className='text-slate-700 text-sm font-bold'>
                    Confirm Password
                    <input type='password'
                     className='border p-3 rounded-lg w-full'
                     id='confirmpassword'
                     {...register("confirmPassword", {
                        validate:(val) =>{ //Do custom validations on react hook forms
                            if(!val){
                                return "This field is Required";
                            }else if(watch("password") != val){
                                return "Your Password do not match";
                            }
                        }
                    },
                    )}/>
                      {errors.confirmPassword && (
                        <span className='text-red-500'> {errors.confirmPassword.message }</span>
                    ) }
                </label>   
              
              <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 
              disabled:opacity-80'> 
               SIGN UP 
              </button>

            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to={"/sign-in"}>
                    <span className='text-blue-700'> Sign In</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}