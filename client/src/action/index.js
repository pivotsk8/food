import axios from 'axios';
export const GET_ALL_RECIPE = "GET_ALL_RECIPE"

export const getRecipients = () => {
 
    return (dispatch) => {
        return axios.get(`http://localhost:3001/recipe}`)
            .then((response) => {
                dispatch({
                    type: GET_ALL_RECIPE,
                    payload: response.data,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}