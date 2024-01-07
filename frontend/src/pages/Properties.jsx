import React from 'react';
import ManagePropertyForm from '../forms/ManagePropertyForm/ManagePropertyForm';

export default function Properties () {

    return (
        <main className='p-3 max-w-4xl mx-auto'>
        
        <h1 className='text-3xl font-semibold text-center my-7'>
          Add a Property
         </h1>
        <ManagePropertyForm />
        </main>
    )
}