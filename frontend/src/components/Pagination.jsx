import React from "react";

export default function Pagination({page, pages, onPageChange}){
    // 1. Create an array of numbers of pages
    // 2. If the number is the current page, highlight it
    // 3. Allow button to call the function of the corresponding page: Awesome !!
    const pageNumbers = [];
    for(let i = 1; i<=pages; i++){
        pageNumbers.push(i);
    }
    return(
        <div className="flex justify-center">
            <ul className="flex border border-slate-300">
                {pageNumbers.map((number) =>(
                    <li className={`px-2 py-1 ${page === number ? "bg-gray-200":" "}`}>
                        <button 
                           className="bg-transparent"
                           onClick={()=>onPageChange(number)}
                           >
                           {number}
       
                        </button>
                    </li>
                ))}

            </ul>

        </div>
    )
}