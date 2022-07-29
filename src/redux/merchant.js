// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  merchantData: {},
  bdApprovalData: {},
  bdLoanLimitRequestSubmitted: [],
  cmLoanLimitReqData: [],
  cmSelectedReqData: {},
  cmLookupProductId: []
}

export const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    handleRequestSubmittedByBD: (state, action)=>{
      state.bdLoanLimitRequestSubmitted = action.payload
    },
    handleMerchantData: (state, action) => {
      state.merchantData = action.payload
    },
    setBDApprovalData: (state, action)=>{
      Object.assign(state.bdApprovalData, action.payload)
    },
    setLoanLimitReqDataForCM: (state, action) => {
      // state.cmLoanLimitReqData.length = 0;
      state.cmLoanLimitReqData = action.payload.slice(0)
    },
    setSelectedCMRequestData: (state, action) => {
      state.cmSelectedReqData = Object.assign(state.cmSelectedReqData, action.payload);
    },
    setLookupProductIDCreditMemo: (state, action) => {
      state.cmLookupProductId = action.payload;
    },
    resetMerchantData: (state, action) =>{
      Object.assign(state, initialState)
    }
  }
})

export const { handleRequestSubmittedByBD, handleMerchantData, setBDApprovalData, setLoanLimitReqDataForCM,
  setSelectedCMRequestData, resetMerchantData, setLookupProductIDCreditMemo
} = merchantSlice.actions

export default merchantSlice.reducer;