import { createAction, props } from '@ngrx/store';
import { FormBuilder } from 'formiojs';

export const AddFormBuilderSuccess = createAction(
  '[FormBuilder Add] Add FormBuilder form success',
  props<{
    payload: {
      success: boolean;
    };
  }>()
);
export const ClearState = createAction(
  '[FormBuilder Designer] Clear State'
);

export const AddFormBuilderStart = createAction(
  '[FormBuilder Add] Add FormBuilder form',
  props<{ FormBuilder: any }>()
);



export const ImportFormTemplateStart=createAction(
'[FormBuilder Import] Import FormBuilder builder',

props<{FormBuilder:any}>()
)



export const EditFormBuilderStart = createAction(
  '[FormBuilder Edit] Edit FormBuilder form',
  props<{ Id: string; FormBuilder: any }>()
);
export const LoadFormBuilderStart = createAction(
  '[FormBuilder Edit] load Edit FormBuilder form ',
  props<{ Id: string }>()
);

export const AddFormBuilderFail = createAction(
  '[FormBuilder Add] Add FormBuilder Faild',
  props<{ payload: string }>()
);
export const EditFormBuilderFail = createAction(
  '[FormBuilder Add] Add FormBuilder Faild',
  props<{ payload: string }>()
);

export const FormBuilderResetForm = createAction(
  '[FormBuilder Add] Add FormBuilder rest form'
);
export const LoadFormBuilderSuccess = createAction(
  '[FormBuilder Edit] Load FormBuilder Info Success',
  props<{ FormBuilder: any }>()
);
export const EditFormBuilderSuccess = createAction(
  '[FormBuilder Edit] Edit FormBuilder Info Success',
  props<{
    payload: {
      success: boolean;
      FormBuilder: any;
    };
  }>()
);
export const LoadFormDesignStart = createAction(
  '[Form Designer Edit] Edit Form Designer Success',
  props<{ Id: string }>()
);
export const LoadFormDesignSuccess = createAction(
  '[Form Designer Edit] Load Form Designer Success',
  props<{ FormDesigner: any }>()
);
export const AddFormDesignStart = createAction(
  '[Form Designer Add] Add Form Designe Version',
  props<{ Id: string; design: any }>()
);

export const LoadFormTranslateStart = createAction(
  '[FormTranslate Edit] load Form TranslateStart form ',
  props<{ Id: string }>()
);

export const LoadFormTranslateSuccess = createAction(
  '[FormTranslate Edit] Load LoadForm Translate Success',
  props<{ Translate: any }>()
);
