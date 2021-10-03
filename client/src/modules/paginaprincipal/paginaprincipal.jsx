import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getRecipients } from "../../action/index"
//import { connect } from "react-redux"
import Nav from "../navbar/navbar"
import Card from "../cards/card"


const Paginaprincipal = () => {
    const { recipes } = useSelector(state => state)
    const dispatch = useDispatch()
   // const [page,setPage]=useState(1)

    useEffect(() => {
        dispatch(getRecipients())
    }, [dispatch])

    // const changePage = (page) => {
    //     dispatch(getRecipients({ page }))
    // }



    return (
        <div>
            <Nav />
            {
                recipes.length > 0 && recipes.map((e) => {
                    return <Card image={e.image} name={e.name}  />

                })
            }
            {
              
            }
        </div>
    )
}

// function mapDispatchToProps(dispatch) {
//     return {
//         getRecipients: () => dispatch(getRecipients()),
//     }
// }
// function mapStateToProps(state) {
//     return {
//         recipe: state.recipes,

//     }
// }

//export default connect(mapStateToProps, mapDispatchToProps)(Paginaprincipal)
export default Paginaprincipal