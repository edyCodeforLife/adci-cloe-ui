// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customerData: {},
    loanLimitRequestId: "",
    merchantStructureLoanLimit: [],
    merchantDocument: [],
    creditLimitAmount: {},
  },
  reducers: {
    customerData: (state, action) => {
      state.customerData = action.payload
    },
    setmerchantStructureLoanLimit: (state, action) => {
      state.merchantStructureLoanLimit = [...action.payload]
    },
    setLoanLimitRequestID: (state, action) => {
      state.loanLimitRequestId = action.payload
    },
    setMerchantDocument: (state, action) => {
      state.merchantDocument = [...action.payload]
    },
    setCreditAmountLimit: (state, action) => {
      state.creditLimitAmount = Object.assign(state.creditLimitAmount, action.payload)
    },
  }
})

export const { customerData, setmerchantStructureLoanLimit, setLoanLimitRequestID,
  setCreditAmountLimit, setMerchantDocument
} = customerSlice.actions

export default customerSlice.reducer;
