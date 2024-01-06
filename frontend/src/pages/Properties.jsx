import React from 'react';

export default function Properties () {
    return (
       <main>
        <h1 className='text-3xl font-semibold text-center my-7'>
         Add a Property
        </h1>
        <form className='flex flex-col sm:flex-row'>
            <div className=''>
                <input type='text' placeholder='Name'
                 className='border p-3 rounded-lg focus:outline-none' id='name'
                  maxLength='65' minLength='10' required/>
            </div>


        </form>
       </main>
    )
}