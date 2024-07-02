import {createSlice} from '@reduxjs/toolkit'

export const authSlice=createSlice({
    name:'auth',
    initialState:{isloggedIn:false,role:"customer"},
    reducers:{
        login:(state,action)=>{
            state.isloggedIn=true,
            state.role=action.payload
        },
        logout:(state)=>{
            state.isloggedIn=false
        }
    }
})

export const { login,logout } = authSlice.actions

export default authSlice.reducer

