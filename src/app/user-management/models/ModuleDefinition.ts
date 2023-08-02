

export interface Modules {
    moduleDefinitions:    Modules[];
    modulePermissionDefinitions: PermissionDefinition[];
    title:                string;
    moduleDefinitionId:   null | string;
    id:                   string;
    tenantId:             string;
    domainEvents:         any[];
  }
  
  export interface PermissionDefinition {
    title:        string;
    id:           string;
    tenantId:     string;
    domainEvents: any[];
  }