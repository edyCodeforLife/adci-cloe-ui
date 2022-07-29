// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { returnIndex } from '../utility/Utils'

const initialState = {
    loanData: {}
}

export const committeeSlice = createSlice({
    name: 'committee',
    initialState,
    reducers: {
        setLoanDataForLoanCommittee: (state, action) => {
            Object.assign(state.loanData, action.payload) 
        },
        resetLoanDataCommittee: (state) => {
            Object.assign(state, initialState)
        }
    }
})

export const { setLoanDataForLoanCommittee, resetLoanDataCommittee
} = committeeSlice.actions

export default committeeSlice.reducer
