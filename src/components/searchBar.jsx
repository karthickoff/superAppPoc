import React, { useState } from 'react'
import "../css/searchBar.css";
export default function SearchBar(props) {
    const handleChange = (e) => {
        console.log("eeeee", e);
        props.handleSearch(e)
    }
    return (
        <div>
            <div className="searchArea">
                <input type="text" className='search_input' name={props.name} placeholder='Enter stock Name' onChange={handleChange} />
            </div>


        </div>
    )
}