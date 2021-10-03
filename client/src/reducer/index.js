import {GET_ALL_RECIPE} from '../action/index'
const inizialstate = {
recipes:[]
}

function rootReducer(state = inizialstate, action) {
switch (action.type) {
    case  GET_ALL_RECIPE:
        return {
            ...state,
            recipes:action.payload
        
        }
     

    default:
        return state
}
}

export default rootReducer;