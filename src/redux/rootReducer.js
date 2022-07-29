// ** Reducers Imports
import layout from './layout'
import navbar from './navbar'
import login from './login'
import customer from './customer'
import merchant from './merchant'
import upload from './upload'
import creditAnalysis from './creditAnalysis'
import committee from './committee'
import general from './general'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({ navbar, layout, login, customer, merchant, upload, creditAnalysis, committee , general})

export default rootReducer
