// How to get/use environment variables in vite.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getCurrentUser = async() =>{
    const response = await fetch(`${API_BASE_URL}/api/users/me`,{
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Error fetching User");
    }
    
    return response.json();
};

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

export const signinClient = async(formData) =>{
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

export const addProperty = async(propertyFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/property/create`,{
        method:"POST",
        credentials:"include",
        body: propertyFormData,
    });
    if(!response.ok){

        throw new Error("Could not create property");
    }

    return response.json();
};

export const getProperties = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/property/`,{
        credentials:"include",
    });
    if(!response.ok){
        throw new Error("Error getting properties");
    }
    return response.json();
};

export const getPropertyById = async(propertyId) =>{
    const response = await fetch(`${API_BASE_URL}/api/property/${propertyId}`,{
        credentials: "include",
    });

    if(!response.ok){
        throw new Error("Error getting property");
    }
    return response.json();
};

// Duplicate endpoint might remove 
export const getCurrentPropertyById = async(propertyId) =>{
    const response = await fetch(`${API_BASE_URL}/api/property/${propertyId}`,{
    });
    if(!response.ok){
        throw new Error("Error getting property");
    }
    return response.json();
};

export const updatePropertyById = async(propertyFormData) =>{
    const response = await fetch(
      `${API_BASE_URL}/api/property/${propertyFormData.get("propertyId")}`,
      {
        method: "PUT",
        body: propertyFormData,
        credentials: "include",
      }  
    );

    if(!response.ok){
        throw new Error("Failed to update Property");
    }

    return response.json();
};

export const searchProperty = async(searchParams) =>{
    // Build the query to send to the backend api
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("bedroom", searchParams.bedroom || "");
    queryParams.append("bathroom", searchParams.bathroom || "");
    queryParams.append("page", searchParams.page || "");

    const response = await fetch(`${API_BASE_URL}/api/findproperty/search?${queryParams}`);

    if(!response){
        throw new Error("Error Fetching Properties");
    }
    
    return response.json();
};

export const createPaymentIntent = async( 
    propertyId,
    numberOfNights 
    )=>{
    const response = await fetch(
        `${API_BASE_URL}/api/property/${propertyId}/bookings/payment-intent`,
        {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({numberOfNights}),
            headers:{
                "Content-Type": "application/json",
            }
        }
        );
        if(!response.ok){
            throw new Error("Errors fetching payment intent");
        }

        
    return response.json();
};

export const createPropertyBooking = async( propertyFormData) =>{

  const response = await fetch(`${API_BASE_URL}/api/property/${propertyFormData.propertyId}/bookings`,
  {
    method: "POST",
    headers: {
        "Content-Type":"application/json",
    },
    credentials:"include",
    body: JSON.stringify(propertyFormData),
  })

  if(!response.ok){
    throw new Error("Error booking room");
  }

};

// export const editPropertyById = async(propertyId) =>{
//     const response = await fetch(`${API_BASE_URL}/api/property/edit/${propertyId}`,{
//         credentials: "include",
//     });

//     if(!response.ok){
//         throw new Error("Error getting property");
//     }
//     return response.json();
// };