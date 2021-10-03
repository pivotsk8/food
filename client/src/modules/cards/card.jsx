import React from 'react'
//import styles from "./style.module.css"
import {NavLink} from "react-router-dom"


const Card=({ image,id,name, diets, getSearch})=> {
    
    // const handleSubmit = () => {
    //   getSearch(id)
    // }

    return (
        <div>
            <div >
            
                <button >
                    <NavLink  to="/details"><img src={image} /></NavLink>
                 </button> 
                <div >
                    <ul>
                        <li>{name}</li>
                        <p>{diets}</p>
                    </ul>
                </div>

            </div>
        </div>
    )

}

export default Card