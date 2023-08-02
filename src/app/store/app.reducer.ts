import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromFormBuilder from '../form-builder/store/form-builder.reducer';
import * as fromBackOfficeUser from '../user-management/store/backOfficeUser.reducer'
import * as fromModulesDefinitions from '../user-management/store/module-definitions.reducer'
export interface AppState {
  auth: fromAuth.State;
  backOfficeUser:fromBackOfficeUser.State;
  formBuilder: fromFormBuilder.State;
  modulesDefinitions:fromModulesDefinitions.State;
 
}
export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  formBuilder: fromFormBuilder.formBulderReducer,
  backOfficeUser:fromBackOfficeUser.backOfficeUserReducer,
  modulesDefinitions:fromModulesDefinitions.moduleDefinitionsReducer
 
};