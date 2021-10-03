//import React, { useState, useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import style from "./navbar.module.css"

const navbar=() => {
    return(
        <div>
        <div>
        <h1><NavLink className={style.lettre} to="/paginaprincipal">home</NavLink></h1>
        <h1><NavLink to="/form">formularies</NavLink></h1>
        </div>
        </div>

    )
}

export default navbar;
