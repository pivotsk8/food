
import React, {  useEffect } from 'react';
import style from "./landing.module.css";
import { NavLink } from "react-router-dom"
import { getRecipients } from "../../action/index.js"
import { connect } from "react-redux"

export const Landingpage = ({getRecipients}) => {
    useEffect(() => {
        getRecipients()
    }, [])
   
    return (
        <div className={style.fondo}>
            <div>
               <NavLink to="/paginaprincipal"><h4>entra</h4></NavLink>
            </div>
       
        </div>
    )
}
function mapDispatchToProps(dispatch) {
    return {
        getRecipients: () => dispatch(getRecipients()),
    }
}
export default connect(null, mapDispatchToProps)(Landingpage)