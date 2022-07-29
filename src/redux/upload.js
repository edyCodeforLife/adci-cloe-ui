// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const  initialState={
  UploadDoc: [  
  ]
}

export const UploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    uploadDocData: (state, action) => {
      state.UploadDoc = [...action.payload]
    },
    resetUploadData: (state)=>{            
      Object.assign(state, initialState)
    }
  },
  
})

export const { uploadDocData, resetUploadData } = UploadSlice.actions

export default UploadSlice.reducer
