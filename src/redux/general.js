// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  readOnly: false,
  dashboardData: {}
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setDashboardData: (state, action) => {      
      state.dashboardData = Object.assign(state.dashboardData, action.payload)
    },
    resetGeneral: (state) => {
      Object.assign(state, initialState)
    }
  }
})

export const { setLoading, setDashboardData, resetGeneral } = generalSlice.actions

export default generalSlice.reducer
