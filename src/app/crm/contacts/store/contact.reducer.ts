import { createReducer, on } from '@ngrx/store';
import { createFormGroupState, FormGroupState, onNgrxForms } from 'ngrx-forms';
import { Contact } from '../../model/contract.model';
import * as fromAction from './contact.action';

export interface State {
  currentContact: any;
}
const initialState: State = {
  currentContact: null,
};

export const serviceLineReducer = createReducer(
  initialState,
  on(fromAction.loadContactFinished, (state, { contact: conatct }) => ({
    ...state,
    currentContact: conatct,
  })),
  on(fromAction.saveContactFinished, (state, { contact: conatct }) => ({
    ...state,
    currentContact: conatct,
  })),
  on(fromAction.updateContactItemfinished, (state, { contact: conatct }) => ({
    ...state,
    currentContact: conatct,
  }))
);
