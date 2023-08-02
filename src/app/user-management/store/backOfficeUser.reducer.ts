import { createReducer, on } from "@ngrx/store";
import * as fromAction from './backOfficeUser.action';
export interface State {
    backOfficeUserData: any;
    loading: boolean;
    error: string;
    backOfficeAdded: boolean;
    backOfficeEdited: boolean;
    backOfficeUserLoaded:boolean;
    passwordChanged:boolean
  }
  const initialState: State = {
    backOfficeUserData: null,
    loading: false,
    error: '',
    backOfficeAdded: false,
    backOfficeEdited: false,
    backOfficeUserLoaded:false,
    passwordChanged:false
  };
  export const backOfficeUserReducer = createReducer(
    initialState,
    on(fromAction.addBackOfficeUserSucceed, (state,  {backOfficeUser}) => ({
      ...state,
      backOfficeUserData: backOfficeUser,
      loading: false,
      backOfficeAdded:true,
      error: "",
    })),
    on(fromAction.addBackOfficeUserFailed, (state,  {error} ) => ({
      ...state,
      loading: false,
      backOfficeAdded:false,
      error: error+"",
    })),
    on(fromAction.editBackOfficeUserLoaded, (state,  backOfficeUser) => {
      
      return{
      ...state,
      loading: false,
      backOfficeUserData:backOfficeUser.backOfficeUser,
      error: "",
      backOfficeUserLoaded:true
    }}),
    on(fromAction.setPasswordBackOfficeUserSuccess, (state) => {
      
      return{
      ...state,
      loading: false,
      error: "",
      passwordChanged:true
    }}),
    on(fromAction.setPasswordBackOfficeUserFailed, (state, error  ) => {
      
      return{
      ...state,
      loading: false,
      error: error+"",
      passwordChanged:false
    }})
    )

  