import { createAction, props } from '@ngrx/store';
export const loadContactStart = createAction(
  '[conatct page] get contact',
  props<{ accountId: string; contactId: string }>()
);
export const loadContactFinished = createAction(
  '[conatct page] get contact',
  props<{ contact: any }>()
);

export const updateContactItemStart = createAction(
  '[conatct page] update contact api start',
  props<{ accountId: string; contactId: string; contact: any }>()
);
export const updateContactItemfinished = createAction(
  '[conatct page] update contact api start',
  props<{ contact: any }>()
);
export const saveContactStart = createAction(
  '[conatct page] save contact',
  props<{ accountId: string; contact: any }>()
);
export const loadAccountListStart = createAction(
  '[contact page] load accoutn list',
  props<{ searchTerm: string }>()
);
export const loadAccountListFinished = createAction(
  '[contact page] load accoutn list finished',
  props<{ accounts: any }>()
);
export const saveContactFinished = createAction(
  '[conatct page] save contact',
  props<{ contact: any }>()
);
export const loadContact = createAction(
  '[conatct page] get contact',
  props<{ contactId: string }>()
);
