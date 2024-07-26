import {createSlice} from '@reduxjs/toolkit'

export const authSlice=createSlice({
    name:'auth',
    initialState:{isloggedIn:false,token:""},
    reducers:{
        login:(state,action)=>{
            state.isloggedIn=true,
            state.token=action.payload
        },
        logout:(state)=>{
            state.isloggedIn=false
            state.token=""
        }
    }
})

export const { login,logout } = authSlice.actions

export default authSlice.reducer

