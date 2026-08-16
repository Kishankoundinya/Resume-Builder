import {configureStore} from '@reduxjs/toolkit'

import authReducer from './features/authsSlice.js'

export const store=configureStore({
    reducer:{
        auth:authReducer
    }
})