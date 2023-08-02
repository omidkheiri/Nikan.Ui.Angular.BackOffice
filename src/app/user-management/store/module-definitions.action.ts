import { createAction, props } from "@ngrx/store";
import { Modules } from "../models/ModuleDefinition";

export const loadModulesDefinitionsStart=createAction('[Module page] load modules definitions start');
export const addModulesDefinitionsStart=createAction('[Module page] add modules definitions start',
props<{request:any}>());
export const updateModulesDefinitionsStart=createAction('[Module page] update modules definitions start',
props<{request:any}>());
export const modulesDefinitionsLoaded=createAction('[Module page] load modules definitions loaded',
props<{ modulesDefinitions: any;}>());

export const loadModuleDefinitionFailed=createAction('[Module page] load modules definitions failed',
props<{ error: any;}>());
export const loadModuleDefinitionByIdStart=createAction('[Module page] load module definition by id start',
props<{id:string}>());
export const resetSelectedModuleDefinition=createAction('[Module page] reset selected modules definitions');
export const moduleDefinitionByIdLoaded=createAction('[Module page] load modules definitions by id loaded',
props<{ selectedModulesDefinition: any;}>());
export const addModulesPermissionStart=createAction('[Module page] add modules permission start',
props<{request:any}>());
export const selectModuleStart=createAction('[Module page] select node',
props<{id:any}>());
export const getRoleByIdStart = createAction(
    '[Role Management Edit] Get Role By Id Start',
    props<{id:any}>()
  );
  export const RoleByIdLoaded = createAction(
    '[Role Management Edit] Get Role By Id Loaded',
    props<{item:any}>()
  );
  export const RoleModulePermissionStart = createAction(
    '[Role Management Edit] Role Module Permission Start',
    props<{request:any}>()
  );

  export const loadProtectedDocumentStart=createAction('[Role Management Edit] load Protected Document Start');
  export const loadProtectedDocumentLoaded = createAction(
    '[Role Management Edit] load Protected Document Loaded',
    props<{item:any}>()
  );


  export const RoleAddProtectedDocumentStart = createAction(
    '[Role Management Edit] Role Add Protected Document Start',
    props<{request:any}>()
  );
  export const RoleRemoveProtectedDocumentStart = createAction(
    '[Role Management Edit] Role Remove Protected Document Start',
    props<{request:any}>()
  );


/*---------------------------------------------------*/
  
export const loadDocumentDefinitionsStart=createAction('[DocumentDefinitions page] load Document Definitions start');

export const loadDocumentDefinitionByIdStart=createAction('[DocumentDefinition page] load Document Definition by id start',
props<{id:string}>());
export const documentDefinitionByIdLoaded=createAction('[DocumentDefinition page] load Document Definition by id loaded',
props<{ selectedDocumentDefinition: any;}>());



export const addDocumentDefinitionsStart=createAction('[DocumentDefinition page] add Document Definition definitions start',
props<{request:any}>());
export const updateDocumentDefinitionsStart=createAction('[DocumentDefinition page] update Document Definition definitions start',
props<{request:any}>());
export const addDocumentPermissionStart=createAction('[DocumentDefinition permission page] update Document Definition definitions start',
props<{request:any}>());
export const loadDocumentDefinitionFailed=createAction('[Document Definition page] load Document Definition definitions failed',
props<{ error: any;}>());


