// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// export const getLogin = createAsyncThunk(SV_GET_TOKEN, async (payload) => {
//   console.log("CALLED");
//   let item = {
//     clientId: "cloe-ext-login",
//     username: "admin-cust",
//     password: "123",
//     grantType: "password",
//     // ...payload
//   }
//   api.post(SV_GET_TOKEN, item)
//   .then(response=>{
//     console.log("nilai res"+JSON.stringify(response));
//     return { 
//       credential: response
//     }
//   }).catch(error=>{
//     console.log("Error Happen When getLogin "+JSON.stringify(item));
//   })
// })

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    credential: {}
  },
  reducers: {
    handleLogin: (state, action) => {
      state.credential = action.payload.value
    }
  }
  // ,
  // extraReducers: builder => {
  //   builder
  //     .addCase(getLogin.fulfilled, (state, action) => {
  //       state.credential = action.payload.response
  //     })
  // }
})

export const { handleLogin } = loginSlice.actions

export default loginSlice.reducer
