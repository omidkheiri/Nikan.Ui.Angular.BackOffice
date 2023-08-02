import { createReducer, on } from '@ngrx/store';
import * as fromAction from './form-builder.action';
import { state } from '@angular/animations';
export interface State {
  formBuilderFormData: any;
  loading: boolean;
  error: string;
  formBuilderAdded: boolean;
  formBuilderEdited: boolean;
  formDesignerData: any;
}
const initialState: State = {
  formBuilderFormData: null,
  loading: false,
  error: '',
  formBuilderAdded: false,
  formBuilderEdited: false,
  formDesignerData: null,
};
export const formBulderReducer = createReducer(
  initialState,
  on(fromAction.AddFormBuilderStart, (state, { FormBuilder: FormBuilder }) => ({
    ...state,
    formBuilderFormData: FormBuilder,
    loading: true,
  })),
  on(fromAction.AddFormBuilderFail, (state, { payload: error }) => ({
    ...state,

    loading: false,
    error: error,
  })),
  on(
    fromAction.AddFormBuilderSuccess,
    (state, { payload: { success: success } }) => {
      
     

      return{
      ...state,
      loading: !success,
      FormBuilderAdded: true,
      error: '',
    }}
  ),
  on(
    fromAction.EditFormBuilderSuccess,
    (state, { payload: { success: success, FormBuilder: FormBuilder } }) => ({
      ...state,
      loading: false,
      formBuilderEdited: true,
      formBuilderFormData: FormBuilder,
      error: '',
    })
  ),
  on(fromAction.FormBuilderResetForm, (state) => ({
    ...state,
    formBuilderFormData: null,
    loading: false,
    error: '',
    formBuilderAdded: false,
    formBuilderEdited: false,
  })),
  on(
    fromAction.LoadFormBuilderSuccess,
    (state, { FormBuilder: FormBuilder }) => ({
      ...state,
      formBuilderFormData: FormBuilder,
      loading: false,
      error: '',
    })
  ),
  on(fromAction.LoadFormDesignSuccess, (state, { FormDesigner: form }) => ({
    ...state,
    formDesignerData: form,
    loading: false,
    error: '',
  })),on(fromAction.ClearState,(state)=>({

    ...state,
    formDesignerData: null,
    loading: false,
    error: '',

  }))
);
