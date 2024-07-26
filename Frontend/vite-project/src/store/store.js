import { configureStore } from '@reduxjs/toolkit'
import authReducer from './index'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
}) 