// How to get/use environment variables in vite.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const signupClient = async (formData) =>{
    // Fetch request to the server 
    //  automatic stringify the body of the request to JSON
    const response = await fetch(`${API_BASE_URL}/api/users/signup`,{
        method: 'POST',
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
    });

    // Convert response to json and check it its okay
    const responseBody = await response.json();
    if(!response.ok){
        throw new Error(responseBody.message);
    }

}