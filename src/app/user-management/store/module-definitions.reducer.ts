import { createReducer, on } from "@ngrx/store";
import { Modules } from "../models/ModuleDefinition";
import *  as fromAction from "./module-definitions.action";
import { state } from "@angular/animations";
export interface State {
    
    loading: boolean;
    error: string;
    moduleDefinitions:any;
    selectedModulesDefinition:any;
    protectedDocument:any;
    selectedModuleId:string;
    SelectedRole:any;selectedDocumentDefinition:any;
   
  }
  const initialState: State = {
   
    loading: false,
    error: '',
    moduleDefinitions:[],
    selectedModulesDefinition:null,
    selectedModuleId:"",
    SelectedRole:null,
    protectedDocument:null,
    selectedDocumentDefinition:null
  };

export const  moduleDefinitionsReducer=createReducer(initialState,
   on(fromAction.modulesDefinitionsLoaded,(state,moduleDefinitions) => ({
    ...state,
    moduleDefinitions: moduleDefinitions,
    loading: false,
    error: "",
  })), on(fromAction.loadModuleDefinitionFailed, (state,  {error} ) => ({
    ...state,
    loading: false,
    
    error: error+"",
  })), 
  on(fromAction.moduleDefinitionByIdLoaded, (state,  {selectedModulesDefinition} ) => ({
    ...state,
    loading: false,
    selectedModulesDefinition:selectedModulesDefinition
    
  })),on(fromAction.resetSelectedModuleDefinition,(state)=>({
...state,
loading:false,
selectedModulesDefinition:null,
error: "",



  })),on(fromAction.selectModuleStart,(state,{id})=>({
    ...state,
    selectedModuleId:id
    
    
    
      })
    ),on(fromAction.RoleByIdLoaded,(state,{ item})=>({
      ...state,
      SelectedRole:item,
      error:"",
      
      
      
        })

      ),on(fromAction.loadProtectedDocumentLoaded,(state,{ item})=>({
        ...state,
        protectedDocument:item,
        error:"",
        
        
        
          })
          
        )
        ,on(fromAction.documentDefinitionByIdLoaded,(state,{ selectedDocumentDefinition})=>({
          ...state,
          selectedDocumentDefinition:selectedDocumentDefinition,
          error:"",
          
          
          
            })
            
          )
        )