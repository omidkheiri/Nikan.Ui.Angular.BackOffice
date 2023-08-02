import { createAction, props } from "@ngrx/store";




export const loadBackOfficeUserStart = createAction(
  '[Back Office User Edit] Add Back Office User start',
  props<{
  
      userId: string;
 
  }>()
);
export const editBackOfficeUserLoaded = createAction(
  '[Back Office User Edit] Add Back Office User Loaded',
  props<{
  
    backOfficeUser: any;
 
  }>()
);

export const editBackOfficeUserStart = createAction(
  '[Back Office User Edit] Edit Back Office User start',
  props<{
  itemId:string,
      backOfficeUser: any;
 
  }>()
);

export const addBackOfficeUserStart = createAction(
    '[Back Office User Add] Add Back Office User start',
    props<{
    
        backOfficeUser: any;
   
    }>()
  );
  export const addBackOfficeUserSucceed = createAction(
    '[Back Office User Add] Add Back Office User Succeed',
    props<{
   
        backOfficeUser: any;
    
    }>()
  );
  export const addBackOfficeUserFailed = createAction(
    '[Back Office User Add] Add Back Office User Faild',
    props<{
     
        error: any;
      
    }>()
  );

  export const setPasswordBackOfficeUserStart = createAction(
    '[Back Office User Password] Add Back Office User Started',
    props<{
     userId:string;
        PasswordModel: any;
      
    }>()
  );
  export const setPasswordBackOfficeUserFailed = createAction(
    '[Back Office User Password] Add Back Office User Failed',
    props<{
     
        error: any;
      
    }>()
  );
  export const setPasswordBackOfficeUserSuccess = createAction(
    '[Back Office User Password] Add Back Office User Success'
  );


  
  