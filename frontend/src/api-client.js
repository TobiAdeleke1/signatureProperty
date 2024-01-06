// How to get/use environment variables in vite.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const signupClient = async (formData) =>{
    // Fetch request to the server 
    //  automatic stringify the body of the request to JSON
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`,{
        method: 'POST',
        credentials:"include",
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
};

export const signinClient = async (formData) =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/signin`,{
        method: 'POST',
        credentials:"include",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();
    if(!response.ok){
        throw new Error(responseBody.message);
    }

    return responseBody;
};

export const validateToken = async() =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:"include",
    });    
    if(!response.ok){
        throw new Error("Token Invalid");
    }

    return response.json();
};

export const logoutClient = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials:"include",
        method: "POST",
    });

    if(!response.ok){
        throw new Error("Could Not Sign Out");
    }
};