// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { returnIndex } from '../utility/Utils'

const initialState = {
  purposeContent: '',
  customerDetailContent: '',
  factorsContent: {
    "scouring": []
  },
  combineContent: '',
}

export const creditAnalysisSlice = createSlice({
  name: 'creditAnalysis',
  initialState,
  reducers: {
    setPurposeContent: (state, action) => {
      state.purposeContent = action.payload
    },
    setCustomerDetailContent: (state, action) => {
      state.customerDetailContent = action.payload
    },
    setTotalFactorsContent: (state, action) => {
      state.factorsContent = Object.assign(state.factorsContent, action.payload)
    },
    setScouringFactorsContent: (state, action) => {
      let tempIndex = returnIndex(state.factorsContent?.scouring, "factorId", action.payload?.factorId)
      if (tempIndex != -1) {
        state.factorsContent.scouring[tempIndex] = action.payload
      } else {
        state.factorsContent.scouring = [...state.factorsContent?.scouring, action.payload]
      }
    },
    setCombineContent: (state, action)=>{
      state.combineContent = action.payload
    },
    resetCreditAnalysis: (state) => {
      Object.assign(state, initialState)
    }
  }
})

export const { setPurposeContent, setCustomerDetailContent,
  setTotalFactorsContent, setScouringFactorsContent, setCombineContent,
  resetCreditAnalysis
} = creditAnalysisSlice.actions

export default creditAnalysisSlice.reducer
